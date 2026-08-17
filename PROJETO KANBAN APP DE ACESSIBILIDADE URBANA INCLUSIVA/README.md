# Rota Livre — App de Acessibilidade Urbana

Aplicação web responsiva (HTML + CSS + JavaScript puro) que simula um app mobile de acessibilidade urbana: cadastro de pessoas com deficiência (PCD) e um painel personalizado com recursos de mobilidade urbana de acordo com o tipo de deficiência informado.

## Como rodar

Não há build nem dependências. Basta servir a pasta como arquivos estáticos (é necessário um servidor local por causa dos módulos ES / `fetch` de módulos — abrir o `index.html` direto com `file://` pode bloquear os `import`):

```bash
cd app
python3 -m http.server 8080
# depois abra http://localhost:8080
```

Ou, com Node instalado:

```bash
npx serve app
```

## Estrutura de arquivos

```
app/
├── index.html      # telas: login, cadastro, painel (dashboard)
├── style.css        # design tokens, tema claro/escuro, layout responsivo
├── app.js           # estado central (Context API em JS puro), auth, localStorage, notificações
├── resources.js      # módulo carregado sob demanda (lazy loading) com os recursos por tipo de deficiência
├── tests.js          # testes dos componentes/funções principais
└── tests.html        # executa tests.js no navegador
```

## Funcionalidades implementadas

- **Cadastro de PCD** com seleção do tipo de deficiência (visual, auditiva, físico-motora, intelectual, múltipla).
- **Persistência local** dos usuários e da sessão via `localStorage` (equivalente ao SQLite pedido para mobile).
- **Autenticação** com um estado central de "usuário logado" (padrão Context API, implementado em JS puro com *store* + `subscribe`).
- **Painel personalizado** por tipo de deficiência: recursos recomendados e rotas/equipamentos urbanos acessíveis (piso tátil, semáforos com tempo estendido, rampas, elevadores etc.).
- **Tema claro/escuro**, persistido entre sessões.
- **Notificações simuladas em tempo real** sobre condições de acessibilidade (painel lateral + indicador visual).
- **Carregamento assíncrono de componentes**: `resources.js` só é importado (`import()` dinâmico) quando o painel é aberto, com skeleton de carregamento na tela.
- **Testes automatizados** das funções principais (validação de e-mail, validação de cadastro, busca de usuário).

## Testando

Abra `tests.html` no navegador (ou sirva a pasta e acesse `/tests.html`) para ver os resultados dos testes na tela e no console.

## Terminologia

O app usa consistentemente o termo **"pessoa com deficiência"**, conforme orientação do enunciado — nunca "portador de deficiência" ou "deficiente".

## Conta de demonstração

Na tela de login, o botão **"Usar conta de exemplo"** cria e preenche automaticamente uma conta de teste (`demo@rotalivre.app` / senha `1234`, tipo visual) para facilitar a avaliação sem precisar cadastrar um usuário novo.
