# Product Backlog — Rota Livre

Metodologia: **Kanban** (fluxo contínuo, sem sprints fixos). Duração do projeto: 2 semanas.

## Papéis da equipe

| Papel | Responsabilidade |
|---|---|
| Service Request Manager | Prioriza e gerencia as demandas que entram no Backlog |
| Service Delivery Manager | Garante que o trabalho puxado para "Em Andamento" seja entregue e desbloqueia gargalos |
| Desenvolvedores | Implementação do código (front-end, lógica, persistência) |
| Designer / UX | Interface, experiência do usuário, acessibilidade visual |
| QA / Tester | Testes dos componentes e validação dos critérios de aceite |

## Itens do Backlog (priorizados)

| # | Item | Prioridade | Critério de aceite | Status |
|---|---|---|---|---|
| 1 | Configuração do ambiente de desenvolvimento | Alta | Projeto roda localmente sem erros (`index.html` servido) | ✅ Concluído |
| 2 | Estudo sobre tipos de deficiência e necessidades de acessibilidade urbana | Alta | Documento/anotações cobrindo visual, auditiva, físico-motora, intelectual e múltipla | ✅ Concluído |
| 3 | Estruturação do sistema de autenticação (Context API / equivalente em JS puro) | Alta | Store central com `getState`/`setState`/`subscribe`; sessão persistida | ✅ Concluído |
| 4 | Implementação do banco de dados local (LocalStorage) | Alta | Usuários e sessão persistem entre recarregamentos da página | ✅ Concluído |
| 5 | Telas de cadastro e login com seleção do tipo de deficiência | Alta | Formulário valida campos e grava o tipo de deficiência escolhido | ✅ Concluído |
| 6 | Tela principal com recursos personalizados por deficiência | Alta | Painel muda de conteúdo conforme `disability` do usuário logado | ✅ Concluído |
| 7 | Pesquisa sobre equipamentos urbanos acessíveis | Média | Lista de rotas/equipamentos (piso tátil, semáforo sonoro, rampas) baseada na pesquisa | ✅ Concluído |
| 8 | Sistema de temas (claro/escuro) | Média | Alternância funcional e persistida em `localStorage` | ✅ Concluído |
| 9 | Notificações sobre condições de acessibilidade em tempo real | Média | Painel de notificações recebe novos alertas periodicamente | ✅ Concluído |
| 10 | Carregamento assíncrono de componentes (lazy loading) | Média | Módulo de recursos carregado via `import()` dinâmico, com skeleton | ✅ Concluído |
| 11 | Testes para componentes principais | Alta | `tests.js`/`tests.html` cobrindo validação e busca de usuário | ✅ Concluído |
| 12 | Integração e testes finais do sistema | Alta | Fluxo completo cadastro → login → painel testado ponta a ponta | ✅ Concluído |

## Definição de Pronto (Definition of Done)

- Código versionado no GitHub com commit descritivo.
- Funcionalidade testada manualmente no navegador (Chrome/Firefox).
- Sem erros no console.
- Segue o padrão visual definido (tokens em `style.css`).
- Usa a terminologia "pessoa com deficiência".
