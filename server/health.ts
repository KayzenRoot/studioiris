import type {Pool} from "pg";

export type DatabaseHealth =
  | {status:"ready";mode:"team";storage:"disk";database:"postgresql"}
  | {status:"not_ready";mode:"team";storage:"disk";database:"unavailable"};

/** Fast, non-retrying readiness probe. Failure is a 503 state, never a generic server exception. */
export async function databaseHealth(pool: Pick<Pool, "query">): Promise<DatabaseHealth> {
  try {
    await pool.query("SELECT 1");
    return {status:"ready",mode:"team",storage:"disk",database:"postgresql"};
  } catch {
    return {status:"not_ready",mode:"team",storage:"disk",database:"unavailable"};
  }
}
