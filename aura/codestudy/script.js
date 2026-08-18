/* =========================================================
   CodeStudy — JavaScript principal
   Tudo roda no navegador e usa localStorage para salvar progresso.
========================================================= */

const STORAGE_KEY = 'codestudy-v2';
const PROFILES = {
  luiz: { name: 'Luiz', avatar: '👨‍💻', tag: 'Aprende direto ao ponto', style: 'Explicações objetivas e desafios maiores.' },
  julya: { name: 'Julya', avatar: '🧒', tag: 'Aprende de forma simples', style: 'Explicações como se fosse uma conversa com uma criança.' },
  nairelis: { name: 'Nairelis', avatar: '🧑‍🏫', tag: 'Aprende com detalhes', style: 'Explicações completas e passo a passo.' }
};

const LANGUAGES = {
  html: {
    name: 'HTML', icon: '🌐', colorName: 'Estrutura da Web',
    topics: [
      ['Estrutura básica', '<!DOCTYPE html>, html, head e body'], ['Títulos', 'h1 até h6'], ['Parágrafos', 'p, br e hr'], ['Links', 'a e atributos'], ['Imagens', 'img, src e alt'], ['Listas', 'ul, ol e li'], ['Tabelas', 'table, tr, th e td'], ['Formulários', 'form, input, label e button'], ['Semântica', 'header, nav, main, section, article e footer'], ['Áudio e vídeo', 'audio e video'], ['Acessibilidade', 'alt, label, aria e estrutura semântica'], ['Meta tags', 'charset, viewport e description'], ['Classes e IDs', 'class e id'], ['Data attributes', 'data-*'], ['Entidades HTML', 'símbolos especiais e entidades'], ['Iframe', 'incorporar conteúdo'], ['SVG e canvas', 'gráficos na página'], ['SEO básico', 'estrutura e informações para buscadores']
    ]
  },
  css: {
    name: 'CSS', icon: '🎨', colorName: 'Estilo da Web',
    topics: [
      ['Sintaxe CSS', 'seletor, propriedade e valor'], ['Seletores', 'tag, classe, id e combinadores'], ['Cores', 'hex, rgb, hsl e transparência'], ['Unidades', 'px, %, rem, em, vh e vw'], ['Box model', 'margin, border, padding e content'], ['Display', 'block, inline e inline-block'], ['Flexbox', 'container e itens flex'], ['Grid', 'linhas, colunas e áreas'], ['Position', 'static, relative, absolute, fixed e sticky'], ['Pseudo-classes', ':hover, :focus, :active e :nth-child'], ['Pseudo-elementos', '::before e ::after'], ['Tipografia', 'font-size, weight, family e line-height'], ['Backgrounds', 'imagem, tamanho, posição e repetição'], ['Bordas e sombras', 'border, radius e box-shadow'], ['Transições', 'transition'], ['Animações', '@keyframes e animation'], ['Responsividade', 'media queries'], ['Variáveis CSS', '--variavel e var()'], ['Z-index', 'camadas'], ['Overflow', 'hidden, auto e scroll']
    ]
  },
  js: {
    name: 'JavaScript', icon: '⚡', colorName: 'Comportamento da Web',
    topics: [
      ['Variáveis', 'let, const e var'], ['Tipos de dados', 'string, number, boolean, null e undefined'], ['Operadores', 'aritméticos, comparação e lógicos'], ['Entrada e saída', 'prompt, alert e console'], ['If / Else', 'decisões condicionais'], ['Switch', 'múltiplos casos'], ['Operador ternário', 'condição em uma expressão'], ['Loops', 'for, while e do while'], ['Funções', 'function e return'], ['Arrow functions', 'sintaxe =>'], ['Escopo', 'global, local e bloco'], ['Arrays', 'listas de valores'], ['Métodos de array', 'map, filter, find, reduce e forEach'], ['Objetos', 'chave e valor'], ['Desestruturação', 'destructuring'], ['Spread e rest', '... em arrays e funções'], ['DOM', 'selecionar e alterar elementos'], ['Eventos', 'click, input, submit e outros'], ['Formulários', 'capturar e validar dados'], ['localStorage', 'salvar dados no navegador'], ['JSON', 'JSON.parse e JSON.stringify'], ['Fetch', 'requisições HTTP'], ['Async / Await', 'código assíncrono'], ['Promises', 'then, catch e finally'], ['Módulos', 'import e export'], ['Classes', 'class, constructor e methods'], ['try / catch', 'tratamento de erros'], ['Set e Map', 'coleções especiais'], ['Timers', 'setTimeout e setInterval']
    ]
  },
  python: {
    name: 'Python', icon: '🐍', colorName: 'Lógica e Automação',
    topics: [
      ['Sintaxe básica', 'indentação e comandos'], ['Variáveis', 'nomes e atribuição'], ['Tipos', 'str, int, float e bool'], ['Input', 'entrada de dados'], ['Print', 'saída de dados'], ['Operadores', 'aritméticos, comparação e lógicos'], ['If / Elif / Else', 'decisões'], ['Loops for', 'repetição controlada'], ['Loop while', 'repetição condicional'], ['Range', 'sequências numéricas'], ['Funções', 'def e return'], ['Parâmetros', 'dados recebidos por funções'], ['Listas', 'coleções mutáveis'], ['Tuplas', 'coleções imutáveis'], ['Dicionários', 'chave e valor'], ['Sets', 'conjuntos'], ['List comprehensions', 'criação compacta de listas'], ['Strings', 'texto e métodos'], ['Exceções', 'try, except e finally'], ['Módulos', 'import'], ['Arquivos', 'open, read e write'], ['POO', 'classes e objetos'], ['Herança', 'reutilização de classes'], ['Lambdas', 'funções pequenas'], ['Map / Filter', 'processamento de coleções'], ['Decorators', 'funções que envolvem funções'], ['Generators', 'yield'], ['Virtualenv', 'ambientes isolados'], ['pip', 'gerenciador de pacotes'], ['Type hints', 'anotações de tipos']
    ]
  },
  cpp: {
    name: 'C++', icon: '⚙️', colorName: 'Programação de sistemas',
    topics: [
      ['Estrutura básica', '#include e main'], ['cout e cin', 'saída e entrada'], ['Variáveis', 'declaração e atribuição'], ['Tipos', 'int, double, char e bool'], ['Constantes', 'const'], ['Operadores', 'aritméticos e lógicos'], ['If / Else', 'condições'], ['Switch', 'múltiplos casos'], ['Loops', 'for, while e do while'], ['Funções', 'declaração e retorno'], ['Parâmetros', 'passagem de valores'], ['Arrays', 'vetores'], ['Strings', 'std::string'], ['Pointers', 'endereços de memória'], ['References', 'referências'], ['Structs', 'estruturas personalizadas'], ['Classes', 'programação orientada a objetos'], ['Constructors', 'inicialização de objetos'], ['Herança', 'classes derivadas'], ['Polimorfismo', 'sobrescrita e virtual'], ['Encapsulamento', 'private, public e protected'], ['Templates', 'código genérico'], ['STL', 'biblioteca padrão'], ['vector', 'vetor dinâmico'], ['map', 'estrutura chave-valor'], ['set', 'conjunto ordenado'], ['Exceptions', 'try, catch e throw'], ['Arquivos', 'fstream'], ['Namespaces', 'organização de nomes'], ['Memória dinâmica', 'new e delete']
    ]
  },
  java: {
    name: 'Java', icon: '☕', colorName: 'Orientação a Objetos',
    topics: [
      ['Estrutura básica', 'class e main'], ['Variáveis', 'declaração'], ['Tipos primitivos', 'int, double, char e boolean'], ['Strings', 'String'], ['Operadores', 'aritméticos e lógicos'], ['If / Else', 'condicionais'], ['Switch', 'múltiplos casos'], ['Loops', 'for, while e do while'], ['Métodos', 'funções em classes'], ['Arrays', 'coleções fixas'], ['ArrayList', 'listas dinâmicas'], ['Classes', 'modelos de objetos'], ['Objetos', 'instâncias'], ['Constructors', 'inicialização'], ['Herança', 'extends'], ['Interfaces', 'contratos'], ['Polimorfismo', 'sobrescrita'], ['Encapsulamento', 'modificadores'], ['Exceptions', 'try/catch'], ['Packages', 'organização'], ['Generics', 'tipos genéricos']
    ]
  },
  sql: {
    name: 'SQL', icon: '🗄️', colorName: 'Banco de dados',
    topics: [
      ['SELECT', 'consultar dados'], ['WHERE', 'filtrar registros'], ['ORDER BY', 'ordenar resultados'], ['INSERT', 'inserir dados'], ['UPDATE', 'atualizar dados'], ['DELETE', 'remover dados'], ['CREATE TABLE', 'criar tabelas'], ['ALTER TABLE', 'alterar estrutura'], ['DROP TABLE', 'remover tabelas'], ['PRIMARY KEY', 'identificador único'], ['FOREIGN KEY', 'relacionamento entre tabelas'], ['JOIN', 'combinar tabelas'], ['INNER JOIN', 'combinação interna'], ['LEFT JOIN', 'manter registros da esquerda'], ['GROUP BY', 'agrupar resultados'], ['HAVING', 'filtrar grupos'], ['COUNT', 'contar registros'], ['SUM', 'somar valores'], ['AVG', 'média'], ['MIN / MAX', 'menor e maior valor'], ['NULL', 'ausência de valor'], ['LIKE', 'busca por padrão'], ['IN', 'comparar com lista'], ['BETWEEN', 'faixa de valores'], ['Subqueries', 'consulta dentro de consulta'], ['Índices', 'melhorar buscas'], ['Normalização', 'organizar dados'], ['Transações', 'COMMIT e ROLLBACK']
    ]
  }
};

