import React, {memo, FC} from 'react';
// import {api} from "@/trpc/react";
// import {InfiniteTweetList} from "@/components/InfiniteTweetList";

export const RecentTweets: FC = ({}) => {
    return <div>coool</div>

    // const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    //     {},
    //     {getNextPageParam: lastPage => lastPage.nextCursor}
    // );
    //
    // return (
    //     <InfiniteTweetList
    //         tweets={
    //             tweets.data?.pages.flatMap(page => page.tweets)
    //         }
    //         isError={tweets.isError}
    //         isLoading={tweets.isLoading}
    //         hasMore={Boolean(tweets.hasNextPage)}
    //         fetchNewTweets={tweets.fetchNextPage}
    //     />
    // );
};