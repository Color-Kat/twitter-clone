import {NextPage} from 'next';
import { Tabs } from "@/components/Tabs";
import { NewTweetForm } from "@/components/NewTweetForm";
import React from "react";
import { RecentTweets } from "@/components/RecentTweets";

const ResentTweetsPage: NextPage = ({

}) => {
    
    return (
        <div className="">
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>

                <Tabs
                    current="Recent"
                />

            </header>

            <NewTweetForm/>

            <RecentTweets />
        </div>
    );
};

export default ResentTweetsPage