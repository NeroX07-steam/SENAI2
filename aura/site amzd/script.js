// ==============================================
// CONFIGURAÇÃO DA DATA
// ==============================================
// O dia exato ainda está como "??/04/2026".
// Quando você descobrir, troque, por exemplo:
// const dataConhecemos = new Date("2026-04-15T00:00:00");

const dataConhecemos = null;


// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});


// Contador
function atualizarContador() {
  if (!dataConhecemos) {
    document.getElementById("days").textContent = "??";
    document.getElementById("hours").textContent = "??";
    document.getElementById("minutes").textContent = "??";
    document.getElementById("seconds").textContent = "??";
    return;
  }

  const agora = new Date();
  const diferenca = agora - dataConhecemos;

  if (diferenca < 0) return;

  const segundos = Math.floor(diferenca / 1000);
  const dias = Math.floor(segundos / 86400);
  const horas = Math.floor((segundos % 86400) / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segundosRestantes = segundos % 60;

  document.getElementById("days").textContent = dias;
  document.getElementById("hours").textContent = horas;
  document.getElementById("minutes").textContent = minutos;
  document.getElementById("seconds").textContent = segundosRestantes;
}

atualizarContador();
setInterval(atualizarContador, 1000);


// Mensagem surpresa
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseBtn.addEventListener("click", () => {
  surpriseMessage.textContent =
    "Julya, espero que nossa amizade continue ficando cada vez mais especial. Você é incrível. ♡";

  for (let i = 0; i < 18; i++) {
    criarCoracao();
  }
});


// Corações flutuando
function criarCoracao() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.textContent = ["♡", "♥", "💗", "💖", "✨"][Math.floor(Math.random() * 5)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
  heart.style.animationDuration = `${4 + Math.random() * 3}s`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7500);
}

setInterval(() => {
  if (Math.random() > 0.45) criarCoracao();
}, 1200);
