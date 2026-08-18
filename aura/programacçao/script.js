/* =========================================================
   CODESTUDY
   SCRIPT.JS
========================================================= */


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const LEVEL_SIZES = {
    1: 10,
    2: 20,
    3: 50
};

const LEVEL_NAMES = {
    1: "Nível 1 — Fundamentos",
    2: "Nível 2 — Intermediário",
    3: "Nível 3 — Avançado"
};

const LEVEL_DESCRIPTIONS = {
    1: "Aprenda os conceitos essenciais desde o começo.",
    2: "Aprofunde seus conhecimentos e pratique mais.",
    3: "Desafios avançados e conceitos mais profundos."
};


/* =========================================================
   LINGUAGENS
========================================================= */

const LANGUAGE_INFO = {

    html: {
        name: "HTML",
        icon: "🌐",
        description:
            "Estrutura e conteúdo de páginas web."
    },

    css: {
        name: "CSS",
        icon: "🎨",
        description:
            "Estilo, aparência, layout e responsividade."
    },

    javascript: {
        name: "JavaScript",
        icon: "⚡",
        description:
            "Lógica, interação e programação para a web."
    },

    python: {
        name: "Python",
        icon: "🐍",
        description:
            "Uma linguagem versátil e fácil de aprender."
    },

    cpp: {
        name: "C++",
        icon: "⚙️",
        description:
            "Programação, lógica e alto desempenho."
    }

};


/* =========================================================
   PERFIS
========================================================= */

const STUDENT_INFO = {

    luiz: {
        name: "Luiz",
        level: "Programador",
        avatar: "L"
    },

    nairelis: {
        name: "Nairelis",
        level: "Aprendendo do zero",
        avatar: "N"
    },

    julya: {
        name: "Julya",
        level: "Começando a programar",
        avatar: "J"
    }

};


/* =========================================================
   ESTADO DOS PERFIS
   Cada pessoa possui seu próprio progresso.
========================================================= */

const DEFAULT_PROFILE = {

    completedQuestions: {},
    completedLevels: {},

    exerciseCompleted: [],

    bestQuiz: 0,

    totalXP: 0,

    quizHistory: [],

    achievements: {}

};


const DEFAULT_APP_STATE = {

    currentStudent: null,

    theme: "dark",

    profiles: {

        luiz: null,
        nairelis: null,
        julya: null

    }

};


let appState = loadAppState();


function createEmptyProfile() {

    return JSON.parse(
        JSON.stringify(
            DEFAULT_PROFILE
        )
    );

}


function loadAppState() {

    try {

        const saved =
            localStorage.getItem(
                "codestudy_app"
            );


        if (!saved) {

            const newState =
                JSON.parse(
                    JSON.stringify(
                        DEFAULT_APP_STATE
                    )
                );


            newState.profiles.luiz =
                createEmptyProfile();

            newState.profiles.nairelis =
                createEmptyProfile();

            newState.profiles.julya =
                createEmptyProfile();


            return newState;

        }


        const parsed =
            JSON.parse(saved);


        const state = {

            ...JSON.parse(
                JSON.stringify(
                    DEFAULT_APP_STATE
                )
            ),

            ...parsed

        };


        for (
            const account
            of ["luiz", "nairelis", "julya"]
        ) {

            if (
                !state.profiles[account]
            ) {

                state.profiles[account] =
                    createEmptyProfile();

            }

        }


        /*
            Migração de versões antigas.
            Caso você tenha usado uma versão anterior
            do site, ela não quebra o novo sistema.
        */

        if (
            state.completedQuestions
        ) {

            state.profiles.luiz.completedQuestions =
                state.completedQuestions;

        }


        if (
            state.completedLevels
        ) {

            state.profiles.luiz.completedLevels =
                state.completedLevels;

        }


        if (
            state.totalXP
        ) {

            state.profiles.luiz.totalXP =
                state.totalXP;

        }


        return state;

    } catch (error) {

        console.error(
            "Erro ao carregar dados:",
            error
        );


        const newState =
            JSON.parse(
                JSON.stringify(
                    DEFAULT_APP_STATE
                )
            );


        newState.profiles.luiz =
            createEmptyProfile();

        newState.profiles.nairelis =
            createEmptyProfile();

        newState.profiles.julya =
            createEmptyProfile();


        return newState;

    }

}


function saveAppState() {

    localStorage.setItem(
        "codestudy_app",
        JSON.stringify(
            appState
        )
    );

}


function getCurrentProfile() {

    if (
        !appState.currentStudent
    ) {

        return null;

    }


    return appState.profiles[
        appState.currentStudent
    ];

}


/* =========================================================
   BANCO DE QUESTÕES — HTML
========================================================= */

const HTML_LEVEL_1 = [

    {
        title: "O que é HTML?",
        concept: "HTML",
        question:
            "Para que o HTML é usado?",
        acceptedAnswers: [
            "criar a estrutura e o conteúdo de uma página",
            "criar estrutura de página",
            "estruturar páginas web",
            "estrutura de páginas web",
            "criar páginas web",
            "estrutura e conteúdo de uma página"
        ]
    },

    {
        title: "Título principal",
        concept: "<h1>",
        question:
            "Qual tag cria um título principal?",
        acceptedAnswers: [
            "<h1>",
            "h1",
            "<h1></h1>",
            "<h1>titulo</h1>",
            "<h1>meu titulo</h1>",
            "<h1>meu primeiro site</h1>"
        ]
    },

    {
        title: "Parágrafo",
        concept: "<p>",
        question:
            "Qual tag cria um parágrafo?",
        acceptedAnswers: [
            "<p>",
            "p",
            "<p></p>",
            "<p>texto</p>",
            "<p>ola mundo</p>"
        ]
    },

    {
        title: "Link",
        concept: "<a>",
        question:
            "Qual tag normalmente cria um link?",
        acceptedAnswers: [
            "<a>",
            "a",
            "<a></a>",
            "<a href=\"#\">link</a>"
        ]
    },

    {
        title: "Imagem",
        concept: "<img>",
        question:
            "Qual tag coloca uma imagem?",
        acceptedAnswers: [
            "<img>",
            "img",
            "<img />",
            "<img src=\"foto.jpg\">",
            "<img src=\"imagem.jpg\" alt=\"imagem\">"
        ]
    },

    {
        title: "Botão",
        concept: "<button>",
        question:
            "Qual tag cria um botão?",
        acceptedAnswers: [
            "<button>",
            "button",
            "<button></button>",
            "<button>clique aqui</button>"
        ]
    },

    {
        title: "Lista",
        concept: "<ul>",
        question:
            "Qual tag cria uma lista não ordenada?",
        acceptedAnswers: [
            "<ul>",
            "ul",
            "<ul></ul>"
        ]
    },

    {
        title: "Item da lista",
        concept: "<li>",
        question:
            "Qual tag representa um item de lista?",
        acceptedAnswers: [
            "<li>",
            "li",
            "<li></li>",
            "<li>item</li>"
        ]
    },

    {
        title: "Quebra de linha",
        concept: "<br>",
        question:
            "Qual tag cria uma quebra de linha?",
        acceptedAnswers: [
            "<br>",
            "br",
            "<br/>",
            "<br />"
        ]
    },

    {
        title: "Conteúdo da página",
        concept: "<body>",
        question:
            "Qual elemento contém normalmente o conteúdo visível da página?",
        acceptedAnswers: [
            "<body>",
            "body",
            "<body></body>"
        ]
    }

];


const HTML_LEVEL_2 = [

    {
        title: "Div",
        concept: "<div>",
        question:
            "Qual elemento é usado frequentemente para agrupar conteúdo?",
        acceptedAnswers: [
            "<div>",
            "div",
            "<div></div>"
        ]
    },

    {
        title: "Span",
        concept: "<span>",
        question:
            "Qual elemento pode agrupar pequenos trechos de conteúdo em linha?",
        acceptedAnswers: [
            "<span>",
            "span",
            "<span></span>"
        ]
    },

    {
        title: "Lista ordenada",
        concept: "<ol>",
        question:
            "Qual tag cria uma lista ordenada?",
        acceptedAnswers: [
            "<ol>",
            "ol",
            "<ol></ol>"
        ]
    },

    {
        title: "Input",
        concept: "<input>",
        question:
            "Qual elemento cria um campo de entrada?",
        acceptedAnswers: [
            "<input>",
            "input",
            "<input />",
            "<input type=\"text\">"
        ]
    },

    {
        title: "Label",
        concept: "<label>",
        question:
            "Qual elemento é usado para identificar um controle de formulário?",
        acceptedAnswers: [
            "<label>",
            "label",
            "<label></label>"
        ]
    },

    {
        title: "ID",
        concept: "id",
        question:
            "Qual atributo identifica normalmente um elemento de forma única?",
        acceptedAnswers: [
            "id",
            "atributo id",
            "o id"
        ]
    },

    {
        title: "Classe",
        concept: "class",
        question:
            "Qual atributo é usado para agrupar elementos para estilos?",
        acceptedAnswers: [
            "class",
            "atributo class",
            "classe"
        ]
    },

    {
        title: "Form",
        concept: "<form>",
        question:
            "Qual elemento representa um formulário?",
        acceptedAnswers: [
            "<form>",
            "form",
            "<form></form>"
        ]
    },

    {
        title: "Select",
        concept: "<select>",
        question:
            "Qual elemento cria uma lista de opções?",
        acceptedAnswers: [
            "<select>",
            "select",
            "<select></select>"
        ]
    },

    {
        title: "Tabela",
        concept: "<table>",
        question:
            "Qual elemento representa uma tabela?",
        acceptedAnswers: [
            "<table>",
            "table",
            "<table></table>"
        ]
    },

    {
        title: "Linha de tabela",
        concept: "<tr>",
        question:
            "Qual elemento representa uma linha de tabela?",
        acceptedAnswers: [
            "<tr>",
            "tr",
            "<tr></tr>"
        ]
    },

    {
        title: "Célula",
        concept: "<td>",
        question:
            "Qual elemento representa uma célula comum?",
        acceptedAnswers: [
            "<td>",
            "td",
            "<td></td>"
        ]
    },

    {
        title: "Cabeçalho de tabela",
        concept: "<th>",
        question:
            "Qual elemento representa uma célula de cabeçalho?",
        acceptedAnswers: [
            "<th>",
            "th",
            "<th></th>"
        ]
    },

    {
        title: "Header",
        concept: "<header>",
        question:
            "Qual elemento representa uma área de cabeçalho?",
        acceptedAnswers: [
            "<header>",
            "header",
            "<header></header>"
        ]
    },

    {
        title: "Main",
        concept: "<main>",
        question:
            "Qual elemento representa o conteúdo principal?",
        acceptedAnswers: [
            "<main>",
            "main",
            "<main></main>"
        ]
    },

    {
        title: "Footer",
        concept: "<footer>",
        question:
            "Qual elemento representa o rodapé?",
        acceptedAnswers: [
            "<footer>",
            "footer",
            "<footer></footer>"
        ]
    },

    {
        title: "Navegação",
        concept: "<nav>",
        question:
            "Qual elemento representa uma área de navegação?",
        acceptedAnswers: [
            "<nav>",
            "nav",
            "<nav></nav>"
        ]
    },

    {
        title: "Article",
        concept: "<article>",
        question:
            "Qual elemento representa conteúdo independente?",
        acceptedAnswers: [
            "<article>",
            "article",
            "<article></article>"
        ]
    },

    {
        title: "Section",
        concept: "<section>",
        question:
            "Qual elemento representa uma seção temática?",
        acceptedAnswers: [
            "<section>",
            "section",
            "<section></section>"
        ]
    },

    {
        title: "Strong",
        concept: "<strong>",
        question:
            "Qual elemento indica maior importância ao conteúdo?",
        acceptedAnswers: [
            "<strong>",
            "strong",
            "<strong></strong>",
            "<strong>texto</strong>"
        ]
    }

];


const HTML_LEVEL_3_TOPICS = [
    "DOCTYPE",
    "UTF-8",
    "viewport",
    "lang",
    "alt",
    "meta description",
    "meta robots",
    "SEO",
    "acessibilidade",
    "ARIA",
    "role",
    "fieldset",
    "legend",
    "textarea",
    "required",
    "disabled",
    "readonly",
    "autocomplete",
    "pattern",
    "placeholder",
    "min",
    "max",
    "step",
    "form action",
    "form method",
    "target",
    "download",
    "rel",
    "noopener",
    "noreferrer",
    "canonical",
    "aside",
    "figure",
    "figcaption",
    "details",
    "summary",
    "dialog",
    "progress",
    "meter",
    "template",
    "picture",
    "source",
    "srcset",
    "loading",
    "defer",
    "async",
    "pre"
];


/* =========================================================
   BANCO DE QUESTÕES — CSS
========================================================= */

