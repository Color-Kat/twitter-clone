import { NextPage } from 'next';
import { NewTweetForm } from "@/components/NewTweetForm";
import React from "react";
import { Tabs } from "@/components/Tabs";
import { redirect } from "next/navigation";

import RecentTweets from './feed/recent/page';



const Home: NextPage = async ({}) => {


    // redirect('/feed/recent');



    return (
        <>
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>

                <Tabs />

            </header>

            <NewTweetForm/>
        </>
    );
};

// export default Home;
export default RecentTweets;