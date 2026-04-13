document.addEventListener("DOMContentLoaded", () => {
    const hideGloyDev = true;
    const body = document.body;
    const navToggle = document.querySelector(".nav-toggle");
    const navTriggers = document.querySelectorAll(".nav-trigger");
    const panels = document.querySelectorAll(".mega-panel");
    const themeToggle = document.getElementById("theme-toggle");
    const heroSection = document.getElementById("hero");
    const heroTitle = document.getElementById("hero-title");
    const heroTitleText = document.getElementById("hero-title-text");
    const heroPromptOutput = document.getElementById("hero-prompt-output");
    const consoleSendButton = document.querySelector(".console-send");
    const chipButtons = document.querySelectorAll(".chip-button");
    const catalogTabs = document.querySelectorAll(".catalog-tab");
    const roadmapSlider = document.getElementById("roadmap-slider");
    const roadmapList = document.getElementById("roadmap-list");
    const policyItems = document.querySelectorAll(".policy-item");
    const calcTabs = document.querySelectorAll(".calc-tab");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const catalogData = {
        current: {
            tag: "Current lineup",
            title: "GLOY AI 2.0, GLOY AI 1.8, and Gloy Dev 0.5 Exp.",
            description: "The active product surface spans a flagship long-context model, a stable 1.8 baseline, and one dedicated developer lane for coding workflows.",
            highlights: ["128K context", "32K stable baseline", "800B dev model", "Current API pricing"],
            rows: [
                {
                    name: "GLOY AI 2.0",
                    role: "Flagship",
                    detail: "128K context, stronger coding, Vision 3.0 recommendation",
                    href: "news/gloy-ai-2.0-release.html",
                    summary: "Long-context flagship for chat, coding, and visual reasoning.",
                    metrics: [["Context", "128K"], ["Access", "Chat + Vision"], ["Mode", "Flagship"]],
                    useCases: ["Long-context analysis", "Production coding", "Structured outputs", "Complex AI operations"],
                    notes: ["Best for high-depth prompts", "Preferred for premium workflows", "Migration target from 1.8"],
                    capabilities: [["Reasoning", 96], ["Speed", 80], ["Multimodal", 92]]
                },
                {
                    name: "GLOY AI 1.8",
                    role: "Base model",
                    detail: "32K context, text-first system, low-cost baseline lane",
                    href: "news/gloy-ai-2.0-release.html",
                    summary: "Low-cost baseline for simple prompts and lightweight API work.",
                    metrics: [["Context", "32K"], ["Access", "Chat + API"], ["Mode", "Base"]],
                    useCases: ["Simple assistance", "Fast text output", "Baseline prompts", "Cost-sensitive tasks"],
                    notes: ["Lowest current token price", "Useful as a fallback lane", "Best for basic text work"],
                    capabilities: [["Reasoning", 72], ["Speed", 86], ["Multimodal", 42]]
                },
                {
                    name: "Gloy Dev 0.5 Exp",
                    role: "Developer",
                    detail: "API-only coding model with 800B parameters",
                    href: "news/introducing-gloydev-0.5-exp.html",
                    summary: "Dedicated engineering model for implementation, debugging, and code architecture.",
                    metrics: [["Parameters", "800B"], ["Access", "API only"], ["Mode", "Code"]],
                    useCases: ["Repository reasoning", "Code generation", "Refactors", "Bug isolation"],
                    notes: ["Built for engineers", "Best with explicit constraints", "Pairs well with large context"],
                    capabilities: [["Reasoning", 94], ["Speed", 74], ["Multimodal", 34]]
                },
            ]
        },
        archive: {
            tag: "API lineup",
            title: "GLOY AI 2.0, GLOY AI 1.8, and Gloy Dev 0.5 Exp API access.",
            description: "Direct pricing and onboarding for the three active API models.",
            highlights: ["$0.820 / $2.400", "$0.80 / $0.90", "$2.50 / $2.90", "$0.50 free test"],
            rows: [
                {
                    name: "GLOY AI 2.0 Base API",
                    role: "Base API lane",
                    detail: "$0.820 / 1M input and $2.400 / 1M output tokens",
                    href: "#api",
                    summary: "Primary API lane for long-context prompts and production use.",
                    metrics: [["Input", "$0.820"], ["Output", "$2.400"], ["Mode", "Base API"]],
                    useCases: ["Long-context prompts", "Structured output", "General production use", "Direct base access"],
                    notes: ["Primary current API lane", "Updated production pricing", "Strong default choice"],
                    capabilities: [["Reasoning", 96], ["Speed", 80], ["Multimodal", 92]]
                },
                {
                    name: "GLOY AI 1.8 API",
                    role: "Baseline API lane",
                    detail: "$0.80 / 1M input and $0.90 / 1M output tokens",
                    href: "#api",
                    summary: "Low-cost API lane for basic chat and lightweight integrations.",
                    metrics: [["Input", "$0.80"], ["Output", "$0.90"], ["Mode", "Baseline API"]],
                    useCases: ["Basic assistant tasks", "Simple integrations", "Low-cost usage", "Fallback deployments"],
                    notes: ["Cheapest general model", "Good for basic use", "Best for cost control"],
                    capabilities: [["Reasoning", 72], ["Speed", 86], ["Multimodal", 42]]
                },
                {
                    name: "Gloy Dev 0.5 Exp",
                    role: "Premium coding lane",
                    detail: "$2.50 / 1M input and $2.90 / 1M output tokens",
                    href: "news/introducing-gloydev-0.5-exp.html",
                    summary: "Premium engineering lane for large implementation and repository work.",
                    metrics: [["Input", "$2.50"], ["Output", "$2.90"], ["Mode", "Premium code"]],
                    useCases: ["Complex coding", "Deep repository context", "Architecture work", "Large implementation tasks"],
                    notes: ["Best coding quality", "Made for serious engineering", "Use when quality matters most"],
                    capabilities: [["Reasoning", 94], ["Speed", 74], ["Multimodal", 34]]
                }
            ]
        },
        utility: {
            tag: "Utility and plans",
            title: "Gloy Weather and the subscription lineup keep access simple.",
            description: "Utility and paid access plans stay visible in one clear product surface.",
            highlights: ["Trial 3 days", "$15 Plus", "$25 Business", "$45 Pro"],
            rows: [
                {
                    name: "Gloy Weather",
                    role: "Utility",
                    detail: "Weather in clean format with current conditions and short-range forecasts",
                    href: "news/gloy-weather-release.html",
                    summary: "Fast utility layer for simple weather checks.",
                    metrics: [["API", "Forecast"], ["Latency", "Fast"], ["Mode", "Utility"]],
                    useCases: ["City forecasts", "Tomorrow planning", "Quick checks", "User-friendly display"],
                    notes: ["Integrated utility lane", "Practical daily use case", "No complex setup"],
                    capabilities: [["Reasoning", 58], ["Speed", 96], ["Multimodal", 10]]
                },
                {
                    name: "GLOY Plans",
                    role: "Subscriptions",
                    detail: "Trial, Plus, Business, and Pro with larger limits, file transfer upgrades, and higher memory",
                    href: "#subscription",
                    summary: "Paid plans scale access, memory, media limits, and early model availability.",
                    metrics: [["Plans", "4"], ["Top tier", "$45 Pro"], ["Mode", "Subscription"]],
                    useCases: ["Fast trial", "Daily power use", "Team operations", "Early model access"],
                    notes: ["Direct purchase in Telegram", "Business and Pro unlock early models", "Higher tiers increase memory and transfer limits"],
                    capabilities: [["Access", 96], ["Scale", 88], ["Flexibility", 84]]
                },
                {
                    name: "GLOY AI access",
                    role: "Launch surface",
                    detail: "Direct launch and updates through the official Telegram channel",
                    href: "https://t.me/gloy_dev",
                    summary: "Direct public entry point with minimal onboarding.",
                    metrics: [["Channel", "Telegram"], ["Mode", "Launch"], ["Access", "Direct"]],
                    useCases: ["Instant entry", "Mobile access", "Daily chat", "Fast updates"],
                    notes: ["Official public surface", "Lowest-friction entry point", "Core launch channel"],
                    capabilities: [["Reasoning", 46], ["Speed", 90], ["Multimodal", 18]]
                },
                {
                    name: "Community",
                    role: "Support",
                    detail: "Release updates and developer communication via Telegram channel",
                    href: "https://t.me/gloy_dev",
                    summary: "Community surface for updates, support, and release visibility.",
                    metrics: [["Channel", "Telegram"], ["Mode", "Community"], ["Access", "Open"]],
                    useCases: ["Release updates", "Developer contact", "Support discovery", "Audience growth"],
                    notes: ["Important trust layer", "Keeps roadmap visible", "Links product and team"],
                    capabilities: [["Reasoning", 34], ["Speed", 78], ["Multimodal", 12]]
                }
            ]
        }
    };

    const roadmapData = [
        {
            date: "December 15, 2025",
            title: "Gloy Dev 0.5 Exp introduced the coding branch.",
            description: "The engineering lane arrived with API-only access and deeper software capability.",
            tags: ["800B parameters", "API only", "Coding focus"],
            deliverables: ["Repository-scale reasoning", "Long context for codebases", "Higher quality engineering output"]
        },
        {
            date: "December 26, 2025",
            title: "GLOY AI 2.0 became the flagship model.",
            description: "The platform moved to one flagship model with larger context and stronger coding.",
            tags: ["128K context", "Flagship", "Migration from 1.8"],
            deliverables: ["Long-context reliability", "Production coding", "Larger structured responses"]
        },
        {
            date: "February 3, 2026",
            title: "Vision 1.0 formalized the baseline visual layer.",
            description: "Image understanding became available in Gloy AI 1.8 and 2.0.",
            tags: ["Baseline vision", "Image analysis", "Shared support"],
            deliverables: ["Screenshot checks", "Photo summaries", "Compatibility layer"]
        },
        {
            date: "February 14, 2026",
            title: "Vision 2.0 improved stability and whole-image reasoning.",
            description: "The visual branch became faster, steadier, and easier to trust.",
            tags: ["Stable workhorse", "Whole-frame reasoning", "Operational baseline"],
            deliverables: ["Better consistency", "Faster responses", "Controlled rollout path"]
        },
        {
            date: "February 27, 2026",
            title: "Gloy Weather extended the utility layer.",
            description: "Weather became a practical conversational utility with tomorrow support.",
            tags: ["Forecast API", "Utility feature", "Fast output"],
            deliverables: ["Instant city forecasts", "Tomorrow support", "Beautiful display format"]
        }
    ];

    const pricing = {
        gloy20: { label: "Gloy AI 2.0 Base", input: 0.82, output: 2.4, inputDisplay: "0.820", outputDisplay: "2.400" },
        gloy18: { label: "Gloy AI 1.8", input: 0.8, output: 0.9, inputDisplay: "0.80", outputDisplay: "0.90" },
        gloydev05: { label: "Gloy Dev 0.5 Exp", input: 2.5, output: 2.9, inputDisplay: "2.50", outputDisplay: "2.90" }
    };

    if (hideGloyDev) {
        const shouldHideModel = (item) => /gloy dev/i.test(item.name);
        catalogData.current.title = "GLOY AI 2.0 and GLOY AI 1.8.";
        catalogData.current.description = "The active product surface spans a flagship long-context model and one low-cost baseline for lighter work.";
        catalogData.current.rows = catalogData.current.rows.filter((item) => !shouldHideModel(item));

        catalogData.archive.title = "GLOY AI 2.0 and GLOY AI 1.8 API access.";
        catalogData.archive.description = "Direct pricing and onboarding for the two visible API lanes.";
        catalogData.archive.rows = catalogData.archive.rows.filter((item) => !shouldHideModel(item));

        roadmapData.splice(0, 1);
    }

    const catalogTag = document.getElementById("catalog-tag");
    const catalogTitle = document.getElementById("catalog-title");
    const catalogDescription = document.getElementById("catalog-description");
    const catalogHighlights = document.getElementById("catalog-highlights");
    const catalogShortcuts = document.getElementById("catalog-shortcuts");
    const catalogTableBody = document.getElementById("catalog-table-body");
    const modelFocusTag = document.getElementById("model-focus-tag");
    const modelFocusTitle = document.getElementById("model-focus-title");
    const modelFocusDescription = document.getElementById("model-focus-description");
    const modelFocusLink = document.getElementById("model-focus-link");
    const modelFocusMetrics = document.getElementById("model-focus-metrics");
    const modelFocusUseCases = document.getElementById("model-focus-use-cases");
    const modelFocusNotes = document.getElementById("model-focus-notes");
    const modelFocusCapabilities = document.getElementById("model-focus-capabilities");

    const roadmapCounter = document.getElementById("roadmap-counter");
    const roadmapDate = document.getElementById("roadmap-date");
    const roadmapTitle = document.getElementById("roadmap-title");
    const roadmapDescription = document.getElementById("roadmap-description");
    const roadmapTags = document.getElementById("roadmap-tags");
    const roadmapDeliverables = document.getElementById("roadmap-deliverables");
    const roadmapDetail = document.querySelector(".roadmap-detail");

    const tokenControls = document.getElementById("token-controls");
    const inputRange = document.getElementById("input-range");
    const outputRange = document.getElementById("output-range");
    const inputRangeValue = document.getElementById("input-range-value");
    const outputRangeValue = document.getElementById("output-range-value");
    const calcLabel = document.getElementById("calc-label");
    const calcTotal = document.getElementById("calc-total");
    const calcNote = document.getElementById("calc-note");

    let activePlan = "gloy20";
    let activeCatalogKey = "current";
    let activeModelIndex = 0;
    let closeMenuTimer = null;
    let promptCycleRunId = 0;
    const desktopNavigation = window.matchMedia("(min-width: 981px)");
    const supportsLivePointer = false;
    const heroTitleSource = heroTitle?.dataset.title || "";
    const promptSuggestions = Array.from(chipButtons)
        .map((button) => button.dataset.prompt?.trim())
        .filter(Boolean);

    const revealObserver = !prefersReducedMotion.matches && "IntersectionObserver" in window
        ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    return;
                }

                entry.target.classList.remove("is-visible");
            });
        }, {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px"
        })
        : null;

    const observeReveals = (scope = document) => {
        const items = Array.from(scope.querySelectorAll("[data-reveal]"));

        items.forEach((item, index) => {
            if (item.dataset.revealBound === "true") {
                return;
            }

            item.dataset.revealBound = "true";
            item.style.setProperty("--reveal-delay", `${(index % 6) * 93}ms`);

            if (!revealObserver) {
                item.classList.add("is-visible");
                return;
            }

            revealObserver.observe(item);
        });
    };

    const interactiveSurfaceSelector = [
        ".hero-console",
        ".insight-card",
        ".release-card",
        ".catalog-panel",
        ".compare-card",
        ".roadmap-detail",
        ".roadmap-node",
        ".policy-button",
        ".policy-matrix .matrix-row",
        ".subscription-card",
        ".price-card",
        ".calculator-card",
        ".developer-card",
        ".catalog-shortcut"
    ].join(", ");

    const magneticSelector = [
        ".cta-button",
        ".ghost-button",
        ".theme-toggle",
        ".console-send",
        ".chip-button",
        ".catalog-tab",
        ".calc-tab",
        ".nav-link",
        ".nav-trigger",
        ".spotlight-link",
        ".developer-links a"
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
            const maxTilt = element.matches(".roadmap-node, .catalog-shortcut, .policy-button") ? 5 : 7.5;

            element.style.setProperty("--pointer-x", `${(px * 100).toFixed(2)}%`);
            element.style.setProperty("--pointer-y", `${(py * 100).toFixed(2)}%`);
            element.style.setProperty("--tilt-y", `${((px - 0.5) * maxTilt * 2).toFixed(2)}deg`);
            element.style.setProperty("--tilt-x", `${((0.5 - py) * maxTilt * 2).toFixed(2)}deg`);
        });

        element.addEventListener("pointerleave", () => {
            element.style.setProperty("--pointer-x", "50%");
            element.style.setProperty("--pointer-y", "50%");
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
            const maxOffset = element.matches(".chip-button, .calc-tab, .catalog-tab, .nav-link, .nav-trigger") ? 5 : 8;

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

    const setupGlobalEffects = () => {
        let progress = document.querySelector(".page-progress");
        if (!progress) {
            progress = document.createElement("div");
            progress.className = "page-progress";
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

        let halo = document.querySelector(".cursor-halo");
        if (!halo) {
            halo = document.createElement("div");
            halo.className = "cursor-halo is-hidden";
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
            // Ignore storage failures and keep theme in-memory only.
        }
    };

    const toggleTheme = () => {
        applyTheme(body.classList.contains("theme-dark") ? "light" : "dark");
    };

    const resolveTheme = () => {
        const queryTheme = new URLSearchParams(window.location.search).get("theme");
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

    try {
        applyTheme(resolveTheme(), { persist: false });
    } catch (error) {
        applyTheme(systemPrefersDark.matches ? "dark" : "light", { persist: false });
    }

    systemPrefersDark.addEventListener("change", () => {
        applyTheme(resolveTheme(), { persist: false });
    });

    const wait = (duration) => new Promise((resolve) => {
        window.setTimeout(resolve, duration);
    });

    const typeText = async (element, text, options = {}) => {
        const {
            speed = 28,
            deleting = false,
            runId = 0
        } = options;

        const frames = deleting
            ? Array.from({ length: element.textContent.length + 1 }, (_, index) => element.textContent.slice(0, element.textContent.length - index))
            : Array.from({ length: text.length + 1 }, (_, index) => text.slice(0, index));

        for (const frame of frames) {
            if (runId !== promptCycleRunId) {
                return false;
            }

            element.textContent = frame;
            await wait(speed);
        }

        return true;
    };

    const showHeroTitle = () => {
        if (!heroTitleText) {
            return;
        }

        heroTitleText.textContent = heroTitleSource;
    };

    const restartPromptCycle = async (seedPrompt = "") => {
        if (!heroPromptOutput) {
            return;
        }

        if (prefersReducedMotion.matches) {
            heroPromptOutput.textContent = seedPrompt || promptSuggestions[0] || "";
            return;
        }

        const runId = ++promptCycleRunId;
        const queue = seedPrompt ? [seedPrompt] : [];
        let pointer = 0;

        while (runId === promptCycleRunId) {
            const text = queue.shift() || promptSuggestions[pointer % promptSuggestions.length] || "";
            pointer += 1;
            heroPromptOutput.classList.add("is-typing");
            heroPromptOutput.textContent = "";

            const typed = await typeText(heroPromptOutput, text, {
                speed: 17,
                runId
            });
            if (!typed || runId !== promptCycleRunId) {
                return;
            }

            heroPromptOutput.classList.remove("is-typing");
            await wait(1100);
            if (runId !== promptCycleRunId) {
                return;
            }

            heroPromptOutput.classList.add("is-typing");
            const erased = await typeText(heroPromptOutput, "", {
                speed: 9,
                deleting: true,
                runId
            });
            if (!erased || runId !== promptCycleRunId) {
                return;
            }

            await wait(190);
        }
    };

    const closeMenus = () => {
        navTriggers.forEach((trigger) => {
            trigger.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
        });
        panels.forEach((panel) => panel.classList.remove("is-open"));
    };

    const cancelMenuClose = () => {
        if (closeMenuTimer) {
            window.clearTimeout(closeMenuTimer);
            closeMenuTimer = null;
        }
    };

    const scheduleMenuClose = () => {
        if (!desktopNavigation.matches) {
            return;
        }

        cancelMenuClose();
        closeMenuTimer = window.setTimeout(() => {
            closeMenus();
        }, 260);
    };

    const openMenu = (targetId) => {
        const targetPanel = document.getElementById(targetId);
        if (!targetPanel) {
            return;
        }

        cancelMenuClose();
        closeMenus();

        navTriggers.forEach((trigger) => {
            const isActive = trigger.dataset.menuTarget === targetId;
            trigger.classList.toggle("is-open", isActive);
            trigger.setAttribute("aria-expanded", String(isActive));
        });

        targetPanel.classList.add("is-open");
    };

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            body.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", String(body.classList.contains("nav-open")));
        });
    }

    document.querySelectorAll(".site-navigation a").forEach((link) => {
        link.addEventListener("click", () => {
            body.classList.remove("nav-open");
            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    navTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            const targetId = trigger.dataset.menuTarget;
            const targetPanel = document.getElementById(targetId);

            if (desktopNavigation.matches) {
                event.preventDefault();
                event.stopPropagation();

                if (!targetPanel) {
                    return;
                }

                if (targetPanel.classList.contains("is-open")) {
                    closeMenus();
                } else {
                    openMenu(targetId);
                }
                return;
            }

            event.stopPropagation();
            const isOpen = targetPanel && targetPanel.classList.contains("is-open");

            closeMenus();

            if (!isOpen && targetPanel) {
                trigger.classList.add("is-open");
                trigger.setAttribute("aria-expanded", "true");
                targetPanel.classList.add("is-open");
            }
        });

        trigger.addEventListener("mouseenter", () => {
            if (!desktopNavigation.matches) {
                return;
            }

            openMenu(trigger.dataset.menuTarget);
        });

        trigger.addEventListener("focus", () => {
            if (!desktopNavigation.matches) {
                return;
            }

            openMenu(trigger.dataset.menuTarget);
        });
    });

    panels.forEach((panel) => {
        panel.addEventListener("mouseenter", cancelMenuClose);
        panel.addEventListener("mouseleave", scheduleMenuClose);
    });

    const siteHeader = document.querySelector(".site-header");
    if (siteHeader) {
        siteHeader.addEventListener("mouseenter", cancelMenuClose);
        siteHeader.addEventListener("mouseleave", scheduleMenuClose);
    }

    document.addEventListener("click", () => {
        closeMenus();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenus();
        }
    });

    desktopNavigation.addEventListener("change", () => {
        closeMenus();
        body.classList.remove("nav-open");
        if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
        }
    });

    chipButtons.forEach((button) => {
        button.addEventListener("click", () => {
            chipButtons.forEach((item) => item.classList.remove("is-active"));
            button.classList.add("is-active");
            if (heroPromptOutput) {
                restartPromptCycle(button.dataset.prompt || "");
            }
        });
    });

    consoleSendButton?.addEventListener("click", () => {
        window.location.assign("https://chat.gloyai.fun");
    });

    const updateModelSpotlight = (key, index = 0) => {
        const state = catalogData[key];
        const model = state?.rows[index] || state?.rows[0];
        if (!state || !model) {
            return;
        }

        activeModelIndex = Math.min(index, state.rows.length - 1);

        document.querySelectorAll(".catalog-shortcut").forEach((button) => {
            button.classList.toggle("is-active", Number(button.dataset.modelIndex) === activeModelIndex);
        });

        document.querySelectorAll(".catalog-row").forEach((row) => {
            row.classList.toggle("is-active", Number(row.dataset.modelIndex) === activeModelIndex);
        });

        modelFocusTag.textContent = model.role;
        modelFocusTitle.textContent = model.name;
        modelFocusDescription.textContent = model.summary;
        modelFocusLink.href = model.href;
        if (model.href.startsWith("http")) {
            modelFocusLink.target = "_blank";
            modelFocusLink.rel = "noreferrer";
        } else {
            modelFocusLink.target = "_self";
            modelFocusLink.removeAttribute("rel");
        }

        modelFocusMetrics.innerHTML = model.metrics.map((metric) => `
            <article class="spotlight-metric">
                <span>${metric[0]}</span>
                <strong>${metric[1]}</strong>
            </article>
        `).join("");

        modelFocusUseCases.innerHTML = model.useCases.map((item) => `<span>${item}</span>`).join("");
        modelFocusNotes.innerHTML = model.notes.map((item) => `<span>${item}</span>`).join("");
        modelFocusCapabilities.innerHTML = model.capabilities.map((capability) => `
            <div class="capability-row">
                <div class="capability-meta">
                    <span>${capability[0]}</span>
                    <strong>${capability[1]}%</strong>
                </div>
                <div class="capability-track" aria-hidden="true">
                    <i style="width: ${capability[1]}%"></i>
                </div>
            </div>
        `).join("");
    };

    const updateCatalog = (key) => {
        const state = catalogData[key];
        if (!state) {
            return;
        }

        activeCatalogKey = key;
        activeModelIndex = 0;

        catalogTabs.forEach((tab) => {
            tab.classList.toggle("is-active", tab.dataset.catalog === key);
        });

        catalogTag.textContent = state.tag;
        catalogTitle.textContent = state.title;
        catalogDescription.textContent = state.description;
        catalogHighlights.innerHTML = state.highlights.map((item) => `<span>${item}</span>`).join("");
        catalogShortcuts.innerHTML = state.rows.map((row, index) => `
            <button class="catalog-shortcut${index === 0 ? " is-active" : ""}" type="button" data-model-index="${index}">
                <strong>${row.name}</strong>
                <span>${row.role}</span>
            </button>
        `).join("");
        catalogTableBody.innerHTML = state.rows.map((row, index) => {
            const isExternal = row.href.startsWith("http");
            return `
                <tr class="catalog-row${index === 0 ? " is-active" : ""}" data-model-index="${index}" tabindex="0">
                    <td><button class="catalog-row-button" type="button">${row.name}</button></td>
                    <td>${row.role}</td>
                    <td>${row.detail}</td>
                    <td><a href="${row.href}"${isExternal ? ' target="_blank" rel="noreferrer"' : ""}>Open</a></td>
                </tr>
            `;
        }).join("");

        updateModelSpotlight(key, 0);
        enhanceInteractions(document);
    };

    catalogTabs.forEach((tab) => {
        tab.addEventListener("click", () => updateCatalog(tab.dataset.catalog));
    });

    if (catalogShortcuts) {
        catalogShortcuts.addEventListener("click", (event) => {
            const target = event.target.closest("[data-model-index]");
            if (!target) {
                return;
            }

            updateModelSpotlight(activeCatalogKey, Number(target.dataset.modelIndex));
        });
    }

    if (catalogTableBody) {
        catalogTableBody.addEventListener("click", (event) => {
            if (event.target.closest("a")) {
                return;
            }

            const row = event.target.closest(".catalog-row");
            if (!row) {
                return;
            }

            updateModelSpotlight(activeCatalogKey, Number(row.dataset.modelIndex));
        });

        catalogTableBody.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }

            const row = event.target.closest(".catalog-row");
            if (!row) {
                return;
            }

            event.preventDefault();
            updateModelSpotlight(activeCatalogKey, Number(row.dataset.modelIndex));
        });
    }

    showHeroTitle();

    const renderRoadmapList = () => {
        if (roadmapSlider) {
            roadmapSlider.max = String(Math.max(roadmapData.length - 1, 0));
        }

        roadmapList.innerHTML = roadmapData.map((item, index) => `
            <button class="roadmap-node${index === 0 ? " is-active" : ""}" type="button" data-roadmap-index="${index}" data-reveal>
                <span>${item.date}</span>
                <strong>${item.title}</strong>
                <p>${item.description}</p>
            </button>
        `).join("");

        observeReveals(roadmapList);
        enhanceInteractions(roadmapList);
    };

    const updateRoadmap = (index) => {
        const item = roadmapData[index];
        if (!item) {
            return;
        }

        if (roadmapDetail && !prefersReducedMotion.matches) {
            roadmapDetail.classList.remove("is-updating");
            window.requestAnimationFrame(() => {
                roadmapDetail.classList.add("is-updating");
            });
            window.setTimeout(() => {
                roadmapDetail.classList.remove("is-updating");
            }, 620);
        }

        roadmapCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(roadmapData.length).padStart(2, "0")}`;
        roadmapDate.textContent = item.date;
        roadmapTitle.textContent = item.title;
        roadmapDescription.textContent = item.description;
        roadmapTags.innerHTML = item.tags.map((tag) => `<span>${tag}</span>`).join("");
        roadmapDeliverables.innerHTML = item.deliverables.map((itemText) => `<article>${itemText}</article>`).join("");

        document.querySelectorAll(".roadmap-node").forEach((node) => {
            node.classList.toggle("is-active", Number(node.dataset.roadmapIndex) === index);
        });

        if (roadmapSlider) {
            roadmapSlider.value = String(index);
        }
    };

    if (roadmapSlider) {
        roadmapSlider.addEventListener("input", () => {
            updateRoadmap(Number(roadmapSlider.value));
        });
    }

    roadmapList.addEventListener("click", (event) => {
        const target = event.target.closest("[data-roadmap-index]");
        if (!target) {
            return;
        }

        updateRoadmap(Number(target.dataset.roadmapIndex));
    });

    policyItems.forEach((item) => {
        const button = item.querySelector(".policy-button");
        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const willOpen = !item.classList.contains("is-open");

            policyItems.forEach((entry) => {
                entry.classList.remove("is-open");
                const entryButton = entry.querySelector(".policy-button");
                if (entryButton) {
                    entryButton.setAttribute("aria-expanded", "false");
                    const state = entryButton.querySelector("strong");
                    if (state) {
                        state.textContent = "Review";
                    }
                }
            });

            if (willOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
                const state = button.querySelector("strong");
                if (state) {
                    state.textContent = "Open";
                }
            }
        });
    });

    const formatUsd = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const updateCalculator = () => {
        const plan = pricing[activePlan];
        if (!plan) {
            return;
        }

        calcTabs.forEach((tab) => {
            tab.classList.toggle("is-active", tab.dataset.plan === activePlan);
        });

        const input = Number(inputRange.value);
        const output = Number(outputRange.value);

        inputRangeValue.textContent = `${input}M`;
        outputRangeValue.textContent = `${output}M`;

        tokenControls.classList.remove("is-hidden");
        const total = input * plan.input + output * plan.output;
        calcLabel.textContent = `${plan.label} estimate`;
        calcTotal.textContent = formatUsd(total);
        calcNote.textContent = `${input}M input tokens at $${plan.inputDisplay} plus ${output}M output tokens at $${plan.outputDisplay}.`;
    };

    calcTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            activePlan = tab.dataset.plan;
            updateCalculator();
        });
    });

    [inputRange, outputRange].filter(Boolean).forEach((control) => {
        control.addEventListener("input", updateCalculator);
    });

    setupGlobalEffects();
    updateCatalog("current");
    observeReveals();
    enhanceInteractions(document);
    renderRoadmapList();
    updateRoadmap(0);
    updateCalculator();
    restartPromptCycle(heroPromptOutput?.textContent || "");
});
