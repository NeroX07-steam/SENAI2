/* =========================================================
   LUIZ.EXE V3
   SCRIPT.JS
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   LOADING
   ========================================================= */

const bootScreen = $(".boot-screen");
const bootProgress = $(".boot-progress-bar");
const bootPercent = $(".boot-percent");
const bootText = $(".boot-text");
const startButton = $(".start-button");
const app = $(".app");

let bootValue = 0;

const bootMessages = [
    "iniciando sistema...",
    "carregando perfil...",
    "carregando músicas...",
    "carregando memórias...",
    "verificando conexão...",
    "quase pronto...",
    "sistema carregado."
];

function bootLoading() {
    if (!bootProgress) return;

    const interval = setInterval(() => {

        bootValue += Math.floor(Math.random() * 8) + 3;

        if (bootValue >= 100) {
            bootValue = 100;
            clearInterval(interval);
        }

        bootProgress.style.width = `${bootValue}%`;

        if (bootPercent) {
            bootPercent.textContent = `${bootValue}%`;
        }

        if (bootText) {
            const index = Math.min(
                Math.floor(bootValue / 15),
                bootMessages.length - 1
            );

            bootText.textContent =
                bootMessages[index];
        }

    }, 120);
}

bootLoading();


/* =========================================================
   BOTÃO COMEÇAR
   ========================================================= */

if (startButton) {

    startButton.addEventListener("click", () => {

        if (bootScreen) {
            bootScreen.classList.add("boot-finished");
        }

        if (app) {
            app.classList.remove("hidden-app");
        }

        showToast("Sistema iniciado.");

        createRain();

        updateClock();

        setTimeout(() => {
            document.body.classList.add("started");
        }, 500);

    });

}


/* =========================================================
   RELÓGIO
   ========================================================= */

