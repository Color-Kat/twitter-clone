import {NextPage} from 'next';
import { Tabs } from "@/components/Tabs";
import { NewTweetForm } from "@/components/NewTweetForm";
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";
import { serverApi } from "@/trpc/server";
import { serverClient } from "@/trpc/serverClient";

const ResentTweetsPage: NextPage = async ({

}) => {

    const tweets = await serverApi.tweet.infiniteFeed.query(
        {},
        {}
    );

    console.log(tweets)

    // const tweet2 = await serverClient.tweet.infiniteFeed(
    //     {},
    // );
    
    return (
        <div className="">
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>

                <Tabs
                    current="Recent"
                />

            </header>

            <NewTweetForm/>

            <RecentTweets
                initialTweets={tweets}
            />
        </div>
    );
};

export default ResentTweetsPage