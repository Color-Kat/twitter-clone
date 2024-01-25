import {NextPage} from 'next';
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";
import { serverClient } from "@/trpc/serverClient";
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";

const ResentTweetsPage: NextPage = async ({}) => {

    // const tweets = await serverApi.tweet.infiniteFeed.query(
    //     {}
    // );

    const tweets = await serverClient.tweet.infiniteFeed(
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