const LEVELS = {
  1: { name: 'Nível 1 — Fundamentos', desc: 'Comece pelos conceitos mais importantes.', xp: 20, unlock: 0, count: 10 },
  2: { name: 'Nível 2 — Intermediário', desc: 'Aprofunde seus conhecimentos e pratique mais.', xp: 35, unlock: 25, count: 20 },
  3: { name: 'Nível 3 — Avançado', desc: 'Desafios maiores para testar seu domínio.', xp: 60, unlock: 55, count: 50 }
};

let state = loadState();
let currentView = 'dashboard';
let currentLanguage = 'html';
let currentTopicIndex = 0;
let currentLesson = null;
let selectedQuizAnswer = null;
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;

function defaultState() {
  return {
    currentProfile: null,
    theme: 'dark',
    profiles: Object.fromEntries(Object.keys(PROFILES).map(id => [id, {
      xp: 0,
      lessons: {},
      exercises: {},
      quiz: {},
      achievements: [],
      completedLevels: {}
    }]))
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return defaultState();
    const base = defaultState();
    return {
      ...base,
      ...parsed,
      profiles: Object.fromEntries(Object.keys(PROFILES).map(id => [id, { ...base.profiles[id], ...(parsed.profiles?.[id] || {}) }]))
    };
  } catch { return defaultState(); }
}

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function profileData() { return state.profiles[state.currentProfile]; }
function currentProfile() { return PROFILES[state.currentProfile]; }
function esc(text) { return String(text).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function toast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2200);
}
function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }
function normalize(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().replace(/\s+/g,' '); }
function slug(s) { return normalize(s).replace(/[^a-z0-9]+/g,'-'); }
function activeLessons() { return profileData()?.lessons || {}; }

function getLanguageStats(langKey) {
  const topics = LANGUAGES[langKey].topics;
  const done = topics.filter((_, i) => activeLessons()[`${langKey}:${i}`]).length;
  return { done, total: topics.length, percent: pct(done, topics.length) };
}

