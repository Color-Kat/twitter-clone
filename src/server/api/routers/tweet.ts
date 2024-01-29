import { z } from "zod";

import {
    createTRPCContext,
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { inferAsyncReturnType } from "@trpc/server";
import { Prisma } from ".prisma/client";
import TweetWhereInput = Prisma.TweetWhereInput;

export const tweetRouter = createTRPCRouter({
    infiniteProfileFeed: publicProcedure
        .input(z.object({
            userId: z.string(),
            limit: z.number().optional(),
            cursor: z.object({
                id: z.string(),
                createdAt: z.date()
            }).optional()
        }))
        .query(async ({input: {userId, limit = 10, cursor}, ctx}) => {
            return await getInfiniteTweets({
                limit,
                cursor,
                ctx,
                whereClause: {
                    userId
                }
            });
        }),
    infiniteFeed: publicProcedure
        .input(z.object({
            onlyFollowing: z.boolean().optional(),
            limit: z.number().optional(),
            cursor: z.object({
                id: z.string(),
                createdAt: z.date()
            }).optional()
        }))
        .query(async ({ input: { limit = 10, cursor, onlyFollowing }, ctx }) => {

            const currentUserId = ctx.session?.user.id;
            const whereClause = currentUserId == null || !onlyFollowing
                ? undefined
                : {
                    user: {
                        followers: {
                            some: {id: currentUserId}
                        }
                    }
                }
            ;

            return await getInfiniteTweets({
                limit,
                cursor,
                ctx,
                whereClause
            });
        }),
    create: protectedProcedure
        .input(z.object({ content: z.string() }))
        .mutation(async ({ input: { content }, ctx }) => {
            return await ctx.db.tweet.create({
                data: {
                    content,
                    userId: ctx.session.user.id
                }
            })
        }),
    toggleLike: protectedProcedure
        .input(z.object({
            id: z.string()
        }))
        .output(z.object({
            addedLike: z.boolean()
        }))
        .mutation(async ({ input: { id }, ctx }) => {
            const data = { tweetId: id, userId: ctx.session.user.id };
            const existingTweet = await ctx.db.like.findUnique({
                where: { userId_tweetId: data }
            });

            if (existingTweet == null) {
                await ctx.db.like.create({ data });
                return { addedLike: true };
            } else {
                await ctx.db.like.delete({ where: { userId_tweetId: data } })
                return { addedLike: false };
            }
        }),
});

async function getInfiniteTweets({
    whereClause,
    ctx,
    limit,
    cursor
}: {
    whereClause?: TweetWhereInput,
    limit: number,
    cursor: { id: string, createdAt: Date } | undefined,
    ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {
    const currentUserId = ctx.session?.user.id;

    const data = await ctx.db.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? cursor : undefined,
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        where: whereClause,
        select: {
            id: true,
            content: true,
            createdAt: true,
            _count: { select: { likes: true } },
            likes: currentUserId
                ? { where: { userId: currentUserId } }
                : false,
            user: {
                select: { name: true, id: true, image: true }
            }
        }
    });

    // Get the next cursor pointer (createdAt_id)
    let nextCursor: typeof cursor | undefined;
    if (data.length > limit) {
        const nextItem = data.pop();
        if (nextItem) nextCursor = {
            id: nextItem.id,
            createdAt: nextItem.createdAt
        };
    }

    return {
        tweets: data.map(tweet => {
            return {
                id: tweet.id,
                content: tweet.content,
                createdAt: tweet.createdAt,
                likeCount: tweet._count.likes,
                user: { ...tweet.user },
                likedByMe: tweet.likes?.length > 0
            }
        }),
        nextCursor
    }
}