const CSS_LEVEL_1 = [

    {
        title: "CSS",
        concept: "CSS",
        question:
            "Qual é a função principal do CSS?",
        acceptedAnswers: [
            "estilizar a aparência dos elementos",
            "estilizar páginas",
            "dar estilo para a página",
            "mudar a aparência da página"
        ]
    },

    {
        title: "Color",
        concept: "color",
        question:
            "Qual propriedade altera a cor do texto?",
        acceptedAnswers: [
            "color"
        ]
    },

    {
        title: "Fundo",
        concept: "background-color",
        question:
            "Qual propriedade altera a cor de fundo?",
        acceptedAnswers: [
            "background-color",
            "background color"
        ]
    },

    {
        title: "Tamanho",
        concept: "font-size",
        question:
            "Qual propriedade altera o tamanho do texto?",
        acceptedAnswers: [
            "font-size",
            "font size"
        ]
    },

    {
        title: "Margin",
        concept: "margin",
        question:
            "Qual propriedade cria espaço externo?",
        acceptedAnswers: [
            "margin"
        ]
    },

    {
        title: "Padding",
        concept: "padding",
        question:
            "Qual propriedade cria espaço interno?",
        acceptedAnswers: [
            "padding"
        ]
    },

    {
        title: "Borda",
        concept: "border",
        question:
            "Qual propriedade controla a borda?",
        acceptedAnswers: [
            "border"
        ]
    },

    {
        title: "Largura",
        concept: "width",
        question:
            "Qual propriedade controla a largura?",
        acceptedAnswers: [
            "width"
        ]
    },

    {
        title: "Altura",
        concept: "height",
        question:
            "Qual propriedade controla a altura?",
        acceptedAnswers: [
            "height"
        ]
    },

    {
        title: "Alinhamento",
        concept: "text-align",
        question:
            "Qual propriedade pode centralizar o texto?",
        acceptedAnswers: [
            "text-align",
            "text align",
            "text-align: center"
        ]
    }

];


const CSS_LEVEL_2 = [

    {
        title: "Flexbox",
        concept: "display: flex",
        question:
            "Como ativar o Flexbox?",
        acceptedAnswers: [
            "display: flex",
            "display:flex",
            "display flex"
        ]
    },

    {
        title: "Justify Content",
        concept: "justify-content",
        question:
            "Qual propriedade trabalha a distribuição no eixo principal do flex?",
        acceptedAnswers: [
            "justify-content",
            "justify content"
        ]
    },

    {
        title: "Align Items",
        concept: "align-items",
        question:
            "Qual propriedade trabalha o alinhamento no eixo transversal?",
        acceptedAnswers: [
            "align-items",
            "align items"
        ]
    },

    {
        title: "Grid",
        concept: "display: grid",
        question:
            "Como ativar CSS Grid?",
        acceptedAnswers: [
            "display: grid",
            "display:grid",
            "display grid"
        ]
    },

    {
        title: "Position",
        concept: "position",
        question:
            "Qual propriedade controla o posicionamento?",
        acceptedAnswers: [
            "position"
        ]
    },

    {
        title: "Border Radius",
        concept: "border-radius",
        question:
            "Qual propriedade arredonda os cantos?",
        acceptedAnswers: [
            "border-radius",
            "border radius"
        ]
    },

    {
        title: "Transition",
        concept: "transition",
        question:
            "Qual propriedade cria transições suaves?",
        acceptedAnswers: [
            "transition"
        ]
    },

    {
        title: "Box Shadow",
        concept: "box-shadow",
        question:
            "Qual propriedade cria uma sombra?",
        acceptedAnswers: [
            "box-shadow",
            "box shadow"
        ]
    },

    {
        title: "Flex Direction",
        concept: "flex-direction",
        question:
            "Qual propriedade define a direção do flex?",
        acceptedAnswers: [
            "flex-direction",
            "flex direction"
        ]
    },

    {
        title: "Gap",
        concept: "gap",
        question:
            "Qual propriedade cria espaço entre itens?",
        acceptedAnswers: [
            "gap"
        ]
    },

    {
        title: "REM",
        concept: "rem",
        question:
            "Qual unidade é relativa ao tamanho da fonte do elemento raiz?",
        acceptedAnswers: [
            "rem"
        ]
    },

    {
        title: "VH",
        concept: "vh",
        question:
            "Qual unidade representa uma parte da altura da viewport?",
        acceptedAnswers: [
            "vh"
        ]
    },

    {
        title: "VW",
        concept: "vw",
        question:
            "Qual unidade representa uma parte da largura da viewport?",
        acceptedAnswers: [
            "vw"
        ]
    },

    {
        title: "Media Query",
        concept: "@media",
        question:
            "Qual recurso é usado para criar estilos responsivos?",
        acceptedAnswers: [
            "@media",
            "media query",
            "media"
        ]
    },

    {
        title: "Opacity",
        concept: "opacity",
        question:
            "Qual propriedade controla a opacidade?",
        acceptedAnswers: [
            "opacity"
        ]
    },

    {
        title: "Overflow",
        concept: "overflow",
        question:
            "Qual propriedade controla conteúdo que ultrapassa o elemento?",
        acceptedAnswers: [
            "overflow"
        ]
    },

    {
        title: "Cursor",
        concept: "cursor",
        question:
            "Qual propriedade muda o cursor?",
        acceptedAnswers: [
            "cursor"
        ]
    },

    {
        title: "Font Family",
        concept: "font-family",
        question:
            "Qual propriedade define a família da fonte?",
        acceptedAnswers: [
            "font-family",
            "font family"
        ]
    },

    {
        title: "Font Weight",
        concept: "font-weight",
        question:
            "Qual propriedade controla o peso da fonte?",
        acceptedAnswers: [
            "font-weight",
            "font weight"
        ]
    },

    {
        title: "Text Decoration",
        concept: "text-decoration",
        question:
            "Qual propriedade controla a decoração do texto?",
        acceptedAnswers: [
            "text-decoration",
            "text decoration"
        ]
    }

];


const CSS_LEVEL_3_TOPICS = [
    "seletores",
    "seletor de classe",
    "seletor de ID",
    "seletor de atributo",
    "pseudo-classe",
    "pseudo-elemento",
    "nth-child",
    ":not",
    ":is",
    ":where",
    "especificidade",
    "herança",
    "inherit",
    "initial",
    "unset",
    "revert",
    "!important",
    "custom property",
    "variáveis CSS",
    "var()",
    "calc()",
    "minmax()",
    "clamp()",
    "aspect-ratio",
    "object-fit",
    "object-position",
    "position sticky",
    "position fixed",
    "position absolute",
    "z-index",
    "grid-area",
    "grid-column",
    "grid-row",
    "align-content",
    "align-self",
    "justify-self",
    "place-items",
    "place-content",
    "flex-wrap",
    "flex-grow",
    "flex-shrink",
    "flex-basis",
    "order",
    "transform",
    "animation",
    "@keyframes",
    "filter",
    "backdrop-filter",
    "linear-gradient",
    "radial-gradient",
    "media features"
];


/* =========================================================
   BANCO DE QUESTÕES — JAVASCRIPT
========================================================= */

const JS_LEVEL_1 = [

    {
        title: "JavaScript",
        concept: "JavaScript",
        question:
            "Para que JavaScript é usado na web?",
        acceptedAnswers: [
            "adicionar lógica e interatividade",
            "criar interatividade",
            "adicionar interatividade",
            "programar a página"
        ]
    },

    {
        title: "Let",
        concept: "let",
        question:
            "Qual palavra-chave cria uma variável que pode receber outro valor?",
        acceptedAnswers: [
            "let"
        ]
    },

    {
        title: "Const",
        concept: "const",
        question:
            "Qual palavra-chave cria uma variável que não pode ser reatribuída?",
        acceptedAnswers: [
            "const"
        ]
    },

    {
        title: "Console",
        concept: "console.log",
        question:
            "Qual comando mostra algo no console?",
        acceptedAnswers: [
            "console.log",
            "console.log()"
        ]
    },

    {
        title: "If",
        concept: "if",
        question:
            "Qual estrutura verifica uma condição?",
        acceptedAnswers: [
            "if"
        ]
    },

    {
        title: "Else",
        concept: "else",
        question:
            "Qual palavra representa o caminho alternativo do if?",
        acceptedAnswers: [
            "else"
        ]
    },

    {
        title: "Módulo",
        concept: "%",
        question:
            "Qual operador retorna o resto da divisão?",
        acceptedAnswers: [
            "%",
            "mod",
            "operador %"
        ]
    },

    {
        title: "Função",
        concept: "function",
        question:
            "Qual palavra-chave pode declarar uma função?",
        acceptedAnswers: [
            "function"
        ]
    },

    {
        title: "Array",
        concept: "array",
        question:
            "Qual estrutura pode armazenar vários valores?",
        acceptedAnswers: [
            "array",
            "vetor",
            "lista"
        ]
    },

    {
        title: "Comentário",
        concept: "//",
        question:
            "Qual símbolo inicia um comentário de uma linha?",
        acceptedAnswers: [
            "//"
        ]
    }

];


const JS_LEVEL_2 = [

    {
        title: "Arrow Function",
        concept: "() => {}",
        question:
            "Qual sintaxe representa uma arrow function?",
        acceptedAnswers: [
            "() => {}",
            "()=>{}",
            "arrow function"
        ]
    },

    {
        title: "Map",
        concept: "map",
        question:
            "Qual método cria um novo array transformando seus elementos?",
        acceptedAnswers: [
            "map",
            "map()"
        ]
    },

    {
        title: "Filter",
        concept: "filter",
        question:
            "Qual método retorna elementos que passam por uma condição?",
        acceptedAnswers: [
            "filter",
            "filter()"
        ]
    },

    {
        title: "DOM",
        concept: "DOM",
        question:
            "O que JavaScript manipula para alterar a página?",
        acceptedAnswers: [
            "dom",
            "document object model"
        ]
    },

    {
        title: "Query Selector",
        concept: "querySelector",
        question:
            "Qual método encontra o primeiro elemento por seletor?",
        acceptedAnswers: [
            "querySelector",
            "querySelector()"
        ]
    },

    {
        title: "Evento",
        concept: "addEventListener",
        question:
            "Qual método registra um evento?",
        acceptedAnswers: [
            "addEventListener",
            "addEventListener()"
        ]
    },

    {
        title: "LocalStorage",
        concept: "localStorage",
        question:
            "Onde podemos guardar pequenos dados no navegador?",
        acceptedAnswers: [
            "localStorage",
            "local storage"
        ]
    },

    {
        title: "JSON",
        concept: "JSON.stringify",
        question:
            "Qual método transforma um objeto em JSON?",
        acceptedAnswers: [
            "json.stringify",
            "JSON.stringify"
        ]
    },

    {
        title: "Destructuring",
        concept: "destructuring",
        question:
            "Como se chama extrair valores de objetos ou arrays?",
        acceptedAnswers: [
            "destructuring",
            "desestruturação"
        ]
    },

    {
        title: "Template Literal",
        concept: "crase",
        question:
            "Qual símbolo delimita template literals?",
        acceptedAnswers: [
            "`",
            "crase",
            "acento grave"
        ]
    },

    {
        title: "Switch",
        concept: "switch",
        question:
            "Qual estrutura compara uma expressão com vários casos?",
        acceptedAnswers: [
            "switch"
        ]
    },

    {
        title: "For",
        concept: "for",
        question:
            "Qual estrutura é usada para repetição com contador?",
        acceptedAnswers: [
            "for"
        ]
    },

    {
        title: "While",
        concept: "while",
        question:
            "Qual estrutura repete enquanto uma condição for verdadeira?",
        acceptedAnswers: [
            "while"
        ]
    },

    {
        title: "Objeto",
        concept: "object",
        question:
            "Qual estrutura possui propriedades e valores?",
        acceptedAnswers: [
            "object",
            "objeto"
        ]
    },

    {
        title: "typeof",
        concept: "typeof",
        question:
            "Qual operador verifica o tipo de um valor?",
        acceptedAnswers: [
            "typeof"
        ]
    },

    {
        title: "NaN",
        concept: "NaN",
        question:
            "O que significa NaN?",
        acceptedAnswers: [
            "not a number",
            "nan"
        ]
    },

    {
        title: "Boolean",
        concept: "boolean",
        question:
            "Quais são os dois valores booleanos?",
        acceptedAnswers: [
            "true e false",
            "true false",
            "true, false"
        ]
    },

    {
        title: "Return",
        concept: "return",
        question:
            "Qual palavra devolve um valor de uma função?",
        acceptedAnswers: [
            "return"
        ]
    },

    {
        title: "Spread",
        concept: "...",
        question:
            "Qual operador é usado para spread?",
        acceptedAnswers: [
            "...",
            "spread"
        ]
    },

    {
        title: "Optional Chaining",
        concept: "?.",
        question:
            "Qual operador representa optional chaining?",
        acceptedAnswers: [
            "?.",
            "optional chaining"
        ]
    }

];


const JS_LEVEL_3_TOPICS = [
    "escopo",
    "hoisting",
    "closure",
    "callback",
    "Promise",
    "async",
    "await",
    "fetch",
    "try",
    "catch",
    "finally",
    "throw",
    "class",
    "extends",
    "super",
    "getter",
    "setter",
    "static",
    "private fields",
    "reduce",
    "find",
    "some",
    "every",
    "includes",
    "sort",
    "slice",
    "splice",
    "concat",
    "destructuring",
    "rest",
    "spread",
    "nullish coalescing",
    "optional chaining",
    "Set",
    "Map",
    "WeakMap",
    "Date",
    "Math",
    "RegExp",
    "module",
    "export",
    "import",
    "default export",
    "event loop",
    "microtask",
    "macrotask",
    "debounce",
    "throttle",
    "memory",
    "garbage collection"
];


