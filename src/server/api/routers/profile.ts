import { z } from "zod";
import {
    createTRPCRouter, protectedProcedure, publicProcedure,
} from "@/server/api/trpc";
import { Prisma } from ".prisma/client";
import { revalidatePath } from "next/cache";

export const profileRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ input: { id }, ctx }) => {
            const currentUserId = ctx.session?.user.id;

            const profile = await ctx.db.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    image: true,
                    _count: {
                        select: { followers: true, follows: true, tweets: true }
                    },
                    followers: true
                        // currentUserId == null
                        //     ? undefined
                        //     : { where: { id: currentUserId } }
                }
            });

            if (profile == null) return;

            return {
                name: profile.name,
                image: profile.image,
                followersCount: profile._count.followers,
                followsCount: profile._count.follows,
                tweetsCount: profile._count.tweets,
                isFollowing: profile.followers?.length > 0,
            }
        }),
    getAllProfileIds: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.user.findMany({
                select: { id: true }
            })
        }),
    toggleFollow: protectedProcedure
        .input(z.object({
            userId: z.string()
        }))
        .mutation(async ({ input: { userId }, ctx }) => {
            const currentUserId = ctx.session?.user.id;

            const existingFollow = await ctx.db.user.findFirst({
                where: {
                    id: userId,
                    followers: {
                        some: { id: currentUserId }
                    }
                }
            });

            let addedFollow;
            if (existingFollow == null) {
                await ctx.db.user.update({
                    where: { id: userId },
                    data: { followers: { connect: { id: currentUserId } } }
                });

                addedFollow = true;
            } else {
                await ctx.db.user.update({
                    where: { id: userId },
                    data: { followers: { disconnect: { id: currentUserId } } }
                });
                addedFollow = false;
            }

            // On-demand revalidation
            revalidatePath(`/profiles/${userId}`);
            revalidatePath(`/profiles/${currentUserId}`);

            return {addedFollow};
        }),
});