function updateClock() {

    const timeElement = $("#time");

    if (!timeElement) return;

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    timeElement.textContent =
        `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();


/* =========================================================
   MENSAGEM DO SISTEMA
   ========================================================= */

const systemMessage = $(".system-message");

const systemMessages = [
    "nenhum erro encontrado.",
    "perfil online.",
    "sistema funcionando normalmente.",
    "música carregada.",
    "memórias sincronizadas.",
    "bem-vindo de volta.",
    "tudo tranquilo por aqui.",
    "modo noturno ativado."
];

let messageIndex = 0;

function changeSystemMessage() {

    if (!systemMessage) return;

    const text =
        systemMessages[messageIndex];

    systemMessage.innerHTML =
        `<span class="terminal-symbol">&gt;</span>
         ${text}
         <span class="cursor">_</span>`;

    messageIndex++;

    if (messageIndex >= systemMessages.length) {
        messageIndex = 0;
    }
}

setInterval(changeSystemMessage, 5000);

changeSystemMessage();


/* =========================================================
   MOUSE GLOW
   ========================================================= */

const mouseGlow = $(".mouse-glow");

if (mouseGlow) {

    document.addEventListener("mousemove", (event) => {

        mouseGlow.style.left =
            `${event.clientX}px`;

        mouseGlow.style.top =
            `${event.clientY}px`;

        mouseGlow.style.opacity = "1";

    });

    document.addEventListener("mouseleave", () => {
        mouseGlow.style.opacity = "0";
    });

}


/* =========================================================
   LOGO INTERATIVA
   ========================================================= */

const logo = $(".logo");

if (logo) {

    logo.addEventListener("mouseenter", () => {

        logo.style.transform =
            "skewX(-8deg)";

    });

    logo.addEventListener("mouseleave", () => {

        logo.style.transform =
            "skewX(0deg)";

    });

}


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const settingsButton = $(".settings-button");
const settingsOverlay = $(".settings-overlay");
const closeSettings = $("#closeSettings");

if (settingsButton && settingsOverlay) {

    settingsButton.addEventListener("click", () => {

        settingsOverlay.classList.add("open");

    });

}

if (closeSettings && settingsOverlay) {

    closeSettings.addEventListener("click", () => {

        settingsOverlay.classList.remove("open");

    });

}

if (settingsOverlay) {

    settingsOverlay.addEventListener("click", (event) => {

        if (event.target === settingsOverlay) {
            settingsOverlay.classList.remove("open");
        }

    });

}


/* =========================================================
   FOTO DE PERFIL
   ========================================================= */

const avatar = $(".avatar");
const avatarInput = $("#avatarInput");

if (avatarInput && avatar) {

    avatarInput.addEventListener("change", (event) => {

        const file =
            event.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {

            showToast("Escolha uma imagem.");

            return;
        }

        const reader =
            new FileReader();

        reader.onload = (e) => {

            avatar.src =
                e.target.result;

            localStorage.setItem(
                "luiz_avatar",
                e.target.result
            );

            showToast(
                "Foto de perfil atualizada."
            );

        };

        reader.readAsDataURL(file);

    });

}


/* =========================================================
   CARREGAR FOTO SALVA
   ========================================================= */

const savedAvatar =
    localStorage.getItem("luiz_avatar");

if (savedAvatar && avatar) {

    avatar.src =
        savedAvatar;

}


/* =========================================================
   NOME DO PERFIL
   ========================================================= */

const nameInput = $("#profileNameInput");
const profileName = $(".profile-name");

if (nameInput && profileName) {

    nameInput.value =
        localStorage.getItem(
            "luiz_profile_name"
        ) || profileName.textContent;

}


/* =========================================================
   BIO
   ========================================================= */

const bioInput = $("#bioInput");
const profileBio = $(".profile-bio");

if (bioInput && profileBio) {

    const savedBio =
        localStorage.getItem(
            "luiz_profile_bio"
        );

    if (savedBio) {
        profileBio.textContent =
            savedBio;

        bioInput.value =
            savedBio;
    }

}


/* =========================================================
   SALVAR PERFIL
   ========================================================= */

const saveProfile = $("#saveProfile");

if (saveProfile) {

    saveProfile.addEventListener("click", () => {

        if (nameInput && profileName) {

            const newName =
                nameInput.value.trim();

            if (newName) {

                profileName.textContent =
                    newName;

                localStorage.setItem(
                    "luiz_profile_name",
                    newName
                );

            }

        }

        if (bioInput && profileBio) {

            const newBio =
                bioInput.value.trim();

            if (newBio) {

                profileBio.textContent =
                    newBio;

                localStorage.setItem(
                    "luiz_profile_bio",
                    newBio
                );

            }

        }

        if (settingsOverlay) {
            settingsOverlay.classList.remove("open");
        }

        showToast(
            "Perfil salvo neste dispositivo."
        );

    });

}


/* =========================================================
   RESETAR PERFIL
   ========================================================= */

const resetProfile = $("#resetProfile");

if (resetProfile) {

    resetProfile.addEventListener("click", () => {

        localStorage.removeItem(
            "luiz_avatar"
        );

        localStorage.removeItem(
            "luiz_profile_name"
        );

        localStorage.removeItem(
            "luiz_profile_bio"
        );

        location.reload();

    });

}


/* =========================================================
   GALERIA
   ========================================================= */

const galleryInput = $("#galleryInput");
const galleryGrid = $(".gallery-grid");

if (galleryInput && galleryGrid) {

    galleryInput.addEventListener(
        "change",
        (event) => {

            const files =
                Array.from(event.target.files);

            files.forEach((file) => {

                if (!file.type.startsWith("image/")) {
                    return;
                }

                const reader =
                    new FileReader();

                reader.onload = (e) => {

                    createGalleryImage(
                        e.target.result
                    );

                };

                reader.readAsDataURL(file);

            });

            galleryInput.value = "";

        }
    );

}


function createGalleryImage(src) {

    if (!galleryGrid) return;

    const item =
        document.createElement("div");

    item.className =
        "gallery-item";

    item.innerHTML = `
        <img
            src="${src}"
            alt="Foto da galeria"
        >

        <button
            class="gallery-delete"
            type="button"
            title="Excluir"
        >
            ×
        </button>
    `;

    const deleteButton =
        item.querySelector(
            ".gallery-delete"
        );

    deleteButton.addEventListener(
        "click",
        () => {

            item.remove();

            showToast(
                "Foto removida."
            );

        }
    );

    galleryGrid.appendChild(item);

}


/* =========================================================
   CHUVA
   ========================================================= */

function createRain() {

    const rain =
        $(".rain");

    if (!rain) return;

    if (rain.dataset.created === "true") {
        return;
    }

    rain.dataset.created = "true";

    const amount = 70;

    for (let i = 0; i < amount; i++) {

        const drop =
            document.createElement("span");

        drop.style.left =
            `${Math.random() * 100}%`;

        drop.style.height =
            `${Math.random() * 40 + 15}px`;

        drop.style.animationDuration =
            `${Math.random() * 1.5 + .7}s`;

        drop.style.animationDelay =
            `${Math.random() * 2}s`;

        drop.style.opacity =
            `${Math.random() * .5 + .1}`;

        rain.appendChild(drop);

    }

}


/* =========================================================
   MODO CHUVA
   ========================================================= */

const rainToggle =
    $("#rainToggle");

if (rainToggle) {

    rainToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "rain-off"
            );

            const rain =
                $(".rain");

            if (rain) {

                rain.style.display =
                    document.body.classList.contains(
                        "rain-off"
                    )
                        ? "none"
                        : "block";

            }

        }
    );

}


/* =========================================================
   MÚSICA
   ========================================================= */

const musicCards =
    $$(".music-card");

musicCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const title =
                card.querySelector("h3");

            const artist =
                card.querySelector("span");

            const nowTitle =
                $(".music-now-info h3");

            const nowArtist =
                $(".music-now-info p");

            if (title && nowTitle) {
                nowTitle.textContent =
                    title.textContent;
            }

            if (artist && nowArtist) {
                nowArtist.textContent =
                    artist.textContent;
            }

            showToast(
                "Música selecionada."
            );

        }
    );

});


/* =========================================================
   CONTROLES DE MÚSICA
   ========================================================= */

const musicButtons =
    $$(".music-controls button");

musicButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const action =
                button.dataset.action;

            if (action === "play") {

                showToast(
                    "Player ativado."
                );

            }

            else if (action === "pause") {

                showToast(
                    "Player pausado."
                );

            }

            else if (action === "next") {

                showToast(
                    "Próxima música."
                );

            }

            else if (action === "prev") {

                showToast(
                    "Música anterior."
                );

            }

        }
    );

});


/* =========================================================
   MURAL
   ========================================================= */

const thoughtInput =
    $("#thoughtInput");

const addThought =
    $("#addThought");

const thoughts =
    $(".thoughts");

if (addThought && thoughtInput && thoughts) {

    addThought.addEventListener(
        "click",
        addNewThought
    );

    thoughtInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                event.ctrlKey
            ) {

                addNewThought();

            }

        }
    );

}


function addNewThought() {

    if (!thoughtInput || !thoughts) {
        return;
    }

    const text =
        thoughtInput.value.trim();

    if (!text) {

        showToast(
            "Escreva alguma coisa primeiro."
        );

        return;
    }

    const thought =
        document.createElement("div");

    thought.className =
        "thought-card";

    thought.innerHTML = `
        ${escapeHTML(text)}

        <button
            class="thought-delete"
            type="button"
            title="Excluir"
        >         
        </button>
    `;

    const deleteButton =
        thought.querySelector(
            ".thought-delete"
        );

    deleteButton.addEventListener(
        "click",
        () => {

            thought.remove();

            showToast(
                "Pensamento removido."
            );

        }
    );

    thoughts.prepend(thought);

    thoughtInput.value = "";

    showToast(
        "Publicado no mural."
    );

}


/* =========================================================
   SEGURANÇA DE TEXTO
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;

function showToast(message) {

    let toast =
        $(".toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "toast";

        document.body.appendChild(
            toast
        );

    }

    toast.textContent =
        message;

    toast.classList.add(
        "show"
    );

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);

}


/* =========================================================
   COMMAND CENTER
   ========================================================= */

const commandOverlay =
    $(".command-overlay");

const commandButtons =
    $$(".command-box button");

commandButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const command =
                button.dataset.command;

            executeCommand(
                command
            );

        }
    );

});


function executeCommand(command) {

    if (!command) return;

    if (command === "rain") {

        const rain =
            $(".rain");

        if (rain) {

            const hidden =
                rain.style.display === "none";

            rain.style.display =
                hidden ? "block" : "none";

            showToast(
                hidden
                    ? "Chuva ativada."
                    : "Chuva desativada."
            );

        }

    }

    else if (command === "punpun") {

        document.body.classList.toggle(
            "punpun-mode"
        );

        showToast(
            "Modo Punpun alterado."
        );

    }

    else if (command === "void") {

        document.body.dataset.mood =
            document.body.dataset.mood === "void"
                ? ""
                : "void";

        showToast(
            "Modo vazio alterado."
        );

    }

    else if (command === "top") {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    else if (command === "profile") {

        const profile =
            $(".profile-section");

        if (profile) {

            profile.scrollIntoView({
                behavior: "smooth"
            });

        }

    }

    else if (command === "clear") {

        localStorage.clear();

        showToast(
            "Dados locais apagados."
        );

        setTimeout(() => {
            location.reload();
        }, 800);

    }

    else {

        showToast(
            "Comando executado."
        );

    }

}


/* =========================================================
   CTRL + K
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (commandOverlay) {

                commandOverlay.classList.toggle(
                    "open"
                );

            }

        }

        if (
            event.key === "Escape"
        ) {

            if (settingsOverlay) {
                settingsOverlay.classList.remove(
                    "open"
                );
            }

            if (commandOverlay) {
                commandOverlay.classList.remove(
                    "open"
                );
            }

        }

    }
);


/* =========================================================
   COMMAND OVERLAY CLICK
   ========================================================= */

if (commandOverlay) {

    commandOverlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                commandOverlay
            ) {

                commandOverlay.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   LINKS
   ========================================================= */

const links =
    $$("a[href]");

links.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            showToast(
                "Abrindo link..."
            );

        }
    );

});


/* =========================================================
   EASTER EGG — DIGITAR LUIZ
   ========================================================= */

let secretCode = "";

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.length !== 1
        ) {
            return;
        }

        secretCode +=
            event.key.toLowerCase();

        if (secretCode.length > 20) {
            secretCode =
                secretCode.slice(-20);
        }

        if (
            secretCode.includes("luiz")
        ) {

            showToast(
                "Você encontrou o segredo."
            );

            document.body.classList.toggle(
                "punpun-mode"
            );

            secretCode = "";

        }

    }
);


/* =========================================================
   DUPLO CLIQUE NO LOGO
   ========================================================= */

if (logo) {

    logo.addEventListener(
        "dblclick",
        () => {

            document.body.classList.toggle(
                "punpun-mode"
            );

            showToast(
                "Modo secreto."
            );

        }
    );

}


/* =========================================================
   TECLA P
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.target.tagName === "INPUT" ||
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }

        if (
            event.key.toLowerCase() === "p"
        ) {

            document.body.classList.toggle(
                "punpun-mode"
            );

            showToast(
                "Modo Punpun."
            );

        }

    }
);


/* =========================================================
   ANIMAÇÃO DE ENTRADA DAS SEÇÕES
   ========================================================= */

const sections =
    $$(
        ".about-section, " +
        ".music-section, " +
        ".games-section, " +
        ".links-section, " +
        ".gallery-section, " +
        ".wall-section, " +
        ".status-section"
    );

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .08
        }
    );

sections.forEach((section) => {

    section.style.opacity =
        "0";

    section.style.transform =
        "translateY(25px)";

    section.style.transition =
        "opacity .8s ease, transform .8s ease";

    observer.observe(section);

});


/* =========================================================
   TECLAS DE NAVEGAÇÃO
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Home"
        ) {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

        if (
            event.key === "End"
        ) {

            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });

        }

    }
);


/* =========================================================
   DETECÇÃO DE CELULAR
   ========================================================= */

if (
    /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    )
) {

    document.body.classList.add(
        "mobile-device"
    );

}


/* =========================================================
   STATUS ONLINE
   ========================================================= */

const statusText =
    $(".profile-status");

if (statusText) {

    statusText.textContent =
        "● online agora";

}


/* =========================================================
   ANO AUTOMÁTICO
   ========================================================= */

const year =
    $("#year");

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   FINAL
   ========================================================= */

console.log(
    "%c LUIZ.EXE ",
    "background:#111;color:#fff;padding:8px;font-size:18px;"
);

console.log(
    "Sistema carregado com sucesso."
);
