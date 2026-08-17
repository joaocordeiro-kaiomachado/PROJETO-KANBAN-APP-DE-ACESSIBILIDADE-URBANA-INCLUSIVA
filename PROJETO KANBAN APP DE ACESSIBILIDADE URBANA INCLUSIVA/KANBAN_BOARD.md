# Quadro Kanban — Rota Livre

## Ferramenta

Quadro virtual (Trello, Jira ou Asana — escolher uma) **ou** quadro físico com post-its. Este documento descreve a estrutura a ser reproduzida na ferramenta escolhida e serve de evidência complementar às fotos/prints exigidos na entrega.

## Colunas e limites de WIP

| Coluna | Descrição | Limite de WIP |
|---|---|---|
| **Backlog** | Todas as tarefas do projeto, priorizadas pelo Service Request Manager | Sem limite |
| **A Fazer** | Tarefas priorizadas para as próximas puxadas da equipe | 5 |
| **Em Andamento** | Tarefas sendo executadas ativamente | 2 por pessoa (máx. 8 no total para equipe de 4-5) |
| **Revisão / Teste** | Tarefas concluídas aguardando revisão de código ou QA | 3 |
| **Concluído** | Tarefas finalizadas e validadas | Sem limite |

> A regra de ouro: ninguém puxa uma nova tarefa para "Em Andamento" se já está no limite de WIP — a prioridade é **terminar** antes de **começar mais**.

## Formato dos cartões

Cada cartão deve conter:
- **Título** da tarefa (ex.: "Implementar tela de cadastro")
- **Responsável**
- **Descrição** curta
- **Prazo estimado**
- **Etiqueta** de área (Front-end, UX, Dados, Testes, Documentação)

## Fluxo ao longo das 2 semanas (exemplo de evidência a ser registrada)

| Data | Movimentação registrada |
|---|---|
| Dia 1 | Backlog populado com os 12 itens; ambiente configurado |
| Dia 2-3 | Autenticação e banco de dados local puxados para "Em Andamento" |
| Dia 4-5 | Telas de cadastro/login em "Revisão/Teste"; pesquisa de equipamentos urbanos concluída |
| Dia 6-7 | Painel personalizado e temas em "Em Andamento" |
| Dia 8-9 | Notificações e carregamento assíncrono puxados; primeiras tarefas em "Concluído" |
| Dia 10-11 | Testes dos componentes principais; ajustes de gargalos identificados na daily |
| Dia 12-13 | Integração final e testes ponta a ponta |
| Dia 14 | Quadro finalizado, documentação e apresentação preparadas |

**Instrução para a equipe:** tirar prints (quadro virtual) ou fotos (quadro físico) do quadro em pelo menos 4 momentos diferentes ao longo das duas semanas, para comprovar a movimentação real dos cartões — essa evidência é obrigatória na entrega e na apresentação.

## Reuniões recomendadas

Embora o Kanban não exija cerimônias obrigatórias, recomenda-se uma reunião diária curta (10-15 min) para:
1. Revisar o quadro.
2. Identificar gargalos (colunas travadas, WIP estourado).
3. Decidir o que puxar em seguida.

## Métricas sugeridas para a apresentação

- **Lead time** médio das tarefas (do Backlog ao Concluído).
- Número de vezes em que o limite de WIP impediu que alguém puxasse uma nova tarefa (evidência de que a regra foi respeitada).
- Gargalos identificados e como foram resolvidos.