function totalProgress() {
  const all = Object.keys(LANGUAGES).reduce((acc, key) => acc + LANGUAGES[key].topics.length, 0);
  const done = Object.keys(LANGUAGES).reduce((acc, key) => acc + getLanguageStats(key).done, 0);
  return { done, total: all, percent: pct(done, all) };
}

function renderProfiles() {
  const root = document.getElementById('profileOptions');
  root.innerHTML = Object.entries(PROFILES).map(([id, p]) => {
    const d = state.profiles[id];
    const prog = Object.keys(LANGUAGES).reduce((sum, k) => sum + LANGUAGES[k].topics.filter((_,i)=>d.lessons?.[`${k}:${i}`]).length, 0);
    return `<button class="profile-option" data-profile="${id}">
      <div class="avatar">${p.avatar}</div>
      <h3>${p.name}</h3>
      <p>${p.tag}</p>
      <div class="profile-stats"><span>⭐ ${d.xp} XP</span><span>📚 ${prog} aulas</span></div>
    </button>`;
  }).join('');
  root.querySelectorAll('[data-profile]').forEach(btn => btn.addEventListener('click', () => selectProfile(btn.dataset.profile)));

  const last = state.currentProfile;
  const cont = document.getElementById('continueLastProfile');
  if (last && PROFILES[last]) {
    cont.classList.remove('hidden');
    document.getElementById('lastProfileName').textContent = PROFILES[last].name;
    cont.onclick = () => selectProfile(last);
  } else cont.classList.add('hidden');
}

function selectProfile(id) {
  if (!PROFILES[id]) return;
  state.currentProfile = id;
  saveState();
  document.getElementById('profileScreen').classList.remove('active');
  document.getElementById('profileScreen').classList.add('hidden');
  document.getElementById('mainShell').classList.remove('hidden');
  document.body.classList.toggle('light', state.theme === 'light');
  updateHeader();
  renderCurrentView();
  toast(`Perfil ${PROFILES[id].name} carregado!`);
}

function updateHeader() {
  const p = currentProfile();
  const d = profileData();
  document.getElementById('topProfileName').textContent = p.name;
  document.getElementById('topProfileTag').textContent = p.tag;
  document.getElementById('headerXP').textContent = d.xp;
  document.getElementById('currentProfileCard').innerHTML = `<div class="mini-avatar">${p.avatar}</div><div><strong>${p.name}</strong><small>${d.xp} XP</small></div>`;
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
  const target = document.getElementById(`${view}View`);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-btn[data-view]').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
  renderCurrentView();
  closeSidebar();
}
function renderCurrentView() {
  updateHeader();
  if (currentView === 'dashboard') renderDashboard();
  if (currentView === 'study') renderStudy();
  if (currentView === 'lessons') renderLessons();
  if (currentView === 'exercises') renderExercises();
  if (currentView === 'quiz') renderQuizHome();
  if (currentView === 'progress') renderProgress();
}

function renderDashboard() {
  const t = totalProgress();
  const p = currentProfile();
  const langs = Object.entries(LANGUAGES);
  document.getElementById('dashboardView').innerHTML = `
    <div class="hero-banner">
      <span class="eyebrow">📚 Central de Programação</span>
      <h2>Oi, ${esc(p.name)} 👋</h2>
      <p>${esc(p.style)} Estude HTML, CSS, JavaScript, Python, C++, Java e SQL com aulas, exemplos, exercícios e quiz.</p>
    </div>
    <div class="grid grid-4" style="margin-bottom:18px">
      <div class="card stat"><div><span>Progresso geral</span><strong>${t.percent}%</strong></div><div>📈</div></div>
      <div class="card stat"><div><span>Aulas concluídas</span><strong>${t.done}</strong></div><div>✅</div></div>
      <div class="card stat"><div><span>XP</span><strong>${profileData().xp}</strong></div><div>⭐</div></div>
      <div class="card stat"><div><span>Conquistas</span><strong>${profileData().achievements.length}</strong></div><div>🏆</div></div>
    </div>
    <div class="card" style="margin-bottom:18px">
      <div class="stat"><div><strong>Seu progresso</strong><span>Continue de onde parou.</span></div><strong>${t.percent}%</strong></div>
      <div class="progress-bar" style="margin-top:14px"><div class="progress-fill" style="width:${t.percent}%"></div></div>
    </div>
    <div class="page-title"><div><h1>Linguagens</h1><p>Escolha uma linguagem para estudar.</p></div><button class="btn btn-primary" id="goStudy">📖 Abrir estudo</button></div>
    <div class="grid grid-4">${langs.map(([key, l]) => {
      const s = getLanguageStats(key);
      return `<div class="card lang-card" data-lang="${key}">
        <div class="lang-icon">${l.icon}</div>
        <div class="lang-title"><h3>${l.name}</h3><span class="percent">${s.percent}%</span></div>
        <p style="margin:8px 0 12px">${l.colorName}</p>
        <div class="progress-bar"><div class="progress-fill" style="width:${s.percent}%"></div></div>
        <div class="small-label" style="margin-top:9px">${s.done}/${s.total} conceitos estudados</div>
      </div>`;
    }).join('')}</div>
  `;
  document.querySelectorAll('[data-lang]').forEach(el => el.addEventListener('click', () => openLanguage(el.dataset.lang)));
  document.getElementById('goStudy').onclick = () => switchView('study');
}

function openLanguage(langKey) {
  currentLanguage = langKey;
  switchView('lessons');
}

