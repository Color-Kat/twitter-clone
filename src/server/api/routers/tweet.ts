import {z} from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

export const tweetRouter = createTRPCRouter({
    create: publicProcedure
        .input(z.object({content: z.string()}))
        .mutation(async({input: {content}, ctx}) => (

        )),
});