/* =========================================================
   BANCO DE QUESTÕES — PYTHON
========================================================= */

const PYTHON_LEVEL_1 = [

    {
        title: "Python",
        concept: "Python",
        question:
            "Qual característica é conhecida do Python?",
        acceptedAnswers: [
            "sintaxe simples e legível",
            "sintaxe simples",
            "facilidade de leitura",
            "linguagem de sintaxe simples"
        ]
    },

    {
        title: "Variável",
        concept: "nome = valor",
        question:
            "Como criamos normalmente uma variável?",
        acceptedAnswers: [
            "nome = valor",
            "variavel = valor",
            "x = 10"
        ]
    },

    {
        title: "Print",
        concept: "print",
        question:
            "Qual função mostra algo na saída?",
        acceptedAnswers: [
            "print",
            "print()"
        ]
    },

    {
        title: "String",
        concept: "string",
        question:
            "Qual tipo representa texto?",
        acceptedAnswers: [
            "string",
            "str",
            "texto"
        ]
    },

    {
        title: "Inteiro",
        concept: "int",
        question:
            "Qual tipo representa números inteiros?",
        acceptedAnswers: [
            "int",
            "integer",
            "inteiro"
        ]
    },

    {
        title: "If",
        concept: "if",
        question:
            "Qual palavra inicia uma condição?",
        acceptedAnswers: [
            "if"
        ]
    },

    {
        title: "Else",
        concept: "else",
        question:
            "Qual palavra representa o caminho alternativo?",
        acceptedAnswers: [
            "else"
        ]
    },

    {
        title: "For",
        concept: "for",
        question:
            "Qual estrutura pode percorrer uma sequência?",
        acceptedAnswers: [
            "for"
        ]
    },

    {
        title: "Lista",
        concept: "list",
        question:
            "Como representamos uma lista?",
        acceptedAnswers: [
            "[1, 2, 3]",
            "[1,2,3]",
            "lista",
            "list"
        ]
    },

    {
        title: "Comentário",
        concept: "#",
        question:
            "Qual símbolo inicia um comentário de uma linha?",
        acceptedAnswers: [
            "#"
        ]
    }

];


const PYTHON_LEVEL_2 = [

    {
        title: "Função",
        concept: "def",
        question:
            "Qual palavra define uma função?",
        acceptedAnswers: [
            "def"
        ]
    },

    {
        title: "Dicionário",
        concept: "dict",
        question:
            "Qual estrutura representa um dicionário?",
        acceptedAnswers: [
            "dict",
            "dicionario",
            "dicionário",
            "{\"nome\":\"luiz\"}",
            "{'nome':'luiz'}"
        ]
    },

    {
        title: "Tupla",
        concept: "tuple",
        question:
            "Qual estrutura representa normalmente uma tupla?",
        acceptedAnswers: [
            "tuple",
            "(1,2)",
            "(1, 2)"
        ]
    },

    {
        title: "Set",
        concept: "set",
        question:
            "Qual estrutura representa um conjunto?",
        acceptedAnswers: [
            "set",
            "{1,2,3}",
            "{1, 2, 3}"
        ]
    },

    {
        title: "Range",
        concept: "range",
        question:
            "Qual função gera uma sequência de números?",
        acceptedAnswers: [
            "range",
            "range()"
        ]
    },

    {
        title: "Len",
        concept: "len",
        question:
            "Qual função retorna o tamanho de uma coleção?",
        acceptedAnswers: [
            "len",
            "len()"
        ]
    },

    {
        title: "Append",
        concept: "append",
        question:
            "Qual método adiciona um item ao final de uma lista?",
        acceptedAnswers: [
            "append",
            "append()"
        ]
    },

    {
        title: "Import",
        concept: "import",
        question:
            "Qual palavra importa módulos?",
        acceptedAnswers: [
            "import"
        ]
    },

    {
        title: "Try Except",
        concept: "try/except",
        question:
            "Qual estrutura trata exceções?",
        acceptedAnswers: [
            "try except",
            "try/except",
            "try-except"
        ]
    },

    {
        title: "Classe",
        concept: "class",
        question:
            "Qual palavra define uma classe?",
        acceptedAnswers: [
            "class"
        ]
    },

    {
        title: "Self",
        concept: "self",
        question:
            "O que self representa normalmente?",
        acceptedAnswers: [
            "a própria instancia",
            "a própria instância",
            "a instancia atual",
            "a instância atual"
        ]
    },

    {
        title: "List Comprehension",
        concept: "list comprehension",
        question:
            "Como se chama a forma compacta de criar listas?",
        acceptedAnswers: [
            "list comprehension",
            "comprehension",
            "list comprehensions"
        ]
    },

    {
        title: "Lambda",
        concept: "lambda",
        question:
            "Qual recurso cria pequenas funções anônimas?",
        acceptedAnswers: [
            "lambda"
        ]
    },

    {
        title: "In",
        concept: "in",
        question:
            "Qual operador verifica pertencimento?",
        acceptedAnswers: [
            "in"
        ]
    },

    {
        title: "Enumerate",
        concept: "enumerate",
        question:
            "Qual função fornece índice e valor?",
        acceptedAnswers: [
            "enumerate",
            "enumerate()"
        ]
    },

    {
        title: "Zip",
        concept: "zip",
        question:
            "Qual função combina elementos de iteráveis?",
        acceptedAnswers: [
            "zip",
            "zip()"
        ]
    },

    {
        title: "F-string",
        concept: "f-string",
        question:
            "Como se chama esse formato de string interpolada?",
        acceptedAnswers: [
            "f-string",
            "f string",
            "fstring"
        ]
    },

    {
        title: "Módulo",
        concept: "module",
        question:
            "Como se chama um arquivo Python que pode ser reutilizado?",
        acceptedAnswers: [
            "modulo",
            "módulo",
            "module"
        ]
    },

    {
        title: "Mutável",
        concept: "list",
        question:
            "Qual desses tipos é mutável?",
        acceptedAnswers: [
            "list",
            "lista"
        ]
    },

    {
        title: "Booleano",
        concept: "bool",
        question:
            "Quais são os valores booleanos em Python?",
        acceptedAnswers: [
            "true e false",
            "true false",
            "true, false"
        ]
    }

];


const PYTHON_LEVEL_3_TOPICS = [
    "escopo",
    "global",
    "nonlocal",
    "iterator",
    "iter()",
    "next()",
    "generator",
    "yield",
    "decorator",
    "closure",
    "property",
    "staticmethod",
    "classmethod",
    "dataclass",
    "inheritance",
    "super()",
    "__init__",
    "__str__",
    "__repr__",
    "context manager",
    "with",
    "arquivos",
    "open()",
    "read()",
    "write()",
    "json",
    "os",
    "pathlib",
    "datetime",
    "random",
    "math",
    "statistics",
    "typing",
    "generic",
    "raise",
    "assert",
    "unittest",
    "packages",
    "pip",
    "venv",
    "recursion",
    "sorting",
    "lambda",
    "map",
    "filter",
    "reduce",
    "generator expression",
    "dict comprehension",
    "set comprehension"
];


/* =========================================================
   BANCO DE QUESTÕES — C++
========================================================= */

const CPP_LEVEL_1 = [

    {
        title: "C++",
        concept: "C++",
        question:
            "Qual é uma característica do C++?",
        acceptedAnswers: [
            "linguagem compilada",
            "linguagem compilada de propósito geral",
            "linguagem de propósito geral"
        ]
    },

    {
        title: "Main",
        concept: "main",
        question:
            "Qual função é normalmente o ponto de entrada?",
        acceptedAnswers: [
            "main",
            "main()"
        ]
    },

    {
        title: "Cout",
        concept: "cout",
        question:
            "Qual objeto é usado para saída no console?",
        acceptedAnswers: [
            "cout",
            "std::cout"
        ]
    },

    {
        title: "Cin",
        concept: "cin",
        question:
            "Qual objeto é usado para entrada?",
        acceptedAnswers: [
            "cin",
            "std::cin"
        ]
    },

    {
        title: "Int",
        concept: "int",
        question:
            "Qual tipo representa números inteiros?",
        acceptedAnswers: [
            "int",
            "inteiro"
        ]
    },

    {
        title: "Double",
        concept: "double",
        question:
            "Qual tipo representa números com casas decimais?",
        acceptedAnswers: [
            "double"
        ]
    },

    {
        title: "Bool",
        concept: "bool",
        question:
            "Qual tipo representa verdadeiro ou falso?",
        acceptedAnswers: [
            "bool",
            "booleano",
            "boolean"
        ]
    },

    {
        title: "String",
        concept: "string",
        question:
            "Qual tipo representa texto?",
        acceptedAnswers: [
            "string",
            "std::string"
        ]
    },

    {
        title: "If",
        concept: "if",
        question:
            "Qual estrutura testa uma condição?",
        acceptedAnswers: [
            "if"
        ]
    },

    {
        title: "Comentário",
        concept: "//",
        question:
            "Qual sequência inicia um comentário de uma linha?",
        acceptedAnswers: [
            "//"
        ]
    }

];


const CPP_LEVEL_2 = [

    {
        title: "For",
        concept: "for",
        question:
            "Qual estrutura é usada para um loop com inicialização, condição e atualização?",
        acceptedAnswers: [
            "for"
        ]
    },

    {
        title: "While",
        concept: "while",
        question:
            "Qual estrutura repete enquanto uma condição for verdadeira?",
        acceptedAnswers: [
            "while"
        ]
    },

    {
        title: "Vector",
        concept: "vector",
        question:
            "Qual container representa uma sequência dinâmica?",
        acceptedAnswers: [
            "vector",
            "std::vector"
        ]
    },

    {
        title: "Referência",
        concept: "&",
        question:
            "Qual símbolo está relacionado a referências?",
        acceptedAnswers: [
            "&",
            "referencia",
            "referência"
        ]
    },

    {
        title: "Ponteiro",
        concept: "*",
        question:
            "Qual símbolo está associado à declaração de ponteiros?",
        acceptedAnswers: [
            "*",
            "ponteiro",
            "pointer"
        ]
    },

    {
        title: "Struct",
        concept: "struct",
        question:
            "Qual palavra cria um tipo que agrupa dados?",
        acceptedAnswers: [
            "struct"
        ]
    },

    {
        title: "Classe",
        concept: "class",
        question:
            "Qual palavra declara uma classe?",
        acceptedAnswers: [
            "class"
        ]
    },

    {
        title: "Public",
        concept: "public",
        question:
            "Qual palavra indica membros públicos?",
        acceptedAnswers: [
            "public"
        ]
    },

    {
        title: "Private",
        concept: "private",
        question:
            "Qual palavra indica membros privados?",
        acceptedAnswers: [
            "private"
        ]
    },

    {
        title: "Construtor",
        concept: "constructor",
        question:
            "Qual é uma função do construtor?",
        acceptedAnswers: [
            "inicializar objetos",
            "inicializar um objeto",
            "criar e inicializar objetos"
        ]
    },

    {
        title: "Destrutor",
        concept: "destructor",
        question:
            "Qual símbolo aparece no nome de um destrutor?",
        acceptedAnswers: [
            "~",
            "til"
        ]
    },

    {
        title: "Namespace",
        concept: "namespace",
        question:
            "Para que namespace é usado?",
        acceptedAnswers: [
            "organizar nomes",
            "evitar conflitos de nomes",
            "organizar nomes e evitar conflitos"
        ]
    },

    {
        title: "Include",
        concept: "#include",
        question:
            "Qual diretiva inclui cabeçalhos?",
        acceptedAnswers: [
            "#include",
            "include"
        ]
    },

    {
        title: "Const",
        concept: "const",
        question:
            "Qual palavra indica um valor que não deve ser reatribuído?",
        acceptedAnswers: [
            "const"
        ]
    },

    {
        title: "Enum",
        concept: "enum",
        question:
            "Para que enum é usado?",
        acceptedAnswers: [
            "representar constantes nomeadas",
            "criar constantes nomeadas"
        ]
    },

    {
        title: "Try Catch",
        concept: "try/catch",
        question:
            "Qual estrutura pode tratar exceções?",
        acceptedAnswers: [
            "try catch",
            "try/catch"
        ]
    },

    {
        title: "Overloading",
        concept: "overloading",
        question:
            "Como se chama ter funções com mesmo nome e parâmetros diferentes?",
        acceptedAnswers: [
            "overloading",
            "function overloading",
            "sobrecarga"
        ]
    },

    {
        title: "Override",
        concept: "override",
        question:
            "Qual recurso indica sobrescrita de uma função virtual?",
        acceptedAnswers: [
            "override"
        ]
    },

    {
        title: "Herança",
        concept: "inheritance",
        question:
            "Como se chama criar uma classe derivada de outra?",
        acceptedAnswers: [
            "herança",
            "heranca",
            "inheritance"
        ]
    },

    {
        title: "Polimorfismo",
        concept: "polymorphism",
        question:
            "Como se chama permitir comportamentos diferentes através de uma mesma interface?",
        acceptedAnswers: [
            "polimorfismo",
            "polymorphism"
        ]
    }

];


