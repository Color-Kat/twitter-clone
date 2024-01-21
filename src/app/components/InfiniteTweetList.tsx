import React, {memo, FC} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

type Tweet = {
    id: string,
    content: string,
    createdAt: Date,
    likeCount: number,
    likedByMe: boolean,
    user: {
        id: string,
        image: string | null,
        name: string | null
    };
}

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

    if(isLoading) return <h1>Loading...</h1>;
    if(isError) return <h1>Error...</h1>;

    if(!tweets) return (
        <h2 className="my-4 text-center text-2xl text-gray-500">
            No Tweets
        </h2>
    );

    return (
        <ul className="">
            <InfiniteScroll next={} hasMore={} loader={} dataLength={}>
                
            </InfiniteScroll>
        </ul>
    );
};