/* =========================================================
   resources.js
   Módulo carregado de forma assíncrona (lazy loading) pelo app.js,
   apenas quando o painel do usuário é exibido. Contém os recursos
   de acessibilidade urbana personalizados por tipo de deficiência
   e a lista de rotas/equipamentos urbanos (dados simulados).
   ========================================================= */

const RESOURCES_BY_TYPE = {
  visual: [
    { icon: "🔊", title: "Semáforos sonoros", desc: "Travessias com sinal sonoro nas rotas favoritas." },
    { icon: "🦯", title: "Piso tátil direcional", desc: "Alertas sobre trechos com piso tátil de alerta e direcional." },
    { icon: "🗺️", title: "Descrição de rota por áudio", desc: "Narração passo a passo do trajeto selecionado." },
    { icon: "🔆", title: "Alto contraste", desc: "Interface adaptada para baixa visão em todas as telas." },
  ],
  auditiva: [
    { icon: "💡", title: "Alertas visuais", desc: "Avisos de travessia e chegada por luz e vibração, sem depender de som." },
    { icon: "📝", title: "Legendas em tempo real", desc: "Comunicação com atendentes de pontos de apoio com legenda automática." },
    { icon: "📳", title: "Notificação por vibração", desc: "Alertas de mudanças na rota enviados por vibração do aparelho." },
    { icon: "🧏", title: "Pontos com Libras", desc: "Locais e terminais com atendimento em Língua Brasileira de Sinais." },
  ],
  "fisico-motora": [
    { icon: "🛗", title: "Elevadores e rampas", desc: "Rotas priorizam elevadores e rampas em vez de escadas." },
    { icon: "🅿️", title: "Vagas PCD próximas", desc: "Vagas de estacionamento reservadas ao longo do trajeto." },
    { icon: "🚻", title: "Banheiros acessíveis", desc: "Banheiros adaptados nos pontos de parada da rota." },
    { icon: "🛣️", title: "Rotas sem degraus", desc: "Caminhos com piso regular, sem escadas ou degraus altos." },
  ],
  intelectual: [
    { icon: "🧭", title: "Sinalização simplificada", desc: "Ícones grandes e instruções curtas em cada etapa do trajeto." },
    { icon: "🤝", title: "Pontos de apoio", desc: "Locais com atendentes preparados para auxiliar caso precise de ajuda." },
    { icon: "⏱️", title: "Rotas com menos estímulos", desc: "Caminhos alternativos evitando ambientes muito cheios ou barulhentos." },
    { icon: "✅", title: "Passo a passo guiado", desc: "Trajeto dividido em etapas curtas e confirmadas uma a uma." },
  ],
  multipla: [
    { icon: "🔊", title: "Semáforos sonoros", desc: "Travessias com sinal sonoro nas rotas favoritas." },
    { icon: "🛗", title: "Elevadores e rampas", desc: "Rotas priorizam elevadores e rampas em vez de escadas." },
    { icon: "🧭", title: "Sinalização simplificada", desc: "Ícones grandes e instruções curtas em cada etapa do trajeto." },
    { icon: "🤝", title: "Pontos de apoio", desc: "Locais com atendentes preparados para auxiliar caso precise de ajuda." },
  ],
};

const ROUTES_BY_TYPE = {
  visual: [
    { icon: "🚦", title: "Av. Central x Rua das Flores", desc: "Semáforo sonoro ativo · piso tátil completo", status: "ok" },
    { icon: "🚇", title: "Estação Praça da Sé", desc: "Anúncios sonoros de plataforma funcionando", status: "ok" },
    { icon: "🏗️", title: "Rua XV de Novembro", desc: "Obra na calçada — piso tátil interrompido no trecho 200-260m", status: "atencao" },
  ],
  auditiva: [
    { icon: "🚦", title: "Av. Central x Rua das Flores", desc: "Sinal visual de travessia funcionando", status: "ok" },
    { icon: "🚉", title: "Terminal Rodoviário", desc: "Painel de avisos visual atualizado em tempo real", status: "ok" },
    { icon: "🔇", title: "Estação Praça da Sé", desc: "Painel visual de plataforma 2 em manutenção", status: "atencao" },
  ],
  "fisico-motora": [
    { icon: "🛗", title: "Estação Praça da Sé", desc: "Todos os elevadores operando normalmente", status: "ok" },
    { icon: "♿", title: "Shopping Centro", desc: "Rampa de acesso e vagas PCD disponíveis", status: "ok" },
    { icon: "🚧", title: "Rua XV de Novembro", desc: "Elevador da passarela fora de serviço — usar rota alternativa", status: "atencao" },
  ],
  intelectual: [
    { icon: "🧭", title: "Terminal Rodoviário", desc: "Sinalização simplificada instalada em toda a rota", status: "ok" },
    { icon: "🤝", title: "Praça Central", desc: "Ponto de apoio com atendente disponível", status: "ok" },
    { icon: "🔊", title: "Av. Central", desc: "Trecho com obras e muito ruído — rota alternativa sugerida", status: "atencao" },
  ],
  multipla: [
    { icon: "🛗", title: "Estação Praça da Sé", desc: "Elevadores e sinal sonoro funcionando", status: "ok" },
    { icon: "🧭", title: "Terminal Rodoviário", desc: "Sinalização simplificada e painel visual ativos", status: "ok" },
    { icon: "🚧", title: "Rua XV de Novembro", desc: "Obras no trecho — piso tátil e elevador afetados", status: "atencao" },
  ],
};

export async function getResourcesFor(type) {
  // Simula uma chamada assíncrona (ex.: API de recursos da cidade)
  await new Promise((resolve) => setTimeout(resolve, 500));
  return RESOURCES_BY_TYPE[type] || RESOURCES_BY_TYPE.multipla;
}

export async function getRoutesFor(type) {
  await new Promise((resolve) => setTimeout(resolve, 650));
  return ROUTES_BY_TYPE[type] || ROUTES_BY_TYPE.multipla;
}

export const DISABILITY_LABELS = {
  visual: "Deficiência visual",
  auditiva: "Deficiência auditiva",
  "fisico-motora": "Deficiência físico-motora",
  intelectual: "Deficiência intelectual",
  multipla: "Deficiência múltipla",
};
