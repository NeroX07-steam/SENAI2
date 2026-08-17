const chatWindow = document.getElementById('chatWindow');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const POMBO_QUOTES = [
    "Rapaz, essa tua dúvida aí é mais enrolada que fio de fone no bolso.",
    "Pruuu! Eu sou uma IA, mas até eu sei que isso aí que tu falou não faz sentido.",
    "Tô analisando aqui... Processando... É, a conclusão é que tu precisa de um café.",
    "O segredo do sucesso? Voar alto e não cagar no próprio ninho. Fica a dica.",
    "Mano, eu sou um pombo cibernético, não um milagreiro.",
    "Interessante... Já pensou em tentar desligar e ligar de novo? Ou jogar milho no teclado?",
    "Minha rede neural diz que você está precisando de um final de semana sem código.",
    "Pruuu! Se o código não compila, a culpa é do estagiário. Sempre.",
    "Sabe qual a diferença entre eu e você? Eu recebo dados, você recebe boleto.",
    "A vida é curta, o código é longo e a praça tá cheia de gente pra eu... deixa pra lá.",
    "Tu é resiliente, hein? Continuar tentando isso aí depois de 3 erros é coragem.",
    "Vou te mandar a real: o ChatGPT é nutella, eu sou raiz. Pruuu!"
];

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    
    const content = document.createElement('span');
    content.className = 'content';
    content.textContent = text;
    
    msgDiv.appendChild(content);
    chatWindow.appendChild(msgDiv);
    
    // Scroll para o fundo
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function pomboReply() {
    // Simular tempo de pensamento
    const typing = document.createElement('div');
    typing.className = 'msg system';
    typing.id = 'typing';
    typing.textContent = 'Pombo está digitando...';
    chatWindow.appendChild(typing);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        const typingElem = document.getElementById('typing');
        if (typingElem) typingElem.remove();
        
        const randomQuote = POMBO_QUOTES[Math.floor(Math.random() * POMBO_QUOTES.length)];
        addMessage(randomQuote, 'pombo');
    }, 1000 + Math.random() * 1000);
}

function handleSend() {
    const text = userInput.value.trim();
    if (text === '') return;

    addMessage(text, 'user');
    userInput.value = '';
    
    pomboReply();
}

sendBtn.addEventListener('click', handleSend);

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// Mensagem aleatória inicial após 2 segundos
setTimeout(() => {
    if (chatWindow.children.length <= 2) {
        addMessage("Vai ficar só olhando ou vai mandar a boa? Pruuu!", "pombo");
    }
}, 3000);
