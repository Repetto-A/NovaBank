// Compuertas deterministas de IT Patagonia.
// Hook PreToolUse: lo que tiene que pasar SIEMPRE no se le pide al modelo, se impone acá.
// Exit 2 = se bloquea la herramienta y el motivo le llega al agente.
import { readFileSync } from "node:fs";

const evento = JSON.parse(readFileSync(0, "utf8") || "{}");
const herramienta = evento.tool_name || "";
const entrada = evento.tool_input || {};

function frenar(motivo) {
  process.stderr.write(`Compuerta humana: ${motivo}\n`);
  process.exit(2);
}

if (herramienta === "Bash") {
  const cmd = String(entrada.command || "");
  if (/\bgit\s+push\b[^;&|]*\b(main|master)\b/.test(cmd)) frenar("nadie pushea a main. Trabajá en la rama del ticket y abrí un PR.");
  if (/\bgit\s+push\b[^;&|]*(--force\b|\s-f\b)/.test(cmd)) frenar("nada de push --force. Si hace falta, que lo decida una persona.");
  if (/\bgh\s+pr\s+merge\b/.test(cmd)) frenar("el merge lo hace una persona.");
  if (/\bgh\s+pr\s+review\b[^;&|]*(--approve\b|\s-a\b)/.test(cmd)) frenar("los agentes comentan PRs, no los aprueban. Usá --comment.");
}

if (/^mcp__linear[^_]*__save_issue$/.test(herramienta)) {
  const estado = String(entrada.state || "").trim().toLowerCase();
  if (["spec aprobada", "done"].includes(estado)) frenar(`mover un ticket a "${entrada.state}" es decisión de una persona.`);
}

process.exit(0);