const CPP_LEVEL_3_TOPICS = [
    "stack",
    "heap",
    "ponteiros",
    "referências",
    "const reference",
    "smart pointer",
    "unique_ptr",
    "shared_ptr",
    "weak_ptr",
    "std::move",
    "rvalue",
    "lvalue",
    "move constructor",
    "move assignment",
    "copy constructor",
    "copy assignment",
    "RAII",
    "template",
    "function template",
    "class template",
    "typename",
    "auto",
    "decltype",
    "lambda",
    "capture",
    "range for",
    "optional",
    "variant",
    "tuple",
    "map",
    "unordered_map",
    "set",
    "unordered_set",
    "stack container",
    "queue",
    "priority_queue",
    "algorithm",
    "sort",
    "find",
    "binary_search",
    "iterator",
    "begin",
    "end",
    "constexpr",
    "static",
    "virtual",
    "pure virtual",
    "abstract class",
    "friend",
    "operator overload",
    "memory management"
];


/* =========================================================
   BANCO DE QUESTÕES
========================================================= */

const QUESTION_BANK = {

    html: {
        level1: HTML_LEVEL_1,
        level2: HTML_LEVEL_2,
        level3: []
    },

    css: {
        level1: CSS_LEVEL_1,
        level2: CSS_LEVEL_2,
        level3: []
    },

    javascript: {
        level1: JS_LEVEL_1,
        level2: JS_LEVEL_2,
        level3: []
    },

    python: {
        level1: PYTHON_LEVEL_1,
        level2: PYTHON_LEVEL_2,
        level3: []
    },

    cpp: {
        level1: CPP_LEVEL_1,
        level2: CPP_LEVEL_2,
        level3: []
    }

};


/* =========================================================
   GERAR NÍVEL 3
========================================================= */

const LEVEL3_TOPICS = {

    html: HTML_LEVEL_3_TOPICS,
    css: CSS_LEVEL_3_TOPICS,
    javascript: JS_LEVEL_3_TOPICS,
    python: PYTHON_LEVEL_3_TOPICS,
    cpp: CPP_LEVEL_3_TOPICS

};


function createLevel3Question(
    language,
    topic,
    index
) {

    const info =
        LANGUAGE_INFO[
            language
        ];


    return {

        title:
            `Desafio ${index} — ${topic}`,

        concept:
            topic,

        question:
            `Digite o conceito de ${info.name} relacionado a "${topic}".`,

        acceptedAnswers: [
            topic,
            topic.toLowerCase()
        ]

    };

}


for (
    const language
    of Object.keys(LANGUAGE_INFO)
) {

    QUESTION_BANK[
        language
    ].level3 =
        LEVEL3_TOPICS[
            language
        ].map(
            (topic, index) =>
                createLevel3Question(
                    language,
                    topic,
                    index + 1
                )
        );

}


/*
    Garante exatamente:
    10 / 20 / 50
*/

for (
    const language
    of Object.keys(
        LANGUAGE_INFO
    )
) {

    for (
        const level
        of [1, 2, 3]
    ) {

        const key =
            `level${level}`;

        if (
            QUESTION_BANK[
                language
            ][key].length >
            LEVEL_SIZES[level]
        ) {

            QUESTION_BANK[
                language
            ][key] =
                QUESTION_BANK[
                    language
                ][key].slice(
                    0,
                    LEVEL_SIZES[level]
                );

        }

    }

}


/* =========================================================
   NORMALIZAÇÃO
========================================================= */

function removeAccents(
    value
) {

    return value
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        );

}


function normalizeAnswer(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    let text =
        String(value)
            .toLowerCase()
            .trim();


    text =
        removeAccents(
            text
        );


    /*
        HTML entities
    */

    text =
        text
            .replaceAll(
                "&lt;",
                "<"
            )
            .replaceAll(
                "&gt;",
                ">"
            )
            .replaceAll(
                "&amp;",
                "&"
            )
            .replaceAll(
                "&quot;",
                '"'
            )
            .replaceAll(
                "&#39;",
                "'"
            );


    /*
        Quebras de linha
    */

    text =
        text.replace(
            /[\r\n\t]+/g,
            " "
        );


    /*
        Espaços repetidos
    */

    text =
        text.replace(
            /\s+/g,
            " "
        );


    /*
        Espaços ao redor de símbolos
    */

    text =
        text.replace(
            /\s*=\s*/g,
            "="
        );


    text =
        text.replace(
            /\s*:\s*/g,
            ":"
        );


    /*
        Aspas
    */

    text =
        text.replace(
            /'/g,
            '"'
        );


    /*
        ; no final
    */

    text =
        text.replace(
            /;+$/g,
            ""
        );


    return text.trim();

}


/* =========================================================
   VERIFICAR VÁRIAS RESPOSTAS
========================================================= */

function answersMatch(
    userAnswer,
    acceptedAnswers
) {

    const user =
        normalizeAnswer(
            userAnswer
        );


    if (!user) {

        return false;

    }


    for (
        const accepted
        of acceptedAnswers
    ) {

        const expected =
            normalizeAnswer(
                accepted
            );


        /*
            Igual
        */

        if (
            user === expected
        ) {

            return true;

        }


        /*
            h1 == <h1>
        */

        if (
            user.replace(
                /[<>]/g,
                ""
            ) ===
            expected.replace(
                /[<>]/g,
                ""
            )
        ) {

            return true;

        }


        /*
            Aceita <h1> e <h1></h1>
        */

        const userTag =
            user.match(
                /^<([a-z0-9]+)>$/
            );


        const expectedTag =
            expected.match(
                /^<([a-z0-9]+)><\/\1>$/
            );


        if (
            userTag &&
            expectedTag &&
            userTag[1] ===
                expectedTag[1]
        ) {

            return true;

        }

    }


    return false;

}


/* =========================================================
   EXPLICAÇÕES
========================================================= */

function getStudentExplanation(
    language,
    question
) {

    const info =
        LANGUAGE_INFO[
            language
        ];


    const concept =
        question.concept;


    /*
        JULYA
    */

    if (
        appState.currentStudent ===
        "julya"
    ) {

        return `

            <div class="explanation-mode">

                🧒

                <span>
                    Explicação simples para
                    <strong>Julya</strong>
                </span>

            </div>


            <h3>
                📖 Vamos entender
            </h3>


            <p>
                Imagina que o computador é uma criança
                que precisa que a gente explique tudo
                direitinho.
            </p>


            <p>
                O conceito
                <strong>${concept}</strong>
                é uma pecinha do
                <strong>${info.name}</strong>.
            </p>


            <p>
                É igual montar LEGO:
                cada pecinha faz uma coisa.
                Quando juntamos várias peças,
                conseguimos montar um site ou programa.
            </p>


            <h3>
                💡 Dica
            </h3>


            <p>
                Primeiro tenta descobrir
                o que essa pecinha faz.
                Depois fica muito mais fácil lembrar
                como escrever.
            </p>

        `;

    }


    /*
        NAIRELIS
    */

    if (
        appState.currentStudent ===
        "nairelis"
    ) {

        return `

            <div class="explanation-mode">

                🧑‍🏫

                <span>
                    Explicação detalhada para
                    <strong>Nairelis</strong>
                </span>

            </div>


            <h3>
                📖 Entendendo o conceito
            </h3>


            <p>
                Este conteúdo pertence à linguagem
                <strong>${info.name}</strong>
                e aborda o conceito
                <strong>${concept}</strong>.
            </p>


            <p>
                Para aprender programação desde o zero,
                é importante entender primeiro
                qual problema o recurso resolve.
                Depois disso, a sintaxe fica muito
                mais fácil de memorizar.
            </p>


            <p>
                Durante o exercício, tente identificar
                a função do conceito antes de pensar
                na resposta.
            </p>


            <h3>
                🧠 Como raciocinar
            </h3>


            <p>
                Pergunte:
                "O que esse recurso faz?"
                e "Em que situação eu usaria isso?"
            </p>

        `;

    }


    /*
        LUIZ
    */

    return `

        <div class="explanation-mode">

            👨‍💻

            <span>
                Revisão direta para
                <strong>Luiz</strong>
            </span>

        </div>


        <h3>
            📖 Revisão rápida
        </h3>


        <p>
            A questão trabalha o conceito
            <strong>${concept}</strong>
            em ${info.name}.
        </p>


        <p>
            Como você já possui experiência,
            a explicação é mais direta,
            servindo principalmente como revisão
            antes do desafio.
        </p>

    `;

}


/* =========================================================
   NAVEGAÇÃO
========================================================= */

const pages =
    document.querySelectorAll(
        ".page"
    );


const navButtons =
    document.querySelectorAll(
        ".nav-button"
    );


function showPage(
    pageId
) {

    pages.forEach(
        page =>
            page.classList.remove(
                "active"
            )
    );


    const page =
        document.getElementById(
            pageId
        );


    if (!page) {

        return;

    }


    page.classList.add(
        "active"
    );


    navButtons.forEach(
        button => {

            button.classList.toggle(
                "active",
                button.dataset.page ===
                    pageId
            );

        }
    );


    if (
        pageId ===
        "home"
    ) {

        renderHomeLanguages();

        updateOverallProgress();

    }


    if (
        pageId ===
        "study"
    ) {

        renderStudyLanguages();

    }


    if (
        pageId ===
        "courses"
    ) {

        renderCourseLanguages();

    }


    if (
        pageId ===
        "exercises"
    ) {

        renderExercises();

    }


    if (
        pageId ===
        "progress"
    ) {

        updateProgressPage();

    }


    closeMobileMenu();

}


navButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showPage(
                    button.dataset.page
                );

            }
        );

    }
);


/* =========================================================
   MENU MOBILE
========================================================= */

const sidebar =
    document.getElementById(
        "sidebar"
    );


const mobileMenu =
    document.getElementById(
        "mobileMenu"
    );


mobileMenu?.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


function closeMobileMenu() {

    sidebar?.classList.remove(
        "open"
    );

}


/* =========================================================
   CONTAS
========================================================= */

const accountScreen =
    document.getElementById(
        "accountScreen"
    );


const accountCards =
    document.querySelectorAll(
        ".account-card"
    );


function enterAccount(
    account
) {

    appState.currentStudent =
        account;


    if (
        !appState.profiles[account]
    ) {

        appState.profiles[account] =
            createEmptyProfile();

    }


    saveAppState();


    updateUserUI();


    accountScreen.classList.add(
        "hidden"
    );


    renderEverything();


    showToast(
        `Bem-vindo(a), ${STUDENT_INFO[account].name}!`,
        "👋"
    );

}


accountCards.forEach(
    card => {

        card.addEventListener(
            "click",
            () => {

                enterAccount(
                    card.dataset.account
                );

            }
        );

    }
);


/* =========================================================
   TROCAR CONTA
========================================================= */

const changeAccountButton =
    document.getElementById(
        "changeAccountButton"
    );


changeAccountButton?.addEventListener(
    "click",
    () => {

        accountScreen.classList.remove(
            "hidden"
        );


        closeMobileMenu();

    }
);


/* =========================================================
   USER UI
========================================================= */

function updateUserUI() {

    if (
        !appState.currentStudent
    ) {

        return;

    }


    const student =
        STUDENT_INFO[
            appState.currentStudent
        ];


    const name =
        document.getElementById(
            "currentUserName"
        );


    const level =
        document.getElementById(
            "currentUserLevel"
        );


    const avatar =
        document.getElementById(
            "userAvatar"
        );


    if (name) {

        name.textContent =
            student.name;

    }


    if (level) {

        level.textContent =
            student.level;

    }


    if (avatar) {

        avatar.textContent =
            student.avatar;

    }


    document
        .querySelectorAll(
            ".student-option"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.student ===
                        appState.currentStudent
                );

            }
        );

}


/* =========================================================
   TEMA
========================================================= */

const themeButton =
    document.getElementById(
        "themeButton"
    );


function applyTheme() {

    const icon =
        document.getElementById(
            "themeIcon"
        );


    const text =
        document.getElementById(
            "themeText"
        );


    if (
        appState.theme ===
        "light"
    ) {

        document.body.classList.add(
            "light-theme"
        );


        if (icon) {

            icon.textContent =
                "🌙";

        }


        if (text) {

            text.textContent =
                "Tema escuro";

        }

    } else {

        document.body.classList.remove(
            "light-theme"
        );


        if (icon) {

            icon.textContent =
                "☀️";

        }


        if (text) {

            text.textContent =
                "Tema claro";

        }

    }

}


themeButton?.addEventListener(
    "click",
    () => {

        appState.theme =
            appState.theme ===
                "dark"
                ? "light"
                : "dark";


        saveAppState();

        applyTheme();

    }
);


/* =========================================================
   PROGRESSO
========================================================= */

function getProfile() {

    return getCurrentProfile();

}


function getQuestionKey(
    language,
    level,
    index
) {

    return (
        `${language}-nivel${level}-q${index}`
    );

}


function isQuestionCompleted(
    language,
    level,
    index
) {

    const profile =
        getProfile();


    if (!profile) {

        return false;

    }


    return Boolean(
        profile.completedQuestions[
            getQuestionKey(
                language,
                level,
                index
            )
        ]
    );

}


function getCompletedQuestions(
    language,
    level
) {

    let total = 0;


    for (
        let i = 0;
        i < LEVEL_SIZES[level];
        i++
    ) {

        if (
            isQuestionCompleted(
                language,
                level,
                i
            )
        ) {

            total++;

        }

    }


    return total;

}