function renderStudy() {
  document.getElementById('studyView').innerHTML = `
    <div class="page-title"><div><h1>📖 Estudo</h1><p>Escolha uma linguagem e veja todos os conceitos.</p></div><button class="btn btn-secondary" id="studyRandom">🎲 Conceito aleatório</button></div>
    <div class="grid grid-4">${Object.entries(LANGUAGES).map(([key,l]) => {
      const s = getLanguageStats(key);
      return `<div class="card lang-card" data-study-lang="${key}"><div class="lang-icon">${l.icon}</div><h3>${l.name}</h3><p>${l.colorName}</p><div class="progress-bar" style="margin-top:16px"><div class="progress-fill" style="width:${s.percent}%"></div></div><div class="small-label" style="margin-top:8px">${s.done}/${s.total} estudados</div></div>`;
    }).join('')}</div>
    <div class="card" style="margin-top:18px">
      <h3>Como estudar</h3>
      <p>1. Abra uma linguagem. 2. Leia o conceito. 3. Veja o exemplo. 4. Faça o exercício. 5. Marque a aula como concluída para ganhar XP.</p>
    </div>
  `;
  document.querySelectorAll('[data-study-lang]').forEach(el => el.onclick = () => openLanguage(el.dataset.studyLang));
  document.getElementById('studyRandom').onclick = () => {
    const keys = Object.keys(LANGUAGES);
    const k = keys[Math.floor(Math.random()*keys.length)];
    currentLanguage = k;
    currentTopicIndex = Math.floor(Math.random()*LANGUAGES[k].topics.length);
    openTopic(k, currentTopicIndex);
  };
}

function renderLessons() {
  const lang = LANGUAGES[currentLanguage];
  const s = getLanguageStats(currentLanguage);
  document.getElementById('lessonsView').innerHTML = `
    <div class="page-title"><div><h1>${lang.icon} ${lang.name}</h1><p>${lang.colorName}. ${s.done}/${s.total} conceitos concluídos.</p></div><button class="btn btn-secondary" id="backLanguages">← Linguagens</button></div>
    <div class="card" style="margin-bottom:18px"><div class="stat"><div><strong>Progresso de ${lang.name}</strong><span>${s.percent}% concluído</span></div><strong>${s.percent}%</strong></div><div class="progress-bar" style="margin-top:14px"><div class="progress-fill" style="width:${s.percent}%"></div></div></div>
    <div class="grid grid-3" style="margin-bottom:18px">${Object.entries(LEVELS).map(([num, level]) => renderLevelCard(currentLanguage, Number(num), level)).join('')}</div>
    <div class="card"><div class="lesson-header"><div><h3>📚 Todos os conceitos</h3><span class="small-label">Clique em qualquer conceito para estudar.</span></div><button id="nextLesson" class="btn btn-primary">Continuar</button></div><div class="topic-list">${lang.topics.map(([title,desc],i)=>{
      const done = !!activeLessons()[`${currentLanguage}:${i}`];
      return `<div class="topic-item"><div class="topic-left"><div class="topic-number">${i+1}</div><div><strong>${done?'✅ ':''}${esc(title)}</strong><small>${esc(desc)}</small></div></div><button class="btn ${done?'btn-secondary':'btn-primary'}" data-topic="${i}">${done?'Revisar':'Estudar'}</button></div>`;
    }).join('')}</div></div>
  `;
  document.getElementById('backLanguages').onclick = () => switchView('study');
  document.getElementById('nextLesson').onclick = () => {
    const firstUndone = lang.topics.findIndex((_,i)=>!activeLessons()[`${currentLanguage}:${i}`]);
    openTopic(currentLanguage, firstUndone >= 0 ? firstUndone : 0);
  };
  document.querySelectorAll('[data-topic]').forEach(btn => btn.onclick = () => openTopic(currentLanguage, Number(btn.dataset.topic)));
  document.querySelectorAll('[data-level]').forEach(card => card.onclick = () => openLevel(card.dataset.lang, Number(card.dataset.level)));
}

function completedLevel(langKey, level) {
  return !!profileData().completedLevels[`${langKey}:${level}`];
}
function levelStats(langKey, level) {
  const topics = LANGUAGES[langKey].topics;
  const size = LEVELS[level].count;
  const keys = topics.map((_,i)=>`${langKey}:${i}`);
  const done = keys.filter(k=>activeLessons()[k]).length;
  const sliceDone = keys.slice(0, Math.min(size,keys.length)).filter(k=>activeLessons()[k]).length;
  const fakeCount = size;
  return { done: sliceDone, total: fakeCount };
}
function renderLevelCard(langKey, number, level) {
  const stats = levelStats(langKey, number);
  const global = totalProgress().percent;
  const unlocked = number === 1 || global >= level.unlock;
  return `<div class="card level-card ${unlocked?'':'locked'}" data-level="${number}" data-lang="${langKey}">
    <div class="level-top"><span class="level-badge">NÍVEL ${number}</span><span>${unlocked?'🔓':'🔒'}</span></div>
    <h3>${level.name}</h3><p>${level.desc}</p>
    <div class="progress-bar" style="margin-top:14px"><div class="progress-fill" style="width:${pct(stats.done,stats.total)}%"></div></div>
    <div class="level-foot"><span>${stats.done}/${stats.total} desafios</span><span>+${level.xp} XP cada</span></div>
  </div>`;
}
function openLevel(langKey, level) {
  const global = totalProgress().percent;
  if (level > 1 && global < LEVELS[level].unlock) {
    toast(`Esse nível abre com ${LEVELS[level].unlock}% de progresso geral.`);
    return;
  }
  currentLanguage = langKey;
  const concepts = LANGUAGES[langKey].topics;
  const needed = LEVELS[level].count;
  const items = Array.from({length:needed}, (_,i) => concepts[i % concepts.length]);
  showModal(`<div class="page-title"><div><h1>${LEVELS[level].name}</h1><p>${LANGUAGES[langKey].name}: ${needed} desafios gerados a partir dos conceitos.</p></div></div>
    <div class="topic-list">${items.map(([title,desc],i)=>`<div class="topic-item"><div class="topic-left"><div class="topic-number">${i+1}</div><div><strong>${esc(title)}</strong><small>${esc(desc)}</small></div></div><button class="btn btn-primary" data-level-topic="${i}">Abrir</button></div>`).join('')}</div>`);
  document.querySelectorAll('[data-level-topic]').forEach(btn => btn.onclick = () => { hideModal(); openTopic(langKey, Number(btn.dataset.levelTopic) % concepts.length); });
}

