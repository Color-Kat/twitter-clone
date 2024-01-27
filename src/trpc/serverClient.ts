import { appRouter } from "@/server/api/root";
import { httpBatchLink } from "@trpc/client";
import { createTRPCContext } from "@/server/api/trpc";

export const serverClient = appRouter.createCaller(
    await createTRPCContext({} as any, false)
)