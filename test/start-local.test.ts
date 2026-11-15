import {describe, expect, it, vi} from "vitest";
import path from "node:path";
import {clearStalePostmaster} from "../scripts/start-local.mjs";
import {createPersistentPostgres} from "../scripts/postgres-lifecycle.mjs";

describe("persistent PostgreSQL recovery", () => {
  it("keeps the PID file when its process is still alive", async () => {
    const move=vi.fn();
    const result=await clearStalePostmaster("C:/db",{
      read:async()=>"321\n", move, running:()=>true,
    });
    expect(result).toBeNull();
    expect(move).not.toHaveBeenCalled();
  });

  it("moves a stale PID file aside without deleting database data", async () => {
    const move=vi.fn(async()=>{});
    const result=await clearStalePostmaster("C:/db",{
      read:async()=>"321\n", move, running:()=>false,
    });
    expect(result).toMatch(/^C:\\db\\postmaster\.pid\.stale-/i);
    expect(move).toHaveBeenCalledOnce();
    expect(move.mock.calls[0][0]).toBe("C:\\db\\postmaster.pid");
  });

  it("does nothing when no PID file exists", async () => {
    const missing=Object.assign(new Error("missing"),{code:"ENOENT"});
    await expect(clearStalePostmaster("C:/db",{read:async()=>{throw missing;}})).resolves.toBeNull();
  });

  it("allows interrupted-cluster recovery to finish before pg_ctl times out", async () => {
    const directory = path.resolve("C:/db");
    let reads = 0;
    let startCall;
    const pg = await createPersistentPostgres({
      databaseDir: directory, user: "postgres", password: "test-only", port: 55433, persistent: true,
    }, {
      Base: class { constructor() {} },
      readFile: async () => {
        reads += 1;
        if (reads === 1) throw Object.assign(new Error("missing pid"), {code: "ENOENT"});
        return `321\n${directory}\n1794747417\n55433\n`;
      },
      realpath: async value => path.resolve(value),
      binaries: async () => ({pg_ctl: "pg_ctl.exe"}),
      execute: async (file, args, options) => { startCall = {file, args, options}; },
    });
    await pg.start();
    expect(startCall.args).toContain("120");
    expect(startCall.options.timeout).toBeGreaterThanOrEqual(125000);
  });
});
