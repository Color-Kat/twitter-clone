'use client';

import React, {FC} from 'react';
import {api} from "@/trpc/react";
import {InfiniteTweetList} from "@/components/InfiniteTweetList";
import { serverClient } from "@/trpc/serverClient";

export const ProfileTweets: FC<{
    userId: string,
    initialTweets: Awaited<ReturnType<(typeof serverClient.tweet.infiniteProfileFeed)>>
}> = ({
    userId,
    initialTweets
}) => {
    const tweets = api.tweet.infiniteProfileFeed.useInfiniteQuery(
        {userId},
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
            initialData: {
                pageParams: [],
                pages: [
                    initialTweets
                ]
            }
        }
    );

    return (
        <InfiniteTweetList
            tweets={
                tweets.data?.pages.flatMap(page => page.tweets)
            }
            isError={tweets.isError}
            isLoading={tweets.isLoading}
            hasMore={Boolean(tweets.hasNextPage)}
            fetchNewTweets={tweets.fetchNextPage}
        />
    );
};