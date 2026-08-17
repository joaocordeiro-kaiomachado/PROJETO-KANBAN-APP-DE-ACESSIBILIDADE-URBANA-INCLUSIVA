/* =========================================================
   app.js — Rota Livre
   Vanilla JS "Context API": um estado central (AppState) com
   subscribe/notify, para o restante da UI reagir sem frameworks.
   Persistência local via localStorage (equivalente ao SQLite/
   LocalStorage pedido no projeto).
   ========================================================= */

import { DISABILITY_LABELS } from "./resources.js";

/* ---------- "Banco de dados" local ---------- */
const DB_KEYS = {
  USERS: "rotaLivre.users",
  SESSION: "rotaLivre.session",
  THEME: "rotaLivre.theme",
};

export const db = {
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || [];
    } catch {
      return [];
    }
  },
  saveUsers(users) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  },
  getSession() {
    return localStorage.getItem(DB_KEYS.SESSION);
  },
  setSession(email) {
    localStorage.setItem(DB_KEYS.SESSION, email);
  },
  clearSession() {
    localStorage.removeItem(DB_KEYS.SESSION);
  },
  getTheme() {
    return localStorage.getItem(DB_KEYS.THEME);
  },
  setTheme(theme) {
    localStorage.setItem(DB_KEYS.THEME, theme);
  },
};

/* ---------- Validação (funções puras, cobertas em tests.js) ---------- */
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export function validateRegistration({ name, email, password, disability }) {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push("Informe seu nome completo.");
  if (!validateEmail(email)) errors.push("Informe um e-mail válido.");
  if (!password || password.length < 4) errors.push("A senha deve ter ao menos 4 caracteres.");
  if (!disability) errors.push("Selecione o tipo de deficiência.");
  return errors;
}

export function findUserByEmail(users, email) {
  return users.find((u) => u.email.toLowerCase() === String(email || "").toLowerCase());
}

/* ---------- Estado central ("Context API" em JS puro) ---------- */
function createStore(initialState) {
  let state = initialState;
  const listeners = new Set();
  return {
    getState: () => state,
    setState(patch) {
      state = { ...state, ...(typeof patch === "function" ? patch(state) : patch) };
      listeners.forEach((fn) => fn(state));
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

export const store = createStore({
  user: null, // usuário logado
  theme: "claro",
});

/* ---------- Utilidades de DOM ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function showView(id) {
  $$(".view").forEach((v) => (v.hidden = v.id !== id));
}

/* ---------- Tema claro/escuro ---------- */
function applyTheme(theme) {
  document.getElementById("app").dataset.theme = theme;
  const btn = $("#themeToggle");
  btn.setAttribute("aria-pressed", theme === "escuro" ? "true" : "false");
  db.setTheme(theme);
}

function initTheme() {
  const saved = db.getTheme() || "claro";
  applyTheme(saved);
  $("#themeToggle").addEventListener("click", () => {
    const current = document.getElementById("app").dataset.theme;
    applyTheme(current === "claro" ? "escuro" : "claro");
  });
}

/* ---------- Notificações simuladas (tempo real) ---------- */
const SAMPLE_NOTIFICATIONS = [
  "Elevador da Estação Praça da Sé voltou a funcionar.",
  "Novo piso tátil instalado na Av. Central.",
  "Semáforo sonoro da Rua das Flores em manutenção preventiva às 14h.",
  "Rota alternativa disponível: obras na Rua XV de Novembro.",
  "Ponto de apoio da Praça Central com novo atendente em Libras.",
];

let notifTimer = null;

function pushNotification(text) {
  const list = $("#notifList");
  const li = document.createElement("li");
  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  li.textContent = text + " ";
  li.appendChild(time);
  list.prepend(li);
  $("#notifDot").hidden = false;
}

function initNotifications() {
  const btn = $("#notifBtn");
  const panel = $("#notifPanel");
  const closeBtn = $("#closeNotif");

  btn.addEventListener("click", () => {
    const isHidden = panel.hidden;
    panel.hidden = !isHidden;
    btn.setAttribute("aria-expanded", String(isHidden));
    if (isHidden) $("#notifDot").hidden = true;
  });
  closeBtn.addEventListener("click", () => {
    panel.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  });

  // Simula recebimento periódico de notificações de acessibilidade em tempo real
  clearInterval(notifTimer);
  notifTimer = setInterval(() => {
    const msg = SAMPLE_NOTIFICATIONS[Math.floor(Math.random() * SAMPLE_NOTIFICATIONS.length)];
    pushNotification(msg);
  }, 25000);
}

/* ---------- Autenticação ---------- */
function initAuthForms() {
  $("#goRegister").addEventListener("click", () => showView("view-register"));
  $("#goLogin").addEventListener("click", () => showView("view-login"));

  $("#fillDemo").addEventListener("click", () => {
    ensureDemoUser();
    $("#loginEmail").value = "demo@rotalivre.app";
    $("#loginPassword").value = "1234";
  });

  $("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#loginEmail").value.trim();
    const password = $("#loginPassword").value;
    const users = db.getUsers();
    const found = findUserByEmail(users, email);
    const errorEl = $("#loginError");

    if (!found || found.password !== password) {
      errorEl.textContent = "E-mail ou senha inválidos.";
      return;
    }
    errorEl.textContent = "";
    db.setSession(found.email);
    store.setState({ user: found });
    enterApp(found);
  });

  $("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#regName").value.trim();
    const email = $("#regEmail").value.trim();
    const password = $("#regPassword").value;
    const disabilityInput = $('input[name="disability"]:checked');
    const disability = disabilityInput ? disabilityInput.value : null;

    const errors = validateRegistration({ name, email, password, disability });
    const errorEl = $("#registerError");

    const users = db.getUsers();
    if (errors.length === 0 && findUserByEmail(users, email)) {
      errors.push("Já existe uma conta com esse e-mail.");
    }
    if (errors.length) {
      errorEl.textContent = errors[0];
      return;
    }
    errorEl.textContent = "";

    const newUser = { name, email, password, disability, createdAt: new Date().toISOString() };
    users.push(newUser);
    db.saveUsers(users);
    db.setSession(newUser.email);
    store.setState({ user: newUser });
    enterApp(newUser);
  });
}

