/* =========================================================
   PUNPUN.DEV
   SCRIPT.JS
   Tema: Lain / Goodnight Punpun / Glitch
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const loadingScreen = document.getElementById("loadingScreen");
    const loadingText = document.getElementById("loadingText");
    const loadingBar = document.getElementById("loadingBar");
    const enterButton = document.getElementById("enterButton");
    const mainContent = document.getElementById("mainContent");

    const navButtons = document.querySelectorAll("[data-section]");
    const sections = document.querySelectorAll(".page-section");

    const clock = document.getElementById("clock");
    const dateDisplay = document.getElementById("date");

    const terminal = document.getElementById("terminal");
    const terminalInput = document.getElementById("terminalInput");
    const terminalOutput = document.getElementById("terminalOutput");

    const editor = document.getElementById("codeEditor");
    const preview = document.getElementById("preview");

    const saveButton = document.getElementById("saveCode");
    const clearButton = document.getElementById("clearCode");

    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");
    const chatMessages = document.getElementById("chatMessages");

    /* =====================================================
       ESTADO
    ===================================================== */

    let siteStarted = false;

    let savedCode = localStorage.getItem("punpunCode") || "";

    const loadingMessages = [
        "INITIALIZING SYSTEM...",
        "CONNECTING TO NETWORK...",
        "LOADING PUNPUN.EXE...",
        "SEARCHING FOR LAIN...",
        "ESTABLISHING CONNECTION...",
        "CHECKING MEMORY...",
        "LOADING UNKNOWN DATA...",
        "SYSTEM READY."
    ];

    /* =====================================================
       LOADING
    ===================================================== */

    function startLoading() {

        if (!loadingScreen) {
            startSite();
            return;
        }

        let progress = 0;
        let messageIndex = 0;

        const interval = setInterval(() => {

            progress += Math.floor(Math.random() * 8) + 4;

            if (progress > 100) {
                progress = 100;
            }

            if (loadingBar) {
                loadingBar.style.width = progress + "%";
            }

            if (
                loadingText &&
                messageIndex < loadingMessages.length &&
                progress >= (messageIndex + 1) * 12
            ) {
                loadingText.textContent = loadingMessages[messageIndex];
                messageIndex++;
            }

            if (progress >= 100) {
                clearInterval(interval);

                setTimeout(() => {
                    if (loadingText) {
                        loadingText.textContent = "SYSTEM READY.";
                    }

                    setTimeout(() => {
                        if (enterButton) {
                            enterButton.classList.add("show");
                        }
                    }, 500);

                }, 400);
            }

        }, 120);
    }

    function startSite() {

        siteStarted = true;

        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }

        if (mainContent) {
            mainContent.classList.add("active");
        }

        document.body.classList.add("system-online");

        playStartupEffect();

        updateClock();
        updateDate();

        if (editor && savedCode) {
            editor.value = savedCode;
        }
    }

    if (enterButton) {
        enterButton.addEventListener("click", () => {
            startSite();
        });
    }

    startLoading();

    /* =====================================================
       EFEITO DE INICIALIZAÇÃO
    ===================================================== */

    function playStartupEffect() {

        document.body.classList.add("glitch-active");

        setTimeout(() => {
            document.body.classList.remove("glitch-active");
        }, 1000);
    }

    /* =====================================================
       NAVEGAÇÃO
    ===================================================== */

    function showSection(sectionName) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const target = document.getElementById(sectionName);

        if (target) {
            target.classList.add("active");
        }

        navButtons.forEach(button => {
            button.classList.remove("active");

            if (button.dataset.section === sectionName) {
                button.classList.add("active");
            }
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        createGlitchEffect();
    }

    navButtons.forEach(button => {

        button.addEventListener("click", () => {

            const sectionName = button.dataset.section;

            if (sectionName) {
                showSection(sectionName);
            }

        });

    });

    /* =====================================================
       RELÓGIO
    ===================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }

        const now = new Date();

        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        clock.textContent = `${hours}:${minutes}:${seconds}`;
    }

    function updateDate() {

        if (!dateDisplay) {
            return;
        }

        const now = new Date();

        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();

        dateDisplay.textContent = `${day}/${month}/${year}`;
    }

    setInterval(updateClock, 1000);

    updateClock();
    updateDate();

    /* =====================================================
       GLITCH
    ===================================================== */

    function createGlitchEffect() {

        document.body.classList.add("glitch-active");

        setTimeout(() => {
            document.body.classList.remove("glitch-active");
        }, 300);
    }

    document.addEventListener("keydown", event => {

        if (event.key === "g" || event.key === "G") {
            createGlitchEffect();
        }

    });

    /* =====================================================
       RANDOM GLITCH AUTOMÁTICO
    ===================================================== */

    setInterval(() => {

        if (!siteStarted) {
            return;
        }

        if (Math.random() > 0.7) {
            createGlitchEffect();
        }

    }, 5000);

    /* =====================================================
       EFEITO DE TEXTO
    ===================================================== */

    const glitchTexts = document.querySelectorAll(".glitch-text");

    glitchTexts.forEach(element => {

        element.addEventListener("mouseenter", () => {

            element.classList.add("text-glitch");

            setTimeout(() => {
                element.classList.remove("text-glitch");
            }, 500);

        });

    });

    /* =====================================================
       EDITOR
    ===================================================== */

    if (editor) {

        editor.addEventListener("input", () => {

            const code = editor.value;

            localStorage.setItem("punpunCode", code);

            if (preview) {

                try {

                    preview.srcdoc = code;

                } catch (error) {

                    console.error(error);

                }

            }

        });

    }

    if (saveButton) {

        saveButton.addEventListener("click", () => {

            if (!editor) {
                return;
            }

            localStorage.setItem(
                "punpunCode",
                editor.value
            );

            showNotification("CODE SAVED.");

            createGlitchEffect();

        });

    }

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            if (!editor) {
                return;
            }

            editor.value = "";

            localStorage.removeItem("punpunCode");

            if (preview) {
                preview.srcdoc = "";
            }

            showNotification("EDITOR CLEARED.");

        });

    }

    /* =====================================================
       ATALHO CTRL + S
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();

            if (editor) {

                localStorage.setItem(
                    "punpunCode",
                    editor.value
                );

                showNotification("CODE SAVED.");

            }

        }

    });

    /* =====================================================
       TERMINAL
    ===================================================== */

    function terminalCommand(command) {

        const cmd = command.trim().toLowerCase();

        if (!terminalOutput) {
            return;
        }

        const line = document.createElement("div");

        line.className = "terminal-line";

        if (cmd === "") {
            return;
        }

        if (cmd === "help") {

            line.textContent =
                "commands: help, clear, status, lain, punpun, whoami";

        } else if (cmd === "status") {

            line.textContent =
                "SYSTEM: ONLINE | NETWORK: CONNECTED | MEMORY: OK";

        } else if (cmd === "lain") {

            line.textContent =
                "PRESENT DAY. PRESENT TIME.";

        } else if (cmd === "punpun") {

            line.textContent =
                "PUNPUN.EXE IS RUNNING.";

        } else if (cmd === "whoami") {

            line.textContent =
                "UNKNOWN USER";

        } else if (cmd === "clear") {

            terminalOutput.innerHTML = "";
            return;

        } else {

            line.textContent =
                `command not found: ${command}`;

        }

        terminalOutput.appendChild(line);

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;
    }

    if (terminalInput) {

        terminalInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                terminalCommand(
                    terminalInput.value
                );

                terminalInput.value = "";

            }

        });

    }

    /* =====================================================
       CHAT
    ===================================================== */

    function sendMessage() {

        if (!chatInput || !chatMessages) {
            return;
        }

        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        addChatMessage(
            "YOU",
            message
        );

        chatInput.value = "";

        setTimeout(() => {

            const responses = [
                "connection established...",
                "received.",
                "the network is listening.",
                "signal detected.",
                "message stored.",
                "unknown response.",
                "PUNPUN.EXE received your message."
            ];

            const response =
                responses[
                    Math.floor(
                        Math.random() * responses.length
                    )
                ];

            addChatMessage(
                "SYSTEM",
                response
            );

        }, 500);

    }

    function addChatMessage(author, message) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chat-message";

        const authorElement =
            document.createElement("span");

        authorElement.className =
            "chat-author";

        authorElement.textContent =
            author;

        const textElement =
            document.createElement("p");

        textElement.textContent =
            message;

        messageElement.appendChild(authorElement);
        messageElement.appendChild(textElement);

        chatMessages.appendChild(messageElement);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;
    }

    if (chatSend) {

        chatSend.addEventListener(
            "click",
            sendMessage
        );

    }

    if (chatInput) {

        chatInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    sendMessage();
                }

            }
        );

    }

    /* =====================================================
       NOTIFICAÇÕES
    ===================================================== */

    function showNotification(message) {

        const notification =
            document.createElement("div");

        notification.className =
            "system-notification";

        notification.textContent =
            message;

        document.body.appendChild(notification);

        setTimeout(() => {

            notification.classList.add("show");

        }, 20);

        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {
                notification.remove();
            }, 300);

        }, 2500);

    }

    /* =====================================================
       FOTOS PUNPUN
    ===================================================== */

    const punpunImages =
        document.querySelectorAll(
            "img[src*='punpun1'], img[src*='punpun2']"
        );

    punpunImages.forEach(image => {

        image.addEventListener("click", () => {

            image.classList.add("image-glitch");

            setTimeout(() => {
                image.classList.remove("image-glitch");
            }, 700);

        });

    });

    /* =====================================================
       MODAL DE IMAGEM
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("dblclick", () => {

            const modal =
                document.createElement("div");

            modal.className =
                "image-modal";

            const modalImage =
                document.createElement("img");

            modalImage.src =
                image.src;

            modal.appendChild(modalImage);

            document.body.appendChild(modal);

            modal.addEventListener("click", () => {
                modal.remove();
            });

        });

    });

    /* =====================================================
       CURSOR
    ===================================================== */

    const cursor =
        document.createElement("div");

    cursor.className =
        "custom-cursor";

    document.body.appendChild(cursor);

    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );

    /* =====================================================
       EFEITO DE HOVER NO CURSOR
    ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "button, a, input, textarea, img"
        );

    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {
                cursor.classList.add("cursor-big");
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                cursor.classList.remove("cursor-big");
            }
        );

    });

    /* =====================================================
       MATRIX / PARTICULAS
    ===================================================== */

    const canvas =
        document.getElementById("matrixCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let width =
            canvas.width = window.innerWidth;

        let height =
            canvas.height = window.innerHeight;

        const characters =
            "01アイウエオカキクケコサシスセソ";

        const fontSize = 14;

        let columns =
            Math.floor(width / fontSize);

        let drops =
            Array(columns).fill(1);

        function resizeCanvas() {

            width =
                canvas.width =
                window.innerWidth;

            height =
                canvas.height =
                window.innerHeight;

            columns =
                Math.floor(
                    width / fontSize
                );

            drops =
                Array(columns).fill(1);

        }

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        function drawMatrix() {

            ctx.fillStyle =
                "rgba(0, 0, 0, 0.08)";

            ctx.fillRect(
                0,
                0,
                width,
                height
            );

            ctx.font =
                `${fontSize}px monospace`;

            for (
                let i = 0;
                i < drops.length;
                i++
            ) {

                const char =
                    characters[
                        Math.floor(
                            Math.random() *
                            characters.length
                        )
                    ];

                ctx.fillStyle =
                    "rgba(255,255,255,0.35)";

                ctx.fillText(
                    char,
                    i * fontSize,
                    drops[i] * fontSize
                );

                if (
                    drops[i] * fontSize >
                    height &&
                    Math.random() > 0.975
                ) {

                    drops[i] = 0;

                }

                drops[i]++;

            }

        }

        setInterval(
            drawMatrix,
            45
        );

    }

    /* =====================================================
       KONAMI STYLE SECRET
    ===================================================== */

    const secretCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight"
    ];

    let secretIndex = 0;

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                secretCode[secretIndex]
            ) {

                secretIndex++;

                if (
                    secretIndex ===
                    secretCode.length
                ) {

                    activateSecret();

                    secretIndex = 0;

                }

            } else {

                secretIndex = 0;

            }

        }
    );

    function activateSecret() {

        document.body.classList.add(
            "secret-mode"
        );

        showNotification(
            "SECRET NETWORK ACTIVATED"
        );

        setTimeout(() => {

            document.body.classList.remove(
                "secret-mode"
            );

        }, 10000);

    }

    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById("backToTop");

    if (topButton) {

        topButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }

    /* =====================================================
       SCROLL EFFECT
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (scroll > 400) {

                document.body.classList.add(
                    "scrolled"
                );

            } else {

                document.body.classList.remove(
                    "scrolled"
                );

            }

        }
    );

    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c PUNPUN.DEV ",
        "background:#000;color:#fff;font-size:20px;padding:10px;"
    );

    console.log(
        "%c NETWORK CONNECTION ESTABLISHED ",
        "color:#888;"
    );

    console.log(
        "%c Lain is watching. ",
        "color:#aaa;"
    );

});