function getTotalQuestions() {

    return (
        Object.keys(
            LANGUAGE_INFO
        ).length *
        (
            LEVEL_SIZES[1] +
            LEVEL_SIZES[2] +
            LEVEL_SIZES[3]
        )
    );

}


function getTotalCompletedQuestions() {

    let total = 0;


    for (
        const language
        of Object.keys(
            LANGUAGE_INFO
        )
    ) {

        total +=
            getCompletedQuestions(
                language,
                1
            );

        total +=
            getCompletedQuestions(
                language,
                2
            );

        total +=
            getCompletedQuestions(
                language,
                3
            );

    }


    return total;

}


function calculateOverallProgress() {

    const total =
        getTotalQuestions();


    const completed =
        getTotalCompletedQuestions();


    return Math.round(
        (
            completed /
            total
        ) * 100
    );

}


function calculateLanguageProgress(
    language
) {

    const total =
        LEVEL_SIZES[1] +
        LEVEL_SIZES[2] +
        LEVEL_SIZES[3];


    const completed =
        getCompletedQuestions(
            language,
            1
        ) +
        getCompletedQuestions(
            language,
            2
        ) +
        getCompletedQuestions(
            language,
            3
        );


    return Math.round(
        (
            completed /
            total
        ) * 100
    );

}


/* =========================================================
   DESBLOQUEIO
========================================================= */

function isLevelUnlocked(
    language,
    level
) {

    if (
        level === 1
    ) {

        return true;

    }


    return (
        getCompletedQuestions(
            language,
            level - 1
        ) >=
        LEVEL_SIZES[
            level - 1
        ]
    );

}


/* =========================================================
   CARDS DE LINGUAGEM
========================================================= */

function createLanguageCard(
    language
) {

    const info =
        LANGUAGE_INFO[
            language
        ];


    const progress =
        calculateLanguageProgress(
            language
        );


    return `

        <div
            class="language-card"
            data-language="${language}"
        >

            <div class="language-icon">
                ${info.icon}
            </div>


            <h3>
                ${info.name}
            </h3>


            <p>
                ${info.description}
            </p>


            <div
                class="mini-progress"
            >

                <div
                    style="
                        width:${progress}%
                    "
                ></div>

            </div>


            <small>
                ${progress}% concluído
            </small>

        </div>

    `;

}


function attachLanguageEvents() {

    document
        .querySelectorAll(
            ".language-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openLanguage(
                            card.dataset.language
                        );

                    }
                );

            }
        );

}


function renderHomeLanguages() {

    const container =
        document.getElementById(
            "homeLanguageGrid"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        Object.keys(
            LANGUAGE_INFO
        )
        .map(
            createLanguageCard
        )
        .join("");


    attachLanguageEvents();

}


function renderCourseLanguages() {

    const container =
        document.getElementById(
            "courseLanguageGrid"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        Object.keys(
            LANGUAGE_INFO
        )
        .map(
            createLanguageCard
        )
        .join("");


    attachLanguageEvents();

}


function openLanguage(
    language
) {

    showPage(
        "courses"
    );


    renderLevels(
        language
    );


    document.getElementById(
        "lessonArea"
    ).innerHTML = "";

}


/* =========================================================
   NÍVEIS
========================================================= */

function createLevelCard(
    language,
    level
) {

    const completed =
        getCompletedQuestions(
            language,
            level
        );


    const total =
        LEVEL_SIZES[level];


    const progress =
        Math.round(
            (
                completed /
                total
            ) * 100
        );


    const unlocked =
        isLevelUnlocked(
            language,
            level
        );


    const finished =
        progress >= 100;


    const status =
        finished
            ? "✓ Concluído"
            : unlocked
                ? "Disponível"
                : "🔒 Bloqueado";


    return `

        <div
            class="
                level-card
                level-${
                    level === 1
                        ? "one"
                        : level === 2
                            ? "two"
                            : "three"
                }
                ${
                    unlocked
                        ? ""
                        : "locked"
                }
                ${
                    finished
                        ? "completed"
                        : ""
                }
            "
            data-language="${language}"
            data-level="${level}"
        >

            <div
                class="level-card-header"
            >

                <div
                    class="level-number"
                >
                    ${level}
                </div>


                <span
                    class="
                        level-status
                        ${
                            finished
                                ? "completed"
                                : unlocked
                                    ? "available"
                                    : "locked"
                        }
                    "
                >
                    ${status}
                </span>

            </div>


            <h3>
                ${LEVEL_NAMES[level]}
            </h3>


            <p>
                ${LEVEL_DESCRIPTIONS[level]}
            </p>


            <div
                class="level-question-count"
            >
                ${completed}/${total}
                questões
            </div>


            <div
                class="level-progress-track"
            >

                <div
                    class="level-progress-fill"
                    style="
                        width:${progress}%
                    "
                ></div>

            </div>

        </div>

    `;

}


function renderLevels(
    language
) {

    const container =
        document.getElementById(
            "levelsArea"
        );


    const info =
        LANGUAGE_INFO[
            language
        ];


    container.innerHTML = `

        <div
            class="levels-title"
        >

            <div>

                <h2>
                    ${info.icon}
                    ${info.name}
                </h2>


                <p>
                    Complete um nível para liberar o próximo.
                </p>

            </div>

        </div>


        <div
            class="levels-grid"
        >

            ${[1, 2, 3]
                .map(
                    level =>
                        createLevelCard(
                            language,
                            level
                        )
                )
                .join("")
            }

        </div>

    `;


    document
        .querySelectorAll(
            ".level-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const level =
                            Number(
                                card.dataset.level
                            );


                        if (
                            !isLevelUnlocked(
                                language,
                                level
                            )
                        ) {

                            showToast(
                                "Complete o nível anterior para desbloquear. 🔒",
                                "🔒"
                            );

                            return;

                        }


                        openLevel(
                            language,
                            level
                        );

                    }
                );

            }
        );

}


/* =========================================================
   QUESTÕES
========================================================= */

let currentLanguage = null;

let currentLevel = null;

let currentQuestionIndex = 0;


function openLevel(
    language,
    level
) {

    if (
        !isLevelUnlocked(
            language,
            level
        )
    ) {

        return;

    }


    currentLanguage =
        language;

    currentLevel =
        level;


    const questions =
        QUESTION_BANK[
            language
        ][
            `level${level}`
        ];


    let firstIncomplete =
        questions.findIndex(
            (_, index) =>
                !isQuestionCompleted(
                    language,
                    level,
                    index
                )
        );


    if (
        firstIncomplete === -1
    ) {

        firstIncomplete = 0;

    }


    currentQuestionIndex =
        firstIncomplete;


    renderCurrentQuestion();

}


/* =========================================================
   EXPLICAÇÃO + QUESTÃO
========================================================= */

function renderCurrentQuestion() {

    const container =
        document.getElementById(
            "lessonArea"
        );


    if (
        currentLanguage === null
    ) {

        return;

    }


    const questions =
        QUESTION_BANK[
            currentLanguage
        ][
            `level${currentLevel}`
        ];


    const question =
        questions[
            currentQuestionIndex
        ];


    if (!question) {

        renderFinishedLevel();

        return;

    }


    const info =
        LANGUAGE_INFO[
            currentLanguage
        ];


    const completed =
        isQuestionCompleted(
            currentLanguage,
            currentLevel,
            currentQuestionIndex
        );


    const number =
        currentQuestionIndex + 1;


    container.innerHTML = `

        <div
            class="lesson-card"
        >

            <div
                class="lesson-card-top"
            >

                <div
                    class="lesson-heading"
                >

                    <div
                        class="lesson-number"
                    >
                        ${String(
                            number
                        ).padStart(
                            2,
                            "0"
                        )}
                    </div>


                    <div
                        class="lesson-title-area"
                    >

                        <h2>
                            ${question.title}
                        </h2>


                        <span>
                            ${info.name}
                            •
                            ${LEVEL_NAMES[currentLevel]}
                        </span>

                    </div>

                </div>


                ${
                    completed
                        ? `
                            <span
                                class="lesson-completed"
                            >
                                ✓ Concluída
                            </span>
                        `
                        : ""
                }

            </div>


            <div
                class="lesson-body"
            >

                ${getStudentExplanation(
                    currentLanguage,
                    question
                )}


                <div
                    class="answer-area"
                >

                    <div
                        class="answer-area-header"
                    >

                        <div
                            class="answer-area-icon"
                        >
                            ✍️
                        </div>


                        <div>

                            <h3>
                                Sua resposta
                            </h3>


                            <p>
                                Você pode escrever de
                                qualquer uma das formas
                                aceitas pela questão.
                            </p>

                        </div>

                    </div>


                    <p
                        style="
                            color:var(--text-secondary);
                            font-size:13px;
                            line-height:1.7;
                            margin-bottom:14px;
                        "
                    >
                        ${question.question}
                    </p>


                    <textarea
                        class="answer-input"
                        id="questionAnswer"
                        placeholder="Digite sua resposta..."
                        spellcheck="false"
                    ></textarea>


                    <div
                        class="answer-actions"
                    >

                        <button
                            class="check-answer-button"
                            id="checkAnswerButton"
                        >
                            ✅ Verificar
                        </button>


                        <button
                            class="clear-answer-button"
                            id="clearAnswerButton"
                        >
                            🗑️ Limpar
                        </button>

                    </div>


                    <div
                        class="answer-result"
                        id="answerResult"
                    ></div>

                </div>


                <div
                    class="question-navigation"
                >

                    <span
                        class="question-counter"
                    >
                        Questão
                        ${number}
                        de
                        ${questions.length}
                    </span>


                    <button
                        class="next-question-button"
                        id="nextQuestionButton"
                        style="
                            display:${
                                completed
                                    ? "inline-flex"
                                    : "none"
                            };
                        "
                    >
                        Próxima →
                    </button>

                </div>


                <div
                    class="lesson-footer"
                >

                    <span
                        class="lesson-progress-text"
                    >
                        ${getCompletedQuestions(
                            currentLanguage,
                            currentLevel
                        )}
                        /
                        ${questions.length}
                        concluídas
                    </span>


                    <button
                        class="
                            complete-lesson-button
                            ${
                                completed
                                    ? "completed"
                                    : ""
                            }
                        "
                        id="completeQuestionButton"
                    >

                        ${
                            completed
                                ? "✓ Concluída"
                                : "Marcar como concluída"
                        }

                    </button>

                </div>

            </div>

        </div>

    `;


    setupQuestionEvents(
        question
    );

}


/* =========================================================
   EVENTOS DA QUESTÃO
========================================================= */

function setupQuestionEvents(
    question
) {

    const input =
        document.getElementById(
            "questionAnswer"
        );


    const check =
        document.getElementById(
            "checkAnswerButton"
        );


    const clear =
        document.getElementById(
            "clearAnswerButton"
        );


    const next =
        document.getElementById(
            "nextQuestionButton"
        );


    const complete =
        document.getElementById(
            "completeQuestionButton"
        );


    check.addEventListener(
        "click",
        () => {

            verifyQuestionAnswer(
                input.value,
                question
            );

        }
    );


    clear.addEventListener(
        "click",
        () => {

            input.value =
                "";


            const result =
                document.getElementById(
                    "answerResult"
                );


            result.className =
                "answer-result";


            result.innerHTML =
                "";

        }
    );


    next.addEventListener(
        "click",
        () => {

            nextQuestion();

        }
    );


    complete.addEventListener(
        "click",
        () => {

            markCurrentQuestion();

        }
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                verifyQuestionAnswer(
                    input.value,
                    question
                );

            }

        }
    );

}


/* =========================================================
   VERIFICAR QUESTÃO
========================================================= */

function verifyQuestionAnswer(
    value,
    question
) {

    const result =
        document.getElementById(
            "answerResult"
        );


    const next =
        document.getElementById(
            "nextQuestionButton"
        );


    if (
        !value.trim()
    ) {

        result.className =
            "answer-result show error";

        result.textContent =
            "❌ Digite uma resposta primeiro.";

        return;

    }


    const correct =
        answersMatch(
            value,
            question.acceptedAnswers
        );


    if (
        correct
    ) {

        result.className =
            "answer-result show success";

        result.innerHTML = `
            ✅ Muito bem!
            <br>
            Sua resposta foi aceita.
        `;


        next.style.display =
            "inline-flex";


        markCurrentQuestion(
            true
        );


        return;

    }


    result.className =
        "answer-result show error";

    result.innerHTML = `

        ❌ Ainda não está certo.

        <br><br>

        Tente pensar no que a pergunta
        está pedindo e responder novamente.

    `;

}


/* =========================================================
   MARCAR QUESTÃO
========================================================= */

function markCurrentQuestion(
    automatic = false
) {

    const profile =
        getProfile();


    if (
        !profile ||
        currentLanguage === null ||
        currentLevel === null
    ) {

        return;

    }


    const key =
        getQuestionKey(
            currentLanguage,
            currentLevel,
            currentQuestionIndex
        );


    if (
        profile.completedQuestions[key]
    ) {

        return;

    }


    profile.completedQuestions[key] =
        true;


    const xp =
        currentLevel === 1
            ? 10
            : currentLevel === 2
                ? 20
                : 40;


    profile.totalXP +=
        xp;


    saveAppState();


    if (!automatic) {

        showToast(
            `Questão concluída! +${xp} XP`,
            "⭐"
        );

    }


    const button =
        document.getElementById(
            "completeQuestionButton"
        );


    const next =
        document.getElementById(
            "nextQuestionButton"
        );


    if (button) {

        button.textContent =
            "✓ Concluída";

        button.classList.add(
            "completed"
        );

    }


    if (next) {

        next.style.display =
            "inline-flex";

    }


    checkCurrentLevelCompletion();

    checkAchievements();

    updateOverallProgress();

    updateProgressPage();

    renderHomeLanguages();

    renderCourseLanguages();

}