function explanationFor(profileId, langKey, title, desc) {
  const p = PROFILES[profileId];
  if (profileId === 'julya') return `Pensa que **${title}** é uma ferramenta da programação. ${desc}. Em palavras bem simples: você aprende essa ferramenta para conseguir mandar instruções melhores para o computador.`;
  if (profileId === 'nairelis') return `O conceito **${title}** faz parte de ${LANGUAGES[langKey].name}. Ele está relacionado a ${desc}. A ideia é entender o que ele resolve, como funciona e quando usar.`;
  return `**${title}** é um dos conceitos de ${LANGUAGES[langKey].name}. ${desc}. O objetivo é reconhecer esse conceito no código e saber quando aplicá-lo.`;
}

function exampleFor(langKey, title) {
  const t = normalize(title);
  const examples = {
    html: {
      'estrutura basica': '<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Minha página</title>\n</head>\n<body>\n  <h1>Olá!</h1>\n</body>\n</html>',
      'titulos': '<h1>Título principal</h1>\n<h2>Subtítulo</h2>',
      'links': '<a href="https://exemplo.com">Abrir site</a>',
      'imagens': '<img src="foto.jpg" alt="Descrição da foto">',
      'paragrafos': '<p>Esse é um parágrafo.</p>'
    },
    css: {
      'sintaxe css': 'h1 {\n  color: #7c5cff;\n  font-size: 32px;\n}',
      'seletores': '.card { padding: 20px; }\n#titulo { font-weight: 800; }',
      'box model': '.caixa {\n  margin: 10px;\n  border: 2px solid black;\n  padding: 20px;\n}',
      'flexbox': '.container {\n  display: flex;\n  gap: 12px;\n  justify-content: center;\n}',
      'responsividade': '@media (max-width: 700px) {\n  .menu { display: block; }\n}'
    },
    js: {
      'variaveis': 'const nome = "Luiz";\nlet idade = 15;\nconsole.log(nome, idade);',
      'if / else': 'const idade = 15;\nif (idade >= 18) {\n  console.log("Maior de idade");\n} else {\n  console.log("Menor de idade");\n}',
      'funcoes': 'function somar(a, b) {\n  return a + b;\n}\nconsole.log(somar(2, 3));',
      'arrays': 'const frutas = ["maçã", "banana", "uva"];\nconsole.log(frutas[0]);',
      'dom': 'const titulo = document.querySelector("h1");\ntitulo.textContent = "Novo título";'
    },
    python: {
      'variaveis': 'nome = "Luiz"\nidade = 15\nprint(nome, idade)',
      'if / elif / else': 'idade = 15\nif idade >= 18:\n    print("Adulto")\nelse:\n    print("Menor")',
      'funcoes': 'def somar(a, b):\n    return a + b\n\nprint(somar(2, 3))',
      'listas': 'frutas = ["maçã", "banana", "uva"]\nprint(frutas[0])',
      'dicionarios': 'aluno = {"nome": "Luiz", "idade": 15}\nprint(aluno["nome"])'
    },
    cpp: {
      'estrutura basica': '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Olá!";\n  return 0;\n}',
      'cout e cin': 'int idade;\ncin >> idade;\ncout << idade;',
      'if / else': 'if (idade >= 18) {\n  cout << "Adulto";\n} else {\n  cout << "Menor";\n}',
      'funcoes': 'int somar(int a, int b) {\n  return a + b;\n}'
    },
    java: {
      'estrutura basica': 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Olá!");\n  }\n}',
      'variaveis': 'String nome = "Luiz";\nint idade = 15;',
      'metodos': 'static int somar(int a, int b) {\n  return a + b;\n}'
    },
    sql: {
      'select': 'SELECT nome, idade\nFROM alunos;',
      'where': 'SELECT *\nFROM alunos\nWHERE idade >= 18;',
      'join': 'SELECT alunos.nome, cursos.nome\nFROM alunos\nJOIN cursos ON alunos.curso_id = cursos.id;'
    }
  };
  return examples[langKey]?.[t] || genericExample(langKey, title);
}
function genericExample(langKey, title) {
  const name = LANGUAGES[langKey].name;
  if (langKey === 'html') return `<!-- Exemplo de ${title} -->\n<div class="exemplo">Olá!</div>`;
  if (langKey === 'css') return `/* Exemplo de ${title} */\n.exemplo {\n  padding: 12px;\n}`;
  if (langKey === 'js') return `// Exemplo de ${title}\nconst valor = 10;\nconsole.log(valor);`;
  if (langKey === 'python') return `# Exemplo de ${title}\nvalor = 10\nprint(valor)`;
  if (langKey === 'cpp') return `// Exemplo de ${title}\nint valor = 10;\ncout << valor;`;
  if (langKey === 'java') return `// Exemplo de ${title}\nint valor = 10;\nSystem.out.println(valor);`;
  return `-- Exemplo de ${title}\nSELECT * FROM tabela;`;
}