function ensureDemoUser() {
  const users = db.getUsers();
  if (!findUserByEmail(users, "demo@rotalivre.app")) {
    users.push({
      name: "Usuária Demo",
      email: "demo@rotalivre.app",
      password: "1234",
      disability: "visual",
      createdAt: new Date().toISOString(),
    });
    db.saveUsers(users);
  }
}

function logout() {
  db.clearSession();
  store.setState({ user: null });
  $("#logoutBtn").hidden = true;
  showView("view-login");
}

/* ---------- Painel (dashboard) com carregamento assíncrono ---------- */
const DASH_ICON = {
  visual: "👁️",
  auditiva: "👂",
  "fisico-motora": "🦽",
  intelectual: "🧩",
  multipla: "✳️",
};

async function renderDashboard(user) {
  showView("view-dashboard");
  $("#logoutBtn").hidden = false;

  $("#dashGreeting").textContent = `Olá, ${user.name.split(" ")[0]}`;
  $("#dashEyebrow").textContent = DISABILITY_LABELS[user.disability] || "Seu painel";
  $("#dashBadge").textContent = DASH_ICON[user.disability] || "♿";

  const skeleton = $("#dashSkeleton");
  const content = $("#dashContent");
  skeleton.hidden = false;
  content.hidden = true;

  // Carregamento assíncrono de componentes: o módulo de recursos só é
  // importado quando o painel é aberto (lazy loading / code-splitting).
  const { getResourcesFor, getRoutesFor } = await import("./resources.js");
  const [resources, routes] = await Promise.all([
    getResourcesFor(user.disability),
    getRoutesFor(user.disability),
  ]);

  const resourceGrid = $("#resourceGrid");
  resourceGrid.innerHTML = "";
  resources.forEach((r) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="r-icon" aria-hidden="true">${r.icon}</span>
      <h3>${r.title}</h3>
      <p>${r.desc}</p>
    `;
    resourceGrid.appendChild(li);
  });

  const routeList = $("#routeList");
  routeList.innerHTML = "";
  routes.forEach((r) => {
    const card = document.createElement("div");
    card.className = "route-card";
    card.innerHTML = `
      <span class="route-tag" aria-hidden="true">${r.icon}</span>
      <div>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
      </div>
      <span class="route-status ${r.status}">${r.status === "ok" ? "Disponível" : "Atenção"}</span>
    `;
    routeList.appendChild(card);
  });

  skeleton.hidden = true;
  content.hidden = false;
}

function enterApp(user) {
  renderDashboard(user);
}

/* ---------- Inicialização ---------- */
function init() {
  initTheme();
  initNotifications();
  initAuthForms();

  $("#logoutBtn").addEventListener("click", logout);

  const sessionEmail = db.getSession();
  if (sessionEmail) {
    const user = findUserByEmail(db.getUsers(), sessionEmail);
    if (user) {
      store.setState({ user });
      enterApp(user);
      return;
    }
  }
  showView("view-login");
}

document.addEventListener("DOMContentLoaded", init);