/* =========================================================
   FINALIZAR NÍVEL
========================================================= */

function checkCurrentLevelCompletion() {

    const profile =
        getProfile();


    if (!profile) {
        return;
    }


    const completed =
        getCompletedQuestions(
            currentLanguage,
            currentLevel
        );


    const total =
        LEVEL_SIZES[
            currentLevel
        ];


    if (
        completed < total
    ) {

        return;

    }


    const key =
        `${currentLanguage}-nivel${currentLevel}`;


    if (
        profile.completedLevels[key]
    ) {

        return;

    }


    profile.completedLevels[key] =
        true;


    const bonus =
        currentLevel === 1
            ? 100
            : currentLevel === 2
                ? 250
                : 500;


    profile.totalXP +=
        bonus;


    saveAppState();


    showToast(
        `${LEVEL_NAMES[currentLevel]} concluído! +${bonus} XP`,
        "🏆"
    );


    checkAchievements();

}


/* =========================================================
   PRÓXIMA QUESTÃO
========================================================= */

function nextQuestion() {

    const total =
        QUESTION_BANK[
            currentLanguage
        ][
            `level${currentLevel}`
        ].length;


    if (
        currentQuestionIndex <
        total - 1
    ) {

        currentQuestionIndex++;

        renderCurrentQuestion();

        return;

    }


    renderFinishedLevel();

}


function renderFinishedLevel() {

    const container =
        document.getElementById(
            "lessonArea"
        );


    const completed =
        getCompletedQuestions(
            currentLanguage,
            currentLevel
        );


    const total =
        LEVEL_SIZES[
            currentLevel
        ];


    if (
        completed < total
    ) {

        currentQuestionIndex = 0;

        renderCurrentQuestion();

        return;

    }


    container.innerHTML = `

        <div
            class="empty-state"
        >

            <div
                class="empty-state-icon"
            >
                🏆
            </div>


            <h2>
                Nível concluído!
            </h2>


            <p>
                Você completou todas as
                ${total}
                questões.
            </p>


            <button
                class="primary-button"
                id="backToLevels"
                style="margin-top:20px;"
            >
                ← Voltar para os níveis
            </button>

        </div>

    `;


    document
        .getElementById(
            "backToLevels"
        )
        .addEventListener(
            "click",
            () => {

                renderLevels(
                    currentLanguage
                );

            }
        );

}


/* =========================================================
   ÁREA DE ESTUDO
========================================================= */

const STUDY_CONTENT = {

    html: {

        topics: [

            {
                title: "O que é HTML?",

                text:
                    "HTML é a linguagem usada para estruturar o conteúdo de páginas web.",

                code:
`<!DOCTYPE html>

<html>

<body>

    <h1>Meu site</h1>

    <p>Olá mundo!</p>

</body>

</html>`
            },

            {
                title: "Títulos",

                text:
                    "Os títulos vão de h1 até h6. O h1 representa o nível mais alto de título.",

                code:
`<h1>Título principal</h1>

<h2>Subtítulo</h2>

<h3>Outro título</h3>`
            },

            {
                title: "Parágrafos",

                text:
                    "A tag p é usada para organizar textos em parágrafos.",

                code:
`<p>
    Este é um parágrafo.
</p>`
            },

            {
                title: "Links",

                text:
                    "A tag a cria links. O href informa o destino do link.",

                code:
`<a href="https://google.com">
    Abrir Google
</a>`
            },

            {
                title: "Imagens",

                text:
                    "A tag img coloca uma imagem. O src indica o arquivo e alt fornece uma descrição.",

                code:
`<img
    src="gato.jpg"
    alt="Foto de um gato"
>`
            },

            {
                title: "Listas",

                text:
                    "Listas não ordenadas usam ul e cada item utiliza li.",

                code:
`<ul>

    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>

</ul>`
            }

        ]

    },


    css: {

        topics: [

            {
                title: "O que é CSS?",

                text:
                    "CSS controla a aparência dos elementos HTML.",

                code:
`h1 {
    color: purple;
}`
            },

            {
                title: "Cores",

                text:
                    "A propriedade color muda a cor do texto e background-color altera a cor do fundo.",

                code:
`h1 {
    color: purple;
}

body {
    background-color: black;
}`
            },

            {
                title: "Margin e Padding",

                text:
                    "Margin cria espaço externo e padding cria espaço interno.",

                code:
`.card {
    margin: 20px;
    padding: 20px;
}`
            },

            {
                title: "Flexbox",

                text:
                    "Flexbox ajuda a organizar elementos em linhas ou colunas e facilita o alinhamento.",

                code:
`.container {
    display: flex;

    justify-content:
        center;

    align-items:
        center;
}`
            },

            {
                title: "Responsividade",

                text:
                    "Media queries permitem adaptar o estilo para diferentes tamanhos de tela.",

                code:
`@media (max-width: 600px) {

    .card {
        width: 100%;
    }

}`
            },

            {
                title: "Grid",

                text:
                    "CSS Grid é usado para criar layouts baseados em linhas e colunas.",

                code:
`.container {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 20px;
}`
            }

        ]

    },


    javascript: {

        topics: [

            {
                title: "O que é JavaScript?",

                text:
                    "JavaScript adiciona lógica e interatividade às páginas.",

                code:
`const nome = "Luiz";

console.log(nome);`
            },

            {
                title: "Variáveis",

                text:
                    "let e const são palavras-chave muito utilizadas para declarar variáveis.",

                code:
`let idade = 15;

const nome = "Luiz";`
            },

            {
                title: "If e Else",

                text:
                    "if e else permitem que o programa tome decisões.",

                code:
`if (idade >= 18) {

    console.log("Maior");

} else {

    console.log("Menor");

}`
            },

            {
                title: "Funções",

                text:
                    "Funções agrupam comandos que podem ser reutilizados.",

                code:
`function saudacao(nome) {

    console.log(
        "Olá " + nome
    );

}

saudacao("Luiz");`
            },

            {
                title: "Arrays",

                text:
                    "Arrays armazenam vários valores em uma mesma estrutura.",

                code:
`const linguagens = [
    "HTML",
    "CSS",
    "JavaScript"
];`
            },

            {
                title: "DOM",

                text:
                    "O DOM permite que JavaScript encontre e modifique elementos da página.",

                code:
`const titulo =
    document.querySelector("h1");

titulo.textContent =
    "Novo título";`
            }

        ]

    },


    python: {

        topics: [

            {
                title: "O que é Python?",

                text:
                    "Python é conhecido por ter uma sintaxe relativamente simples e legível.",

                code:
`nome = "Luiz"

print(nome)`
            },

            {
                title: "Variáveis",

                text:
                    "Em Python criamos variáveis fazendo uma atribuição.",

                code:
`idade = 15

nome = "Luiz"`
            },

            {
                title: "If e Else",

                text:
                    "if e else permitem tomar decisões.",

                code:
`if idade >= 18:
    print("Maior")
else:
    print("Menor")`
            },

            {
                title: "Loops",

                text:
                    "Loops repetem comandos. O for pode percorrer uma sequência.",

                code:
`for numero in range(5):
    print(numero)`
            },

            {
                title: "Funções",

                text:
                    "Funções agrupam instruções reutilizáveis.",

                code:
`def saudacao(nome):

    print("Olá", nome)

saudacao("Luiz")`
            },

            {
                title: "Listas",

                text:
                    "Listas armazenam vários valores e podem ser modificadas.",

                code:
`frutas = [
    "maçã",
    "banana",
    "uva"
]`
            }

        ]

    },


    cpp: {

        topics: [

            {
                title: "O que é C++?",

                text:
                    "C++ é uma linguagem compilada usada em várias áreas, incluindo sistemas e jogos.",

                code:
`#include <iostream>

int main() {

    std::cout
        << "Olá mundo";

    return 0;
}`
            },

            {
                title: "Variáveis",

                text:
                    "C++ permite declarar explicitamente o tipo das variáveis.",

                code:
`int idade = 15;

double altura = 1.75;`
            },

            {
                title: "If e Else",

                text:
                    "if e else permitem tomar decisões com base em condições.",

                code:
`if (idade >= 18) {

    std::cout << "Maior";

} else {

    std::cout << "Menor";

}`
            },

            {
                title: "Loops",

                text:
                    "Loops repetem comandos. O for é bastante utilizado.",

                code:
`for (
    int i = 0;
    i < 5;
    i++
) {

    std::cout << i;

}`
            },

            {
                title: "Classes",

                text:
                    "Classes agrupam dados e comportamentos em uma estrutura.",

                code:
`class Pessoa {

public:

    std::string nome;

};`
            },

            {
                title: "Vector",

                text:
                    "std::vector representa uma sequência dinâmica de elementos.",

                code:
`std::vector<int> numeros = {
    1,
    2,
    3
};`
            }

        ]

    }

};


/* =========================================================
   TEXTO PERSONALIZADO DO ESTUDO
========================================================= */

function personalizeStudyText(
    text
) {

    if (
        appState.currentStudent ===
        "julya"
    ) {

        return `

            <p>
                🧒 Vamos pensar de um jeito bem fácil.
            </p>

            <p>
                ${text}
            </p>

            <p>
                É como montar uma coisa com
                pecinhas de LEGO: cada comando
                tem uma função.
            </p>

        `;

    }


    if (
        appState.currentStudent ===
        "nairelis"
    ) {

        return `

            <p>
                🧑‍🏫 Vamos começar pela ideia principal
                e depois entender a parte técnica.
            </p>

            <p>
                ${text}
            </p>

            <p>
                Tente entender primeiro a finalidade
                do recurso e depois memorize sua sintaxe.
            </p>

        `;

    }


    return `

        <p>
            ${text}
        </p>

    `;

}


/* =========================================================
   ESTUDO
========================================================= */

function renderStudyLanguages() {

    const container =
        document.getElementById(
            "studyLanguageGrid"
        );


    if (!container) {
        return;
    }


    container.innerHTML =
        Object.keys(
            STUDY_CONTENT
        )
        .map(
            language => {

                const info =
                    LANGUAGE_INFO[
                        language
                    ];


                return `

                    <div
                        class="
                            study-language-card
                        "
                        data-study="${language}"
                    >

                        <div
                            class="
                                study-language-icon
                            "
                        >
                            ${info.icon}
                        </div>


                        <h3>
                            ${info.name}
                        </h3>


                        <p>
                            ${info.description}
                        </p>

                    </div>

                `;

            }
        )
        .join("");


    document
        .querySelectorAll(
            ".study-language-card"
        )
        .forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        openStudy(
                            card.dataset.study
                        );

                    }
                );

            }
        );

}


function openStudy(
    language
) {

    const info =
        LANGUAGE_INFO[
            language
        ];


    const content =
        STUDY_CONTENT[
            language
        ];


    const container =
        document.getElementById(
            "studyContent"
        );


    container.innerHTML = `

        <div
            class="study-header"
        >

            <h2>
                ${info.icon}
                ${info.name}
            </h2>


            <p>
                ${
                    appState.currentStudent ===
                    "julya"

                        ? "Explicação simples para você aprender desde o começo. 🧒"

                        : appState.currentStudent ===
                          "nairelis"

                            ? "Explicação detalhada para quem está começando. 🧑‍🏫"

                            : "Revisão direta dos principais conceitos. 👨‍💻"
                }
            </p>

        </div>


        ${content.topics
            .map(
                topic => `

                    <article
                        class="study-topic"
                    >

                        <h3>
                            ${topic.title}
                        </h3>


                        <div>
                            ${personalizeStudyText(
                                topic.text
                            )}
                        </div>


                        <pre
                            class="study-code"
                        ><code>${escapeHtml(
                            topic.code
                        )}</code></pre>

                    </article>

                `
            )
            .join("")
        }


        <div
            class="study-summary"
        >

            <h3>
                🧠 O que você estudou
            </h3>


            <ul>

                ${content.topics
                    .map(
                        topic =>
                            `<li>${topic.title}</li>`
                    )
                    .join("")
                }

            </ul>

        </div>

    `;

}


function escapeHtml(
    text
) {

    return String(text)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        );

}


/* =========================================================
   EXERCÍCIOS
========================================================= */

