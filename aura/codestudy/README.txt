CODESTUDY • CHAT + AULAS

O projeto funciona de 2 jeitos:

1) MODO DEMO (já funciona)
- Não precisa de banco.
- Clique em "Entrar em demo".
- Progresso e chat de demonstração ficam no localStorage deste navegador.

2) MODO ONLINE COM SUPABASE
- Crie um projeto no Supabase.
- Abra Project Settings > API e copie Project URL e anon public key.
- Abra config.js e substitua:
  COLE_SUA_SUPABASE_URL_AQUI
  COLE_SUA_SUPABASE_ANON_KEY_AQUI
- No Supabase, abra SQL Editor e rode todo o conteúdo de supabase.sql.
- No Authentication > Providers, deixe Email habilitado.
- Se o projeto exigir confirmação de e-mail, o usuário precisará confirmar o e-mail antes de entrar.

RENDER (Static Site)
Se no GitHub estiver assim:
SENAI2/
  aura/
    codestudy/
      index.html
      style.css
      script.js
      config.js
      supabase.sql

Use:
Repository: https://github.com/NeroX07-steam/SENAI2.git
Branch: main
Root Directory: aura/codestudy
Build Command: deixe vazio
Publish Directory: .

O QUE TEM
- Login/cadastro (Supabase quando configurado)
- Modo demo
- Perfil
- Progresso e XP
- Biblioteca de HTML, CSS, JavaScript, Python, C++, Java e SQL
- Explicação antes da pergunta
- Modo de explicação "bem simples" para iniciantes
- Exemplos de código
- Exercícios e respostas
- Chat com canais geral/dúvidas/desafios
- Chat Realtime via Supabase quando configurado
- Tema claro/escuro

IMPORTANTE
A anon public key do Supabase pode ficar no frontend. Nunca coloque service_role key no site.
