import { type MutationCtx, type QueryCtx } from "../_generated/server";

export const userIdentity = async (ctx: QueryCtx | MutationCtx) =>
  ctx.auth.getUserIdentity();