const EXERCISES = [

    {
        language: "HTML",
        title: "Criar um título",
        question:
            "Crie um h1 escrito Meu Site.",
        acceptedAnswers: [
            "<h1>meu site</h1>"
        ]
    },

    {
        language: "HTML",
        title: "Criar um parágrafo",
        question:
            "Crie um parágrafo escrito Olá mundo.",
        acceptedAnswers: [
            "<p>olá mundo</p>",
            "<p>ola mundo</p>"
        ]
    },

    {
        language: "CSS",
        title: "Mudar a cor",
        question:
            "Faça um h1 ficar roxo.",
        acceptedAnswers: [
            "h1{color:purple}",
            "h1{color:#800080}",
            "h1{color:rgb(128,0,128)}"
        ]
    },

    {
        language: "CSS",
        title: "Centralizar",
        question:
            "Centralize o texto usando CSS.",
        acceptedAnswers: [
            "text-align:center"
        ]
    },

    {
        language: "JavaScript",
        title: "Variável",
        question:
            "Crie uma variável idade com valor 15.",
        acceptedAnswers: [
            "let idade=15",
            "const idade=15",
            "var idade=15"
        ]
    },

    {
        language: "JavaScript",
        title: "Console",
        question:
            "Mostre Olá mundo no console.",
        acceptedAnswers: [
            "console.log(\"olá mundo\")",
            "console.log('olá mundo')",
            "console.log(\"ola mundo\")",
            "console.log('ola mundo')"
        ]
    },

    {
        language: "Python",
        title: "Variável",
        question:
            "Crie uma variável nome com valor Luiz.",
        acceptedAnswers: [
            'nome="luiz"'
        ]
    },

    {
        language: "Python",
        title: "Print",
        question:
            "Mostre Olá mundo.",
        acceptedAnswers: [
            'print("olá mundo")',
            "print('olá mundo')",
            'print("ola mundo")',
            "print('ola mundo')"
        ]
    },

    {
        language: "C++",
        title: "Cout",
        question:
            "Mostre Olá mundo utilizando cout.",
        acceptedAnswers: [
            'cout<<"olá mundo";',
            'std::cout<<"olá mundo";'
        ]
    },

    {
        language: "C++",
        title: "Variável",
        question:
            "Crie uma variável int idade com valor 15.",
        acceptedAnswers: [
            "int idade=15"
        ]
    }

];


let exerciseFilter =
    "all";


function renderExercises() {

    const container =
        document.getElementById(
            "exerciseList"
        );


    if (!container) {
        return;
    }


    let list =
        EXERCISES;


    if (
        exerciseFilter !==
        "all"
    ) {

        list =
            EXERCISES.filter(
                exercise =>
                    exercise.language ===
                    exerciseFilter
            );

    }


    container.innerHTML =
        list
        .map(
            (exercise, index) => {

                const originalIndex =
                    EXERCISES.indexOf(
                        exercise
                    );


                return `

                    <div
                        class="
                            exercise-card
                        "
                    >

                        <div
                            class="
                                exercise-card-header
                            "
                        >

                            <span
                                class="
                                    exercise-language
                                "
                            >
                                ${exercise.language}
                            </span>


                            <span
                                class="
                                    exercise-number
                                "
                            >
                                #${index + 1}
                            </span>

                        </div>


                        <h3>
                            ${exercise.title}
                        </h3>


                        <p>
                            ${exercise.question}
                        </p>


                        <div
                            class="
                                exercise-card-actions
                            "
                        >

                            <button
                                class="primary-button"
                                data-exercise="${originalIndex}"
                            >
                                Resolver →
                            </button>

                        </div>

                    </div>

                `;

            }
        )
        .join("");


    container
        .querySelectorAll(
            "[data-exercise]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openExercise(
                            Number(
                                button.dataset.exercise
                            )
                        );

                    }
                );

            }
        );

}


document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    exerciseFilter =
                        button.dataset.filter;


                    renderExercises();

                }
            );

        }
    );


/* =========================================================
   MODAL
========================================================= */

const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const modalContent =
    document.getElementById(
        "modalContent"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


function openModal(
    html
) {

    modalContent.innerHTML =
        html;


    modalOverlay.classList.add(
        "show"
    );

}


function closeModal() {

    modalOverlay.classList.remove(
        "show"
    );

    modalContent.innerHTML =
        "";

}


modalClose?.addEventListener(
    "click",
    closeModal
);


modalOverlay?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalOverlay
        ) {

            closeModal();

        }

    }
);


function openExercise(
    index
) {

    const exercise =
        EXERCISES[index];


    openModal(`

        <span class="page-badge">
            ${exercise.language}
        </span>


        <h2
            style="
                margin-top:15px;
                font-size:24px;
            "
        >
            ${exercise.title}
        </h2>


        <p
            style="
                margin-top:10px;
                color:var(--text-secondary);
                line-height:1.7;
                font-size:13px;
            "
        >
            ${exercise.question}
        </p>


        <textarea
            class="answer-input"
            id="exerciseAnswer"
            placeholder="Digite sua resposta..."
            style="margin-top:20px;"
        ></textarea>


        <div
            class="answer-actions"
        >

            <button
                class="check-answer-button"
                id="checkExercise"
            >
                ✅ Verificar
            </button>

        </div>


        <div
            class="answer-result"
            id="exerciseResult"
        ></div>

    `);


    document
        .getElementById(
            "checkExercise"
        )
        .addEventListener(
            "click",
            () => {

                const input =
                    document.getElementById(
                        "exerciseAnswer"
                    );


                const result =
                    document.getElementById(
                        "exerciseResult"
                    );


                const profile =
                    getProfile();


                if (
                    !input.value.trim()
                ) {

                    result.className =
                        "answer-result show error";

                    result.textContent =
                        "❌ Digite uma resposta.";

                    return;

                }


                const correct =
                    answersMatch(
                        input.value,
                        exercise.acceptedAnswers
                    );


                if (
                    correct
                ) {

                    result.className =
                        "answer-result show success";

                    result.textContent =
                        "✅ Acertou!";


                    const id =
                        String(index);


                    if (
                        !profile.exerciseCompleted.includes(
                            id
                        )
                    ) {

                        profile.exerciseCompleted.push(
                            id
                        );

                        profile.totalXP +=
                            15;

                    }


                    saveAppState();

                    checkAchievements();

                    updateProgressPage();

                    return;

                }


                result.className =
                    "answer-result show error";

                result.textContent =
                    "❌ Ainda não. Tente novamente.";

            }
        );

}


/* =========================================================
   QUIZ
========================================================= */

const QUIZ_QUESTIONS = [

    {
        question:
            "Qual linguagem é usada principalmente para estruturar páginas web?",

        options: [
            "HTML",
            "CSS",
            "Python",
            "C++"
        ],

        answer: 0
    },

    {
        question:
            "Qual propriedade CSS muda a cor do texto?",

        options: [
            "background",
            "color",
            "display",
            "font-size"
        ],

        answer: 1
    },

    {
        question:
            "Qual comando mostra algo no console JavaScript?",

        options: [
            "print()",
            "show()",
            "console.log()",
            "write()"
        ],

        answer: 2
    },

    {
        question:
            "Qual palavra define uma função em Python?",

        options: [
            "function",
            "def",
            "func",
            "method"
        ],

        answer: 1
    },

    {
        question:
            "Qual função é normalmente o ponto de entrada de um programa C++?",

        options: [
            "start()",
            "main()",
            "run()",
            "begin()"
        ],

        answer: 1
    }

];


let quizIndex =
    0;

let quizScore =
    0;

let quizRunning =
    false;


function startQuiz() {

    if (
        quizRunning
    ) {

        return;

    }


    quizRunning =
        true;

    quizIndex =
        0;

    quizScore =
        0;


    renderQuiz();

}


function renderQuiz() {

    const container =
        document.getElementById(
            "quizContainer"
        );


    if (!container) {
        return;
    }


    if (
        quizIndex >=
        QUIZ_QUESTIONS.length
    ) {

        finishQuiz();

        return;

    }


    const question =
        QUIZ_QUESTIONS[
            quizIndex
        ];


    const progress =
        Math.round(
            (
                quizIndex /
                QUIZ_QUESTIONS.length
            ) * 100
        );


    container.innerHTML = `

        <div
            class="quiz-card"
        >

            <div
                class="quiz-top"
            >

                <span
                    class="quiz-counter"
                >
                    Questão
                    ${quizIndex + 1}
                    /
                    ${QUIZ_QUESTIONS.length}
                </span>


                <div
                    class="quiz-progress"
                >

                    <div
                        class="quiz-progress-fill"
                        style="
                            width:${progress}%
                        "
                    ></div>

                </div>

            </div>


            <h2
                class="quiz-question"
            >
                ${question.question}
            </h2>


            <div
                class="quiz-options"
            >

                ${question.options
                    .map(
                        (option, index) => `

                            <button
                                class="
                                    quiz-option
                                "
                                data-answer="${index}"
                            >

                                <span
                                    class="
                                        quiz-option-letter
                                    "
                                >
                                    ${String.fromCharCode(
                                        65 + index
                                    )}
                                </span>


                                <span>
                                    ${option}
                                </span>

                            </button>

                        `
                    )
                    .join("")
                }

            </div>


            <div
                class="quiz-feedback"
                id="quizFeedback"
            ></div>


            <button
                class="quiz-next"
                id="quizNext"
            >
                Próxima →
            </button>

        </div>

    `;


    document
        .querySelectorAll(
            ".quiz-option"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        answerQuiz(
                            Number(
                                button.dataset.answer
                            )
                        );

                    }
                );

            }
        );


    document
        .getElementById(
            "quizNext"
        )
        .addEventListener(
            "click",
            () => {

                quizIndex++;

                renderQuiz();

            }
        );

}


function answerQuiz(
    selected
) {

    const question =
        QUIZ_QUESTIONS[
            quizIndex
        ];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    buttons.forEach(
        button => {

            button.disabled =
                true;

        }
    );


    buttons[
        question.answer
    ].classList.add(
        "correct"
    );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    if (
        selected ===
        question.answer
    ) {

        quizScore++;


        feedback.className =
            "quiz-feedback show success";

        feedback.textContent =
            "✅ Resposta correta!";


        showToast(
            "Acertou! 🎉",
            "✅"
        );

    } else {

        buttons[
            selected
        ].classList.add(
            "wrong"
        );


        feedback.className =
            "quiz-feedback show error";

        feedback.textContent =
            "❌ Essa não foi a resposta correta.";

    }


    document
        .getElementById(
            "quizNext"
        )
        .classList.add(
            "show"
        );

}


function finishQuiz() {

    const profile =
        getProfile();


    if (!profile) {
        return;
    }


    const percentage =
        Math.round(
            (
                quizScore /
                QUIZ_QUESTIONS.length
            ) * 100
        );


    profile.bestQuiz =
        Math.max(
            profile.bestQuiz,
            percentage
        );


    profile.quizHistory.push({

        score:
            quizScore,

        total:
            QUIZ_QUESTIONS.length,

        percentage,

        date:
            new Date().toISOString()

    });


    profile.quizHistory =
        profile.quizHistory.slice(
            -10
        );


    saveAppState();


    const icon =
        percentage >= 80
            ? "🏆"
            : percentage >= 60
                ? "🔥"
                : "📚";


    const container =
        document.getElementById(
            "quizContainer"
        );


    container.innerHTML = `

        <div
            class="quiz-card"
        >

            <div
                class="quiz-result"
            >

                <div
                    class="quiz-result-icon"
                >
                    ${icon}
                </div>


                <h2>
                    Quiz finalizado!
                </h2>


                <p>
                    Você acertou
                    ${quizScore}
                    de
                    ${QUIZ_QUESTIONS.length}
                    questões.
                </p>


                <div
                    class="quiz-score"
                >
                    ${percentage}%
                </div>


                <button
                    class="primary-button"
                    id="restartQuiz"
                    style="
                        margin-top:25px;
                    "
                >
                    🔄 Fazer novamente
                </button>

            </div>

        </div>

    `;


    document
        .getElementById(
            "restartQuiz"
        )
        .addEventListener(
            "click",
            () => {

                quizRunning =
                    false;

                startQuiz();

            }
        );


    checkAchievements();

    updateProgressPage();

}


startQuiz();


/* =========================================================
   FILTROS
========================================================= */

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-button"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    exerciseFilter =
                        button.dataset.filter;


                    renderExercises();

                }
            );

        }
    );


/* =========================================================
   PERFIL DE EXPLICAÇÃO
========================================================= */

document
    .querySelectorAll(
        ".student-option"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const account =
                        button.dataset.student;


                    if (
                        !account
                    ) {
                        return;
                    }


                    /*
                        Essa escolha muda somente
                        o jeito da explicação,
                        mantendo a mesma conta.
                    */

                    appState.currentStudent =
                        account;


                    saveAppState();

                    updateUserUI();


                    if (
                        currentLanguage !== null &&
                        currentLevel !== null
                    ) {

                        renderCurrentQuestion();

                    }


                    showToast(
                        `Explicação de ${STUDENT_INFO[account].name} ativada.`,
                        "👤"
                    );

                }
            );

        }
    );


/* =========================================================
   PESQUISA
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


searchInput?.addEventListener(
    "input",
    () => {

        const search =
            normalizeAnswer(
                searchInput.value
            );


        if (!search) {

            renderHomeLanguages();

            return;

        }


        const results =
            Object.keys(
                LANGUAGE_INFO
            )
            .filter(
                language => {

                    const info =
                        LANGUAGE_INFO[
                            language
                        ];


                    const questions = [
                        ...QUESTION_BANK[
                            language
                        ].level1,

                        ...QUESTION_BANK[
                            language
                        ].level2,

                        ...QUESTION_BANK[
                            language
                        ].level3
                    ];


                    return (

                        normalizeAnswer(
                            info.name
                        ).includes(
                            search
                        )

                        ||

                        normalizeAnswer(
                            info.description
                        ).includes(
                            search
                        )

                        ||

                        questions.some(
                            question =>
                                normalizeAnswer(
                                    question.title
                                ).includes(
                                    search
                                )
                        )

                    );

                }
            );


        const container =
            document.getElementById(
                "homeLanguageGrid"
            );


        if (
            !container
        ) {
            return;
        }


        if (
            !results.length
        ) {

            container.innerHTML = `

                <div
                    class="no-results"
                >

                    <div
                        class="no-results-icon"
                    >
                        🔎
                    </div>


                    <h3>
                        Nada encontrado
                    </h3>


                    <p>
                        Tente pesquisar pelo nome
                        da linguagem ou pelo conteúdo.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            results
                .map(
                    createLanguageCard
                )
                .join("");


        attachLanguageEvents();

    }
);


/* =========================================================
   XP
========================================================= */

