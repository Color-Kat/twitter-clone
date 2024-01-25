import {NextPage} from 'next';
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";
import { serverClient } from "@/trpc/serverClient";
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { unstable_noStore as noStore } from "next/cache";
import { serverApi } from "@/trpc/server";

const ResentTweetsPage: NextPage = async ({}) => {
    noStore();

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