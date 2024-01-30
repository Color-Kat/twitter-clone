import {NextPage} from 'next';
import React from "react";
import { RecentTweets } from "@/app/feed/recent/RecentTweets";
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { serverClient } from "@/trpc/serverClient";

const ResentTweetsPage: NextPage = async ({}) => {
    // const tweets = await serverApi.tweet.infiniteFeed.query(
    //     {},
    // );

    const tweets = await serverClient.tweet.infiniteFeed({});


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