function getXPLevel(
    xp
) {

    return Math.floor(
        xp / 500
    ) + 1;

}


function getXPProgress(
    xp
) {

    const currentLevelXP =
        xp % 500;


    return Math.round(
        (
            currentLevelXP /
            500
        ) * 100
    );

}


/* =========================================================
   PROGRESSO
========================================================= */

function updateOverallProgress() {

    const percentage =
        calculateOverallProgress();


    const percent =
        document.getElementById(
            "homeProgressPercent"
        );


    const bar =
        document.getElementById(
            "homeProgressBar"
        );


    const message =
        document.getElementById(
            "homeProgressMessage"
        );


    if (percent) {

        percent.textContent =
            `${percentage}%`;

    }


    if (bar) {

        bar.style.width =
            `${percentage}%`;

    }


    if (message) {

        if (
            percentage === 0
        ) {

            message.textContent =
                "Comece sua primeira aula! 🚀";

        } else if (
            percentage < 25
        ) {

            message.textContent =
                "Você começou! Continue assim. 💪";

        } else if (
            percentage < 50
        ) {

            message.textContent =
                "Você está evoluindo bastante! 🔥";

        } else if (
            percentage < 75
        ) {

            message.textContent =
                "Mais da metade! Continue firme. 🚀";

        } else if (
            percentage < 100
        ) {

            message.textContent =
                "Está quase! Falta pouco. 🏆";

        } else {

            message.textContent =
                "Você completou todo o conteúdo! 👑";

        }

    }

}


function updateProgressPage() {

    const profile =
        getProfile();


    if (!profile) {

        return;

    }


    const lessons =
        document.getElementById(
            "statLessons"
        );


    const exercises =
        document.getElementById(
            "statExercises"
        );


    const quiz =
        document.getElementById(
            "statQuiz"
        );


    const overall =
        document.getElementById(
            "statOverall"
        );


    if (lessons) {

        lessons.textContent =
            getTotalCompletedQuestions();

    }


    if (exercises) {

        exercises.textContent =
            profile.exerciseCompleted.length;

    }


    if (quiz) {

        quiz.textContent =
            `${profile.bestQuiz}%`;

    }


    if (overall) {

        overall.textContent =
            `${calculateOverallProgress()}%`;

    }


    renderLanguageProgress();

    renderLevelProgress();

    renderXP();

    renderAchievements();

}


function renderLanguageProgress() {

    const container =
        document.getElementById(
            "progressLanguageList"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        Object.keys(
            LANGUAGE_INFO
        )
        .map(
            language => {

                const info =
                    LANGUAGE_INFO[
                        language
                    ];


                const progress =
                    calculateLanguageProgress(
                        language
                    );


                return `

                    <div
                        class="
                            progress-language-item
                        "
                    >

                        <div
                            class="
                                progress-language-top
                            "
                        >

                            <div
                                class="
                                    progress-language-name
                                "
                            >

                                ${info.icon}

                                ${info.name}

                            </div>


                            <span
                                class="
                                    progress-language-percent
                                "
                            >
                                ${progress}%
                            </span>

                        </div>


                        <div
                            class="
                                progress-language-track
                            "
                        >

                            <div
                                class="
                                    progress-language-fill
                                "
                                style="
                                    width:${progress}%
                                "
                            ></div>

                        </div>

                    </div>

                `;

            }
        )
        .join("");

}


function renderLevelProgress() {

    const container =
        document.getElementById(
            "levelProgressList"
        );


    if (!container) {

        return;

    }


    const cards = [];


    for (
        const language
        of Object.keys(
            LANGUAGE_INFO
        )
    ) {

        const info =
            LANGUAGE_INFO[
                language
            ];


        for (
            const level
            of [1, 2, 3]
        ) {

            const unlocked =
                isLevelUnlocked(
                    language,
                    level
                );


            const completed =
                getCompletedQuestions(
                    language,
                    level
                );


            const total =
                LEVEL_SIZES[
                    level
                ];


            const progress =
                Math.round(
                    (
                        completed /
                        total
                    ) * 100
                );


            cards.push(`

                <div
                    class="
                        level-progress-card
                        ${
                            unlocked
                                ? ""
                                : "locked"
                        }
                    "
                >

                    <div
                        class="
                            level-progress-header
                        "
                    >

                        <div
                            class="
                                level-progress-name
                            "
                        >

                            <div
                                class="
                                    level-progress-name-icon
                                "
                            >
                                ${info.icon}
                            </div>


                            <div>

                                ${info.name}

                                <br>

                                ${LEVEL_NAMES[level]}

                            </div>

                        </div>


                        <span
                            class="
                                level-progress-percent
                            "
                        >
                            ${
                                unlocked
                                    ? `${progress}%`
                                    : "🔒"
                            }
                        </span>

                    </div>


                    <p
                        class="
                            level-progress-description
                        "
                    >
                        ${
                            unlocked
                                ? `${completed}/${total} questões`
                                : "Complete o nível anterior"
                        }
                    </p>


                    <div
                        class="
                            level-progress-track
                        "
                    >

                        <div
                            class="
                                level-progress-fill
                            "
                            style="
                                width:${
                                    unlocked
                                        ? progress
                                        : 0
                                }%
                            "
                        ></div>

                    </div>

                </div>

            `);

        }

    }


    container.innerHTML =
        cards.join("");

}


function renderXP() {

    const profile =
        getProfile();


    if (!profile) {
        return;
    }


    const xpAmount =
        document.getElementById(
            "xpAmount"
        );


    const xpLevel =
        document.getElementById(
            "xpLevel"
        );


    const xpBar =
        document.getElementById(
            "xpProgressBar"
        );


    const level =
        getXPLevel(
            profile.totalXP
        );


    const progress =
        getXPProgress(
            profile.totalXP
        );


    if (xpAmount) {

        xpAmount.textContent =
            `${profile.totalXP} XP`;

    }


    if (xpLevel) {

        xpLevel.textContent =
            `Nível ${level}`;

    }


    if (xpBar) {

        xpBar.style.width =
            `${progress}%`;

    }

}


/* =========================================================
   CONQUISTAS
========================================================= */

const ACHIEVEMENTS = [

    {
        id: "first",
        icon: "🌱",
        title: "Primeiro passo",
        description:
            "Complete sua primeira questão.",
        condition:
            () =>
                getTotalCompletedQuestions() >= 1
    },

    {
        id: "ten",
        icon: "🔥",
        title: "Pegando ritmo",
        description:
            "Complete 10 questões.",
        condition:
            () =>
                getTotalCompletedQuestions() >= 10
    },

    {
        id: "fifty",
        icon: "⚡",
        title: "Programador dedicado",
        description:
            "Complete 50 questões.",
        condition:
            () =>
                getTotalCompletedQuestions() >= 50
    },

    {
        id: "hundred",
        icon: "💻",
        title: "Centena",
        description:
            "Complete 100 questões.",
        condition:
            () =>
                getTotalCompletedQuestions() >= 100
    },

    {
        id: "xp500",
        icon: "⭐",
        title: "500 XP",
        description:
            "Alcance 500 XP.",
        condition:
            () =>
                getProfile()?.totalXP >= 500
    },

    {
        id: "xp1000",
        icon: "🌟",
        title: "1000 XP",
        description:
            "Alcance 1000 XP.",
        condition:
            () =>
                getProfile()?.totalXP >= 1000
    },

    {
        id: "html",
        icon: "🌐",
        title: "HTML completo",
        description:
            "Complete todo o HTML.",
        condition:
            () =>
                calculateLanguageProgress(
                    "html"
                ) >= 100
    },

    {
        id: "css",
        icon: "🎨",
        title: "CSS completo",
        description:
            "Complete todo o CSS.",
        condition:
            () =>
                calculateLanguageProgress(
                    "css"
                ) >= 100
    },

    {
        id: "javascript",
        icon: "⚡",
        title: "JavaScript completo",
        description:
            "Complete todo o JavaScript.",
        condition:
            () =>
                calculateLanguageProgress(
                    "javascript"
                ) >= 100
    },

    {
        id: "python",
        icon: "🐍",
        title: "Python completo",
        description:
            "Complete todo o Python.",
        condition:
            () =>
                calculateLanguageProgress(
                    "python"
                ) >= 100
    },

    {
        id: "cpp",
        icon: "⚙️",
        title: "C++ completo",
        description:
            "Complete todo o C++.",
        condition:
            () =>
                calculateLanguageProgress(
                    "cpp"
                ) >= 100
    }

];


function checkAchievements() {

    const profile =
        getProfile();


    if (!profile) {

        return;

    }


    ACHIEVEMENTS.forEach(
        achievement => {

            if (
                !profile.achievements[
                    achievement.id
                ] &&
                achievement.condition()
            ) {

                profile.achievements[
                    achievement.id
                ] = true;


                showToast(
                    `Conquista: ${achievement.title}!`,
                    achievement.icon
                );

            }

        }
    );


    saveAppState();

}


function renderAchievements() {

    const container =
        document.getElementById(
            "achievementsGrid"
        );


    if (!container) {

        return;

    }


    checkAchievements();


    const profile =
        getProfile();


    container.innerHTML =
        ACHIEVEMENTS
        .map(
            achievement => {

                const unlocked =
                    Boolean(
                        profile.achievements[
                            achievement.id
                        ]
                    );


                return `

                    <div
                        class="
                            achievement-card
                            ${
                                unlocked
                                    ? "unlocked"
                                    : "locked"
                            }
                        "
                    >

                        <div
                            class="
                                achievement-icon
                            "
                        >
                            ${
                                unlocked
                                    ? achievement.icon
                                    : "🔒"
                            }
                        </div>


                        <h3>
                            ${achievement.title}
                        </h3>


                        <p>
                            ${achievement.description}
                        </p>

                    </div>

                `;

            }
        )
        .join("");

}


/* =========================================================
   PESQUISA
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


searchInput?.addEventListener(
    "input",
    () => {

        const search =
            normalizeAnswer(
                searchInput.value
            );


        const container =
            document.getElementById(
                "homeLanguageGrid"
            );


        if (!container) {
            return;
        }


        if (!search) {

            renderHomeLanguages();

            return;

        }


        const results =
            Object.keys(
                LANGUAGE_INFO
            )
            .filter(
                language => {

                    const info =
                        LANGUAGE_INFO[
                            language
                        ];


                    const questions = [
                        ...QUESTION_BANK[
                            language
                        ].level1,

                        ...QUESTION_BANK[
                            language
                        ].level2,

                        ...QUESTION_BANK[
                            language
                        ].level3
                    ];


                    return (

                        normalizeAnswer(
                            info.name
                        ).includes(
                            search
                        )

                        ||

                        normalizeAnswer(
                            info.description
                        ).includes(
                            search
                        )

                        ||

                        questions.some(
                            question =>
                                normalizeAnswer(
                                    question.title
                                ).includes(
                                    search
                                )
                        )

                    );

                }
            );


        if (!results.length) {

            container.innerHTML = `

                <div
                    class="no-results"
                >

                    <div
                        class="no-results-icon"
                    >
                        🔎
                    </div>


                    <h3>
                        Nada encontrado
                    </h3>


                    <p>
                        Tente pesquisar outro termo.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            results
                .map(
                    createLanguageCard
                )
                .join("");


        attachLanguageEvents();

    }
);


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(
    message,
    icon = "✅"
) {

    const toast =
        document.getElementById(
            "toast"
        );


    const iconElement =
        document.getElementById(
            "toastIcon"
        );


    const messageElement =
        document.getElementById(
            "toastMessage"
        );


    if (!toast) {
        return;
    }


    iconElement.textContent =
        icon;


    messageElement.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================================
   RENDERIZAÇÃO GERAL
========================================================= */

function renderEverything() {

    renderHomeLanguages();

    renderStudyLanguages();

    renderCourseLanguages();

    renderExercises();

    updateOverallProgress();

    updateProgressPage();

    updateUserUI();

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

applyTheme();

renderEverything();


/*
    Se ainda não escolheu uma conta,
    mantém a tela de seleção aberta.
*/

if (
    !appState.currentStudent
) {

    accountScreen.classList.remove(
        "hidden"
    );

} else {

    accountScreen.classList.add(
        "hidden"
    );

}


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CodeStudy carregado."
);

console.log(
    "Total de questões:",
    getTotalQuestions()
);

console.log(
    "Conta atual:",
    appState.currentStudent
);

if (
    getProfile()
) {

    console.log(
        "XP:",
        getProfile().totalXP
    );

    console.log(
        "Questões concluídas:",
        getTotalCompletedQuestions()
    );

}