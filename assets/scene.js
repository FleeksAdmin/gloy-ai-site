import * as THREE from "https://unpkg.com/three@0.161.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.161.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("nebula-canvas");

if (!canvas) {
    throw new Error("Scene canvas not found.");
}

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0, 19);

scene.add(new THREE.AmbientLight(0xffffff, 1.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(8, 6, 12);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0xffffff, 7, 80, 2);
rimLight.position.set(-10, -4, 16);
scene.add(rimLight);

const rig = new THREE.Group();
scene.add(rig);

let activeObject = createFallback();
rig.add(activeObject);

const pointer = { x: 0.12, y: 0.08 };
const clock = new THREE.Clock();

function createFallback() {
    const group = new THREE.Group();

    const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.2, 10),
        new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            roughness: 0.22,
            metalness: 0,
            transparent: true,
            opacity: 0.22,
            transmission: 0.45,
            clearcoat: 1
        })
    );

    const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(5.7, 2),
        new THREE.MeshBasicMaterial({
            color: 0x2b2b2b,
            wireframe: true,
            transparent: true,
            opacity: 0.08
        })
    );

    group.add(shell, wire);
    return group;
}

function normalizeModel(root) {
    const box = new THREE.Box3().setFromObject(root);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 12 / maxAxis;

    root.position.sub(center);
    root.scale.setScalar(scale);

    root.traverse((child) => {
        if (!child.isMesh) {
            return;
        }

        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
            if (!material) {
                return;
            }

            if ("color" in material) {
                material.color = new THREE.Color(0xffffff);
            }

            if ("emissive" in material) {
                material.emissive = new THREE.Color(0x111111);
            }

            material.transparent = true;
            material.opacity = 0.18;
            if ("roughness" in material) {
                material.roughness = 0.18;
            }
            if ("metalness" in material) {
                material.metalness = 0;
            }
        });
    });

    return root;
}

function loadModel() {
    const loader = new GLTFLoader();
    const modelUrl = new URL("../free_-_skybox_space_nebula.glb", import.meta.url).href;

    loader.load(
        modelUrl,
        (gltf) => {
            rig.remove(activeObject);
            activeObject = normalizeModel(gltf.scene);
            rig.add(activeObject);
        },
        undefined,
        () => {
            // Keep fallback geometry if local file preview blocks the GLB.
        }
    );
}

window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.35;
    pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.18;
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    const elapsed = clock.getElapsedTime();

    rig.rotation.x += ((0.18 + pointer.y) - rig.rotation.x) * 0.03;
    rig.rotation.y += ((elapsed * 0.09 + pointer.x) - rig.rotation.y) * 0.03;
    rig.position.y = Math.sin(elapsed * 0.28) * 0.16;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

loadModel();
animate();
