'use client';

import React, {FC} from 'react';
import { InfiniteTweetList } from "@/components/InfiniteTweetList";
import { api } from "@/trpc/react";
import { serverApi } from "@/trpc/server";

export const RecentTweets: FC<{
    initialTweets: Awaited<ReturnType<(typeof serverApi.tweet.infiniteFeed.query)>>
}> = ({
    initialTweets
}) => {
    const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
        {},
        {
            getNextPageParam: lastPage => lastPage.nextCursor,
            initialData: {
                pageParams: [],
                pages: [
                    { ...initialTweets }
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