function openTopic(langKey, index) {
  currentLanguage = langKey;
  currentTopicIndex = index;
  currentLesson = { langKey, index };
  const lang = LANGUAGES[langKey];
  const [title, desc] = lang.topics[index];
  const key = `${langKey}:${index}`;
  const done = !!activeLessons()[key];
  const example = exampleFor(langKey, title);
  showModal(`
    <div class="lesson-content">
      <div class="lesson-header"><div><span class="eyebrow">${lang.icon} ${lang.name}</span><h2>${esc(title)}</h2></div><span class="small-label">Conceito ${index+1}/${lang.topics.length}</span></div>
      <p>${esc(explanationFor(state.currentProfile, langKey, title, desc)).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</p>
      <div class="note">💡 <strong>Ideia principal:</strong> ${esc(desc)}.</div>
      <h3>💻 Exemplo</h3>
      <pre><code>${esc(example)}</code></pre>
      <h3>🧠 O que você precisa lembrar</h3>
      <ul><li>Entenda para que o conceito serve.</li><li>Observe a estrutura do exemplo.</li><li>Tente escrever uma versão parecida sem copiar.</li></ul>
      <div class="card" style="margin-top:18px;background:var(--panel-2)">
        <div class="lesson-header"><div><strong>🧩 Mini exercício</strong><div class="small-label">Qual é o nome do conceito que estamos estudando?</div></div></div>
        <input id="lessonAnswer" class="answer-input" placeholder="Digite sua resposta..." autocomplete="off" />
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn btn-primary" id="checkLesson">Verificar</button><button class="btn btn-secondary" id="showLessonAnswer">Mostrar resposta</button></div>
        <div id="lessonFeedback" class="answer-feedback"></div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:18px"><button class="btn ${done?'btn-secondary':'btn-primary'}" id="completeLesson">${done?'✅ Aula concluída':'✅ Marcar como concluída'}</button><button class="btn btn-secondary" id="openNextLesson">Próxima →</button></div>
    </div>
  `);
  document.getElementById('checkLesson').onclick = () => checkLessonAnswer(title);
  document.getElementById('showLessonAnswer').onclick = () => toast(`Resposta: ${title}`);
  document.getElementById('completeLesson').onclick = () => completeLesson(langKey,index);
  document.getElementById('openNextLesson').onclick = () => {
    hideModal();
    const next = (index + 1) % lang.topics.length;
    setTimeout(()=>openTopic(langKey,next),100);
  };
  document.getElementById('lessonAnswer').addEventListener('keydown', e => { if(e.key === 'Enter') checkLessonAnswer(title); });
}

function checkLessonAnswer(title) {
  const input = document.getElementById('lessonAnswer');
  const fb = document.getElementById('lessonFeedback');
  const val = normalize(input.value);
  const answers = [normalize(title), slug(title), normalize(title).replace(/[^a-z0-9 ]/g,'')];
  const correct = answers.some(a => val === a || val.includes(a) || a.includes(val) && val.length > 3);
  fb.className = `answer-feedback show ${correct?'correct':'wrong'}`;
  fb.textContent = correct ? '✅ Boa! Resposta aceita.' : `❌ Ainda não. Dica: procure o nome do conceito no título da aula.`;
  if (correct) completeLesson(currentLesson.langKey,currentLesson.index,false);
}
function completeLesson(langKey,index,announce=true) {
  const key = `${langKey}:${index}`;
  if (!activeLessons()[key]) {
    profileData().lessons[key] = true;
    profileData().xp += 20;
    saveState();
    updateHeader();
    checkAchievements();
    if (announce) toast('+20 XP! Aula concluída.');
  }
  const btn = document.getElementById('completeLesson');
  if (btn) { btn.textContent = '✅ Aula concluída'; btn.className = 'btn btn-secondary'; }
}

function generateExercises(langKey, count=12) {
  const concepts = LANGUAGES[langKey].topics;
  const exercises = [];
  const templates = [
    (t,d) => ({ q:`Em ${LANGUAGES[langKey].name}, para que serve "${t}"?`, answers:[t,d,`conceito ${t}`], hint:`Pense na ideia: ${d}.` }),
    (t,d) => ({ q:`Qual destes termos está diretamente ligado a "${t}"?`, choices:[t, d, 'banana', 'monitor'], correct:0 }),
    (t,d) => ({ q:`Escreva o nome do conceito: "${d}".`, answers:[t], hint:`Começa com: ${t.slice(0, Math.min(3,t.length))}...` })
  ];
  for (let i=0;i<count;i++) {
    const [t,d]=concepts[i%concepts.length];
    exercises.push({...templates[i%templates.length](t,d), id:`${langKey}-ex-${i}`});
  }
  return exercises;
}

function renderExercises() {
  const exercises = generateExercises(currentLanguage, 15);
  document.getElementById('exercisesView').innerHTML = `
    <div class="page-title"><div><h1>🧩 Exercícios</h1><p>Pratique e use várias respostas aceitas.</p></div><select id="exerciseLanguage" class="answer-input" style="max-width:220px">${Object.entries(LANGUAGES).map(([k,l])=>`<option value="${k}" ${k===currentLanguage?'selected':''}>${l.icon} ${l.name}</option>`).join('')}</select></div>
    <div class="grid" style="gap:14px">${exercises.map((ex,i)=>renderExerciseCard(ex,i)).join('')}</div>
  `;
  document.getElementById('exerciseLanguage').onchange = e => { currentLanguage=e.target.value; renderExercises(); };
  document.querySelectorAll('[data-ex-check]').forEach(btn => btn.onclick = () => checkExercise(btn.dataset.exCheck));
  document.querySelectorAll('[data-ex-show]').forEach(btn => btn.onclick = () => showExerciseAnswer(btn.dataset.exShow));
}
function renderExerciseCard(ex,i) {
  const solved = profileData().exercises[ex.id];
  return `<div class="card"><div class="exercise-meta"><span>Exercício ${i+1}</span><span>${solved?'✅ Resolvido':'20 XP'}</span></div><h3>${esc(ex.q)}</h3>${ex.choices?`<div class="choice-list">${ex.choices.map((c,j)=>`<button class="choice-btn" data-choice="${ex.id}" data-value="${j}">${String.fromCharCode(65+j)}) ${esc(c)}</button>`).join('')}</div>`:`<input id="ans-${ex.id}" class="answer-input" placeholder="Digite sua resposta..." />`}<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn btn-primary" data-ex-check="${ex.id}">Verificar</button><button class="btn btn-secondary" data-ex-show="${ex.id}">Mostrar resposta</button></div><div id="fb-${ex.id}" class="answer-feedback"></div></div>`;
}
function findExercise(id) { return generateExercises(currentLanguage,15).find(x=>x.id===id); }
function checkExercise(id) {
  const ex = findExercise(id); const fb=document.getElementById(`fb-${id}`); let correct=false;
  if (ex.choices) {
    const sel = document.querySelector(`[data-choice="${id}"].selected`);
    correct = !!sel && Number(sel.dataset.value) === ex.correct;
  } else {
    const input=document.getElementById(`ans-${id}`); const val=normalize(input.value); correct=ex.answers.some(a=>val===normalize(a)||val.includes(normalize(a)));
  }
  fb.className=`answer-feedback show ${correct?'correct':'wrong'}`;
  fb.textContent=correct?'✅ Correto! +20 XP.':`❌ Ainda não. ${ex.hint||'Tente novamente ou mostre a resposta.'}`;
  if(correct && !profileData().exercises[id]) { profileData().exercises[id]=true; profileData().xp+=20; saveState(); updateHeader(); checkAchievements(); }
}
function showExerciseAnswer(id) { const ex=findExercise(id); toast(ex.choices?`Resposta: ${String.fromCharCode(65+ex.correct)} — ${ex.choices[ex.correct]}`:`Respostas aceitas: ${ex.answers.slice(0,4).join(' / ')}`); }

