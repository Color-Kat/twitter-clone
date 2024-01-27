'use client';

import React, {memo, FC} from 'react';
import {api} from "@/trpc/react";
import {InfiniteTweetList} from "@/components/InfiniteTweetList";
import { serverApi } from "@/trpc/server";
import { serverClient } from "@/trpc/serverClient";

export const FollowingTweets: FC<{
    initialTweets: Awaited<ReturnType<(typeof serverClient.tweet.infiniteFeed)>>
}> = ({
    initialTweets
}) => {
    const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
        {onlyFollowing: true},
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