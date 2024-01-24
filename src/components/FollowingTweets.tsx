'use client';

import React, {memo, FC} from 'react';
import {api} from "@/trpc/react";
import {InfiniteTweetList} from "@/components/InfiniteTweetList";

export const FollowingTweets: FC = memo(({}) => {
    const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
        {onlyFollowing: true},
        {getNextPageParam: lastPage => lastPage.nextCursor}
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
});