import {NextPage} from 'next';
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { unstable_noStore as noStore } from "next/cache";
import { serverApi } from "@/trpc/server";
import { serverClient } from "@/trpc/serverClient";

const ResentTweetsPage: NextPage = async ({}) => {
    // const tweets = await serverApi.tweet.infiniteFeed.query(
    //     {},
    // );

    const tweets = await serverClient.tweet.infiniteFeed({
        onlyFollowing: true
    });

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