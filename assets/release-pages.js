document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const supportsLivePointer = false;

    const applyTheme = (theme, options = {}) => {
        const { persist = true } = options;
        const nextTheme = theme;
        const isDark = nextTheme === "dark";
        body.classList.toggle("theme-dark", isDark);
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";

        if (themeToggle) {
            const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");
            if (themeToggleLabel) {
                themeToggleLabel.textContent = isDark ? "Light" : "Dark";
            }
            themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
            themeToggle.setAttribute("aria-pressed", String(isDark));
        }

        if (!persist) {
            return;
        }

        try {
            window.localStorage.setItem("gloy-theme", nextTheme);
        } catch (error) {
            // Ignore storage failures and keep the current in-memory state.
        }
    };

    const queryTheme = new URLSearchParams(window.location.search).get("theme");

    const resolveTheme = () => {
        if (queryTheme === "dark" || queryTheme === "light") {
            return queryTheme;
        }

        try {
            const storedTheme = window.localStorage.getItem("gloy-theme");
            if (storedTheme === "dark" || storedTheme === "light") {
                return storedTheme;
            }
        } catch (error) {
            // Ignore storage failures and rely on system preference.
        }

        return window.matchMedia("(max-width: 980px)").matches ? "light" : (systemPrefersDark.matches ? "dark" : "light");
    };

    if (queryTheme === "dark" || queryTheme === "light") {
        applyTheme(resolveTheme(), { persist: false });
    } else {
        try {
            applyTheme(resolveTheme(), { persist: false });
        } catch (error) {
            applyTheme(systemPrefersDark.matches ? "dark" : "light", { persist: false });
        }
    }

    themeToggle?.addEventListener("click", () => {
        applyTheme(body.classList.contains("theme-dark") ? "light" : "dark");
    });

    systemPrefersDark.addEventListener("change", () => {
        applyTheme(resolveTheme(), { persist: false });
    });

    const setupGlobalEffects = () => {
        let progress = document.querySelector(".release-progress");
        if (!progress) {
            progress = document.createElement("div");
            progress.className = "release-progress";
            progress.setAttribute("aria-hidden", "true");
            body.append(progress);
        }

        const syncProgress = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const value = max > 0 ? (window.scrollY / max) * 100 : 0;
            progress.style.width = `${Math.max(0, Math.min(value, 100)).toFixed(2)}%`;
        };

        syncProgress();
        window.addEventListener("scroll", syncProgress, { passive: true });
        window.addEventListener("resize", syncProgress);

        if (!supportsLivePointer) {
            return;
        }

        body.classList.add("has-live-pointer");

        let halo = document.querySelector(".release-cursor-halo");
        if (!halo) {
            halo = document.createElement("div");
            halo.className = "release-cursor-halo is-hidden";
            halo.setAttribute("aria-hidden", "true");
            body.append(halo);
        }

        const moveHalo = (event) => {
            halo.classList.remove("is-hidden");
            halo.style.left = `${event.clientX}px`;
            halo.style.top = `${event.clientY}px`;
        };

        document.addEventListener("pointermove", moveHalo, { passive: true });
        document.addEventListener("pointerdown", moveHalo, { passive: true });
        document.addEventListener("pointerleave", () => {
            halo.classList.add("is-hidden");
        });
    };

    const interactiveSurfaceSelector = [
        ".news-sidebar",
        ".article-content",
        ".voice-section",
        ".feature-box",
        ".feature-card",
        ".highlight-box",
        ".warning-box",
        ".continue-card",
        ".example-card",
        ".dev-live-prompt",
        ".dev-response-card",
        ".dev-response-metric",
        ".dev-response-step",
        ".benchmark-table",
        ".vision-output-panel",
        ".sidebar-link"
    ].join(", ");

    const magneticSelector = [
        ".release-nav-link",
        ".release-theme-toggle",
        ".back-button",
        ".cta-button",
        ".voice-play",
        ".voice-download",
        ".continue-view-all",
        ".sidebar-toggle-btn",
        ".sidebar-close-btn"
    ].join(", ");

    const bindInteractiveSurface = (element) => {
        if (!element || element.dataset.surfaceBound === "true") {
            return;
        }

        element.dataset.surfaceBound = "true";

        if (!supportsLivePointer) {
            return;
        }

        element.addEventListener("pointermove", (event) => {
            const rect = element.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return;
            }

            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const maxTilt = element.matches(".sidebar-link, .dev-response-metric, .dev-response-step") ? 5 : 7;

            element.style.setProperty("--tilt-y", `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`);
            element.style.setProperty("--tilt-x", `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`);
        });

        element.addEventListener("pointerleave", () => {
            element.style.setProperty("--tilt-y", "0deg");
            element.style.setProperty("--tilt-x", "0deg");
        });
    };

    const bindMagneticElement = (element) => {
        if (!element || element.dataset.magneticBound === "true") {
            return;
        }

        element.dataset.magneticBound = "true";

        if (!supportsLivePointer) {
            return;
        }

        element.addEventListener("pointermove", (event) => {
            const rect = element.getBoundingClientRect();
            if (!rect.width || !rect.height) {
                return;
            }

            const px = ((event.clientX - rect.left) / rect.width) - 0.5;
            const py = ((event.clientY - rect.top) / rect.height) - 0.5;
            const maxOffset = element.matches(".release-nav-link") ? 5 : 8;

            element.style.setProperty("--button-shift-x", `${(px * maxOffset).toFixed(2)}px`);
            element.style.setProperty("--button-shift-y", `${(py * maxOffset * 0.7).toFixed(2)}px`);
        });

        element.addEventListener("pointerleave", () => {
            element.style.setProperty("--button-shift-x", "0px");
            element.style.setProperty("--button-shift-y", "0px");
        });
    };

    const enhanceInteractions = (scope = document) => {
        scope.querySelectorAll(interactiveSurfaceSelector).forEach(bindInteractiveSurface);
        scope.querySelectorAll(magneticSelector).forEach(bindMagneticElement);
    };

    const revealTargets = Array.from(
        new Set(
            Array.from(
                document.querySelectorAll(
                    ".article-header, .voice-section, .article-content > *, .continue-section, .dev-live-prompt, .dev-live-frame, .dev-response-card"
                )
            )
        )
    );

    revealTargets.forEach((element) => {
        element.classList.add("release-reveal");
    });

    setupGlobalEffects();
    enhanceInteractions(document);

    const interactionObserver = new MutationObserver(() => {
        enhanceInteractions(document);
    });

    interactionObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    if (prefersReducedMotion.matches) {
        revealTargets.forEach((element) => {
            element.classList.add("is-visible");
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("is-visible", entry.isIntersecting);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -12% 0px"
        }
    );

    revealTargets.forEach((element) => {
        revealObserver.observe(element);
    });
});
