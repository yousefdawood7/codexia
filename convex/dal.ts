import { type QueryCtx } from "./_generated/server";

export const userIdentity = async (ctx: QueryCtx) => ctx.auth.getUserIdentity();