function renderQuizHome() {
  document.getElementById('quizView').innerHTML = `
    <div class="page-title"><div><h1>🧠 Quiz</h1><p>Teste seus conhecimentos em qualquer linguagem.</p></div></div>
    <div class="grid grid-4">${Object.entries(LANGUAGES).map(([k,l])=>`<div class="card lang-card" data-quiz-lang="${k}"><div class="lang-icon">${l.icon}</div><h3>${l.name}</h3><p>10 perguntas rápidas.</p><div class="small-label" style="margin-top:12px">Melhor: ${profileData().quiz[k]?.best||0}/10</div></div>`).join('')}</div>
  `;
  document.querySelectorAll('[data-quiz-lang]').forEach(el=>el.onclick=()=>startQuiz(el.dataset.quizLang));
}
function startQuiz(langKey) {
  currentLanguage=langKey;
  const source=LANGUAGES[langKey].topics;
  quizQuestions=Array.from({length:10},(_,i)=>{ const [title,desc]=source[(i*3)%source.length]; const choices=[title,desc,'Sintaxe de teclado','Um navegador']; const shuffled=[...choices].sort(()=>Math.random()-.5); return {q:`Qual opção representa o conceito "${title}"?`, choices:shuffled, correct:shuffled.indexOf(title)}; });
  quizIndex=0; quizScore=0; selectedQuizAnswer=null; renderQuizQuestion();
}
function renderQuizQuestion() {
  if (quizIndex >= quizQuestions.length) return finishQuiz();
  const q=quizQuestions[quizIndex];
  document.getElementById('quizView').innerHTML=`<div class="page-title"><div><h1>🧠 Quiz — ${LANGUAGES[currentLanguage].name}</h1><p>Pergunta ${quizIndex+1} de ${quizQuestions.length}</p></div><button class="btn btn-secondary" id="quitQuiz">Sair</button></div><div class="card"><div class="progress-bar" style="margin-bottom:22px"><div class="progress-fill" style="width:${(quizIndex/quizQuestions.length)*100}%"></div></div><p class="quiz-question">${esc(q.q)}</p><div class="choice-list">${q.choices.map((c,i)=>`<button class="choice-btn" data-qchoice="${i}">${String.fromCharCode(65+i)}) ${esc(c)}</button>`).join('')}</div><div style="margin-top:18px"><button class="btn btn-primary" id="quizNext" disabled>Responder</button></div><div id="quizFeedback" class="answer-feedback"></div></div>`;
  document.getElementById('quitQuiz').onclick=()=>renderQuizHome();
  document.querySelectorAll('[data-qchoice]').forEach(btn=>btn.onclick=()=>{ document.querySelectorAll('[data-qchoice]').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); selectedQuizAnswer=Number(btn.dataset.qchoice); document.getElementById('quizNext').disabled=false; });
  document.getElementById('quizNext').onclick=()=>{ const fb=document.getElementById('quizFeedback'); const correct=selectedQuizAnswer===q.correct; if(correct) quizScore++; fb.className=`answer-feedback show ${correct?'correct':'wrong'}`; fb.textContent=correct?'✅ Correto!':'❌ Resposta errada.'; document.getElementById('quizNext').disabled=true; setTimeout(()=>{quizIndex++;selectedQuizAnswer=null;renderQuizQuestion();},450); };
}
function finishQuiz() {
  const q=profileData().quiz[currentLanguage]||{best:0,attempts:0};
  q.best=Math.max(q.best,quizScore); q.attempts+=1; profileData().quiz[currentLanguage]=q; profileData().xp+=quizScore*5; saveState(); updateHeader(); checkAchievements();
  document.getElementById('quizView').innerHTML=`<div class="card" style="text-align:center;padding:50px"><div class="eyebrow">${LANGUAGES[currentLanguage].icon} ${LANGUAGES[currentLanguage].name}</div><h2>Quiz concluído!</h2><div class="quiz-score">${quizScore}/10</div><p>Você ganhou <strong>${quizScore*5} XP</strong>.</p><div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:18px"><button class="btn btn-primary" id="retryQuiz">Tentar de novo</button><button class="btn btn-secondary" id="backQuiz">Escolher outra linguagem</button></div></div>`;
  document.getElementById('retryQuiz').onclick=()=>startQuiz(currentLanguage); document.getElementById('backQuiz').onclick=()=>renderQuizHome();
}

