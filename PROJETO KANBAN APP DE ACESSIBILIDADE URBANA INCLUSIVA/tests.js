/* =========================================================
   tests.js — testes dos componentes/funções principais
   Runner simples, sem dependências externas. Funciona:
   - No navegador: abra tests.html
   - No Node 18+: node tests.js  (requer "type":"module" ou
     rodar com: node --experimental-vm-modules tests.js)
   ========================================================= */

import { validateEmail, validateRegistration, findUserByEmail } from "./app.js";

const results = [];

function test(description, fn) {
  try {
    fn();
    results.push({ description, pass: true });
  } catch (err) {
    results.push({ description, pass: false, error: err.message });
  }
}

function assertEqual(actual, expected, msg = "") {
  if (actual !== expected) {
    throw new Error(`${msg} — esperado: ${JSON.stringify(expected)}, recebido: ${JSON.stringify(actual)}`);
  }
}

function assertTrue(value, msg = "") {
  if (!value) throw new Error(`${msg} — esperado valor truthy`);
}

/* ---------- validateEmail ---------- */
test("validateEmail aceita e-mail válido", () => {
  assertTrue(validateEmail("usuaria@rotalivre.app"));
});

test("validateEmail rejeita e-mail sem @", () => {
  assertEqual(validateEmail("usuaria.rotalivre.app"), false);
});

test("validateEmail rejeita string vazia", () => {
  assertEqual(validateEmail(""), false);
});

/* ---------- validateRegistration ---------- */
test("validateRegistration aceita cadastro completo e válido", () => {
  const errors = validateRegistration({
    name: "Maria Silva",
    email: "maria@exemplo.com",
    password: "1234",
    disability: "visual",
  });
  assertEqual(errors.length, 0, "não deveria haver erros");
});

test("validateRegistration exige tipo de deficiência", () => {
  const errors = validateRegistration({
    name: "Maria Silva",
    email: "maria@exemplo.com",
    password: "1234",
    disability: null,
  });
  assertTrue(errors.some((e) => e.includes("deficiência")));
});

test("validateRegistration exige senha com 4+ caracteres", () => {
  const errors = validateRegistration({
    name: "Maria Silva",
    email: "maria@exemplo.com",
    password: "123",
    disability: "auditiva",
  });
  assertTrue(errors.some((e) => e.toLowerCase().includes("senha")));
});

test("validateRegistration exige nome com 2+ caracteres", () => {
  const errors = validateRegistration({
    name: "M",
    email: "maria@exemplo.com",
    password: "1234",
    disability: "auditiva",
  });
  assertTrue(errors.some((e) => e.toLowerCase().includes("nome")));
});

/* ---------- findUserByEmail ---------- */
const sampleUsers = [
  { name: "Ana", email: "ana@exemplo.com", disability: "visual" },
  { name: "Bruno", email: "Bruno@Exemplo.com", disability: "intelectual" },
];

test("findUserByEmail encontra usuário existente", () => {
  const user = findUserByEmail(sampleUsers, "ana@exemplo.com");
  assertTrue(user && user.name === "Ana");
});

test("findUserByEmail ignora maiúsculas/minúsculas", () => {
  const user = findUserByEmail(sampleUsers, "bruno@exemplo.com");
  assertTrue(user && user.name === "Bruno");
});

test("findUserByEmail retorna undefined para e-mail inexistente", () => {
  const user = findUserByEmail(sampleUsers, "naoexiste@exemplo.com");
  assertEqual(user, undefined);
});

/* ---------- relatório ---------- */
function report() {
  const passed = results.filter((r) => r.pass).length;
  const failed = results.length - passed;

  results.forEach((r) => {
    const icon = r.pass ? "✅" : "❌";
    const line = `${icon} ${r.description}${r.pass ? "" : "\n   " + r.error}`;
    // eslint-disable-next-line no-console
    console.log(line);
  });

  console.log(`\n${passed}/${results.length} testes passaram${failed ? `, ${failed} falharam` : ""}.`);
  return { passed, failed, total: results.length };
}

report();

export { report };
