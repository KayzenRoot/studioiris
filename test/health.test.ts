import {describe, expect, it, vi} from "vitest";
import type {Pool} from "pg";
import {databaseHealth} from "../server/health";

describe("database readiness", () => {
  it("reports ready when the database answers", async () => {
    const pool={query:vi.fn().mockResolvedValue({rows:[{one:1}]})} as unknown as Pool;
    await expect(databaseHealth(pool)).resolves.toEqual({status:"ready",mode:"team",storage:"disk",database:"postgresql"});
  });

  it("reports a safe not-ready state when the database is unavailable", async () => {
    const pool={query:vi.fn().mockRejectedValue(new Error("private connection detail"))} as unknown as Pool;
    await expect(databaseHealth(pool)).resolves.toEqual({status:"not_ready",mode:"team",storage:"disk",database:"unavailable"});
  });
});
