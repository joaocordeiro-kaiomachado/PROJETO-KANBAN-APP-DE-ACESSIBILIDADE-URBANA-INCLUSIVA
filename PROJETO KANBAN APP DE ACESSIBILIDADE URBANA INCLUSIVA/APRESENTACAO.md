# Roteiro de Apresentação (10 minutos) — Rota Livre

## 1. Abertura e contexto (1 min)
- Nome do app: **Rota Livre**.
- Problema: pessoas com deficiência enfrentam barreiras de mobilidade urbana; o app cadastra o tipo de deficiência e personaliza recursos de acessibilidade.
- Metodologia usada: **Kanban** (diferente do Scrum: fluxo contínuo, sem sprints, com limites de WIP).

## 2. Quadro Kanban (2-3 min) — obrigatório
- Mostrar o quadro (fotos ou prints) com as colunas: Backlog, A Fazer, Em Andamento, Revisão/Teste, Concluído.
- Explicar os **limites de WIP** definidos (ex.: máx. 2 tarefas por pessoa em "Em Andamento").
- Mostrar a evolução do quadro ao longo das 2 semanas (prints/fotos em diferentes datas).
- Comentar um gargalo real que a equipe enfrentou e como foi resolvido.
- Explicar os papéis: quem foi Service Request Manager e quem foi Service Delivery Manager, e o que cada um fez na prática.

## 3. Demonstração do app funcionando (4-5 min)
Ordem sugerida da demo ao vivo:
1. **Cadastro**: criar uma conta escolhendo um tipo de deficiência (ex.: físico-motora).
2. **Login**: entrar com a conta criada (mostrar que os dados persistiram).
3. **Painel personalizado**: mostrar que os recursos e rotas mudam conforme o tipo de deficiência (comparar rapidamente com a conta demo, que é do tipo visual).
4. **Persistência**: recarregar a página e mostrar que a sessão continua logada.
5. **Tema claro/escuro**: alternar e mostrar a interface se adaptando.
6. **Notificações**: abrir o painel de notificações e mostrar um alerta chegando.
7. **Carregamento assíncrono**: apontar o skeleton de carregamento ao abrir o painel (mostra que os recursos são carregados sob demanda).

## 4. Testes e qualidade (1 min)
- Abrir `tests.html` e mostrar os testes passando (validação de e-mail, validação de cadastro, busca de usuário).
- Comentar brevemente a cobertura: por que essas funções foram escolhidas para testar.

## 5. Encerramento (1 min)
- Recapitular os principais benefícios do Kanban percebidos pela equipe: visibilidade do fluxo, previsibilidade, foco em terminar antes de começar mais.
- Reforçar a importância da terminologia correta ("pessoa com deficiência") e do impacto social do projeto.
- Abrir para perguntas.

## Checklist antes de apresentar
- [ ] Quadro Kanban com fotos/prints de pelo menos 4 momentos diferentes
- [ ] Repositório GitHub com commits diários visíveis
- [ ] App rodando localmente sem erros no console
- [ ] `tests.html` passando todos os testes
- [ ] Product Backlog (`PRODUCT_BACKLOG.md`) atualizado com status final
