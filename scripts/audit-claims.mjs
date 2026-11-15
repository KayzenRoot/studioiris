// The parity table quotes counts ("Ready 31", "Planned 17"). These drift silently when a capability
// changes state, so this compares the document against the live catalogue when a worker is configured.
// Usage: npm run audit:claims (the app must be running).
import {readFileSync} from "node:fs";

const API = (process.env.COMFYFIELD_API ?? "http://127.0.0.1:8787/api/v1").replace(/\/$/, "");
const ORIGIN = new URL(API).origin;
const DOC = "docs/PARITY-STATUS.md";

async function main() {
  const jar = new Map();
  const healthy = await fetch(`${ORIGIN}/api/v1/health`).then(response => response.ok).catch(() => false);
  if (!healthy) {
    console.log(`the app is not answering at ${ORIGIN} — start it with npm start, then run this again.`);
    return 1;
  }

  async function call(method, endpoint, body) {
    const headers = {origin: ORIGIN};
    if (jar.size) headers.cookie = [...jar].map(([key, value]) => `${key}=${value}`).join("; ");
    if (body !== undefined) headers["content-type"] = "application/json";
    const response = await fetch(API + endpoint, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)});
    for (const value of response.headers.getSetCookie?.() ?? []) {
      const [pair] = value.split(";");
      const index = pair.indexOf("=");
      jar.set(pair.slice(0, index), pair.slice(index + 1));
    }
    const text = await response.text();
    if (!response.ok) throw new Error(`${method} ${endpoint} -> HTTP ${response.status}: ${text.slice(0, 160)}`);
    return text ? JSON.parse(text) : null;
  }

  await call("GET", "/auth/me");
  const workspaces = await call("GET", "/workspaces");
  const workspaceId = process.env.COMFYFIELD_WORKSPACE ?? workspaces[0]?.id;
  if (!workspaceId) {
    console.log("no workspace found — start the app first.");
    return 1;
  }

  const workers = await call("GET", `/workspaces/${workspaceId}/workers`);
  const worker = workers.find(item => item.enabled) ?? workers[0];
  if (!worker) {
    console.log("parity check skipped — no worker is registered. Configure one in Settings after ComfyUI is available.");
    return 0;
  }

  /* /catalogue says which ids are capabilities; the worker probe says how each one stands. */
  const catalogue = await call("GET", `/workspaces/${workspaceId}/catalogue`);
  const capabilityIds = new Set((Array.isArray(catalogue) ? catalogue : []).map(capability => capability.id));
  const probed = await call("POST", `/workspaces/${workspaceId}/workers/${worker.id}/probe`);
  const states = new Map((probed.capabilities ?? []).map(capability => [capability.id, capability.readiness?.state ?? "unknown"]));
  const count = {ready: 0, planned: 0, other: 0};
  for (const id of capabilityIds) {
    const state = states.get(id) ?? "unknown";
    if (state === "ready") count.ready++;
    else if (state === "planned") count.planned++;
    else count.other++;
  }

  const doc = readFileSync(DOC, "utf8");
  const claimedReady = Number(doc.match(/\|\s*\*\*Ready\*\*\s*\|\s*\*\*(\d+)\*\*/)?.[1] ?? NaN);
  const claimedTotal = Number(doc.match(/\*\*(\d+) capability tiles\*\*/)?.[1] ?? NaN);
  console.log(`worker: ${worker.name}`);
  console.log(`live catalogue: ${capabilityIds.size} capabilities — ready ${count.ready}, not ready ${count.other}`);
  const breakdown = {};
  for (const id of capabilityIds) {
    const state = states.get(id) ?? "unknown";
    breakdown[state] = (breakdown[state] ?? 0) + 1;
  }
  console.log(`  by state: ${Object.entries(breakdown).map(([state, total]) => `${state} ${total}`).join(", ")}`);
  console.log(`${DOC}: ${Number.isNaN(claimedTotal) ? "(total not found)" : claimedTotal} capabilities, ready ${Number.isNaN(claimedReady) ? "(not found)" : claimedReady}`);

  /* Total and ready are the API counts. "Planned" remains a product judgement. */
  const problems = [];
  if (!Number.isNaN(claimedTotal) && capabilityIds.size !== claimedTotal) problems.push(`total says ${claimedTotal}, catalogue has ${capabilityIds.size}`);
  if (!Number.isNaN(claimedReady) && count.ready !== claimedReady) problems.push(`ready says ${claimedReady}, catalogue has ${count.ready}`);
  for (const problem of problems) console.log(`  MISMATCH ${problem}`);
  return problems.length ? 1 : 0;
}

process.exitCode = await main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  return 1;
});