function renderProgress() {
  const t=totalProgress(); const d=profileData();
  document.getElementById('progressView').innerHTML=`<div class="page-title"><div><h1>📊 Progresso</h1><p>Acompanhe tudo que ${esc(currentProfile().name)} já estudou.</p></div></div><div class="grid grid-3" style="margin-bottom:18px"><div class="card stat"><div><span>Progresso</span><strong>${t.percent}%</strong></div>📈</div><div class="card stat"><div><span>XP</span><strong>${d.xp}</strong></div>⭐</div><div class="card stat"><div><span>Aulas</span><strong>${t.done}</strong></div>✅</div></div><div class="grid grid-2"><div class="card"><h3>Por linguagem</h3><div class="topic-list" style="margin-top:12px">${Object.entries(LANGUAGES).map(([k,l])=>{const s=getLanguageStats(k);return `<div class="topic-item"><div class="topic-left"><div class="topic-number">${l.icon}</div><div><strong>${l.name}</strong><small>${s.done}/${s.total} conceitos</small></div></div><div style="min-width:120px"><div class="progress-bar"><div class="progress-fill" style="width:${s.percent}%"></div></div><div class="small-label" style="display:block;text-align:right;margin-top:6px">${s.percent}%</div></div></div>`}).join('')}</div></div><div class="card"><h3>🏆 Conquistas</h3><div class="topic-list" style="margin-top:12px">${renderAchievements()}</div></div></div>`;
}
function renderAchievements() {
  const all=[['first-lesson','Primeiro passo','Conclua sua primeira aula'],['ten-lessons','Ritmo forte','Conclua 10 aulas'],['first-quiz','Primeiro quiz','Faça seu primeiro quiz'],['perfect-quiz','Perfeito!','Acerte 10/10 em um quiz'],['five-hundred-xp','500 XP','Chegue a 500 XP']];
  return all.map(([id,name,desc])=>{const ok=profileData().achievements.includes(id);return `<div class="topic-item"><div class="topic-left"><div class="topic-number">${ok?'🏆':'🔒'}</div><div><strong>${name}</strong><small>${desc}</small></div></div><span class="small-label">${ok?'Conquistado':'Bloqueado'}</span></div>`}).join('');
}
function checkAchievements() {
  const d=profileData(); const lessons=Object.keys(d.lessons).length;
  const add=(id,cond)=>{if(cond&&!d.achievements.includes(id)){d.achievements.push(id);toast(`🏆 Conquista desbloqueada: ${id}`);}};
  add('first-lesson',lessons>=1); add('ten-lessons',lessons>=10); add('first-quiz',Object.values(d.quiz).some(x=>x.attempts>0)); add('perfect-quiz',Object.values(d.quiz).some(x=>x.best>=10)); add('five-hundred-xp',d.xp>=500); saveState();
}

function showModal(html) {
  const modal=document.getElementById('modal'); document.getElementById('modalContent').innerHTML=html; modal.classList.remove('hidden'); modal.setAttribute('aria-hidden','false');
}
function hideModal() { const modal=document.getElementById('modal'); modal.classList.add('hidden'); modal.setAttribute('aria-hidden','true'); }

function initSearch() {
  const bar=document.getElementById('searchBar'); const input=document.getElementById('searchInput');
  document.getElementById('searchFocus').onclick=()=>{bar.classList.toggle('hidden');if(!bar.classList.contains('hidden')) input.focus();};
  document.getElementById('searchClose').onclick=()=>bar.classList.add('hidden');
  input.oninput=()=>{
    const q=normalize(input.value); const results=[];
    if(q){Object.entries(LANGUAGES).forEach(([k,l])=>l.topics.forEach(([t,d],i)=>{if(normalize(`${l.name} ${t} ${d}`).includes(q)) results.push({k,i,t,d,l})}));}
    document.getElementById('searchResults').innerHTML=results.slice(0,12).map(r=>`<div class="search-item" data-search="${r.k}:${r.i}"><strong>${r.l.icon} ${esc(r.l.name)} — ${esc(r.t)}</strong><small>${esc(r.d)}</small></div>`).join('') || (q?'<div class="empty">Nada encontrado.</div>':'');
    document.querySelectorAll('[data-search]').forEach(el=>el.onclick=()=>{const [k,i]=el.dataset.search.split(':');bar.classList.add('hidden');input.value='';showModal('');openTopic(k,Number(i));});
  };
}

function initNav() {
  document.querySelectorAll('.nav-btn[data-view]').forEach(btn=>btn.onclick=()=>switchView(btn.dataset.view));
  document.getElementById('changeProfile').onclick=()=>{document.getElementById('mainShell').classList.add('hidden');document.getElementById('profileScreen').classList.remove('hidden');document.getElementById('profileScreen').classList.add('active');renderProfiles();};
  document.getElementById('themeToggle').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';document.body.classList.toggle('light',state.theme==='light');saveState();toast(state.theme==='light'?'☀️ Modo claro':'🌙 Modo escuro');};
  document.getElementById('mobileMenu').onclick=()=>document.getElementById('sidebar').classList.add('open');
  document.getElementById('mobileClose').onclick=closeSidebar;
}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');}

function bindGlobal() {
  document.getElementById('modalClose').onclick=hideModal;
  document.querySelector('#modal .modal-backdrop').onclick=hideModal;
  document.addEventListener('keydown',e=>{if(e.key==='Escape') hideModal();});
  document.addEventListener('click',e=>{const choice=e.target.closest('[data-choice]');if(choice){document.querySelectorAll(`[data-choice="${choice.dataset.choice}"]`).forEach(b=>b.classList.remove('selected'));choice.classList.add('selected');}});
}

function boot() {
  document.body.classList.toggle('light',state.theme==='light');
  renderProfiles();
  initNav(); initSearch(); bindGlobal();
  if(state.currentProfile && PROFILES[state.currentProfile]) {
    document.getElementById('profileScreen').classList.add('hidden');
    document.getElementById('profileScreen').classList.remove('active');
    document.getElementById('mainShell').classList.remove('hidden');
    renderCurrentView();
  }
}

boot();
