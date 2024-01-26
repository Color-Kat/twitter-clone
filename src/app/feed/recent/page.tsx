import {NextPage} from 'next';
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { unstable_noStore as noStore } from "next/cache";
import { serverApi } from "@/trpc/server";
import { trpcNext } from "@/trpc/trpcNext";

const ResentTweetsPage: NextPage = async ({}) => {
    noStore();

    const tweets1 = await trpcNext.tweet.infiniteFeed.useInfiniteQuery({});
    console.log(tweets1)

    // const tweets = await serverApi.tweet.infiniteFeed.query(
    //     {}
    // );

    const tweets = await serverApi.tweet.infiniteFeed.query(
        {},
    );

    return (
        <TabsWrapper
            current="Recent"
        >
            <RecentTweets
                initialTweets={tweets}
            />
        </TabsWrapper>
    );
};

export default ResentTweetsPage