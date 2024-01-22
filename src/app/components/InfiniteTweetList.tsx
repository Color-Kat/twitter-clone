import React, {memo, FC} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {Tweet} from "@/app/types/Tweet";
import {TweetCard} from "@/app/components/TweetCard";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

interface InfiniteTweetListProps {
    tweets?: Tweet[];
    fetchNewTweets: () => Promise<unknown>;
    isError: boolean;
    isLoading: boolean;
    hasMore: boolean;
}

export const InfiniteTweetList: FC<InfiniteTweetListProps> = ({
                                                                  tweets,
                                                                  fetchNewTweets,
                                                                  isError,
                                                                  isLoading,
                                                                  hasMore
                                                              }) => {

    if(isLoading) return <LoadingSpinner />;
    if(isError) return <h1>Error...</h1>;

    console.log(tweets)

    if(!tweets || !tweets.length) return (
        <h2 className="my-4 text-center text-2xl text-gray-500">
            No Tweets
        </h2>
    );

    return (
        <ul className="">
            <InfiniteScroll
                next={fetchNewTweets}
                hasMore={hasMore}
                loader={<LoadingSpinner />}
                dataLength={tweets.length}
            >
                {tweets.map(tweet => {
                    return <TweetCard
                        key={tweet.id}
                        {...tweet}
                    />;
                })}
            </InfiniteScroll>
        </ul>
    );
};