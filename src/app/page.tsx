// 'use client';

import { NextPage } from 'next';
import { NewTweetForm } from "@/app/components/NewTweetForm";
import { RecentTweets } from "@/app/components/RecentTweets";
import { useSession } from "next-auth/react";
import React from "react";
import { twJoin } from "tailwind-merge";
import { FollowingTweets } from "@/app/components/FollowingTweets";
import { getServerAuthSession } from "@/server/auth";

const TABS = [
    "Recent", "Following"
] as const;

const Home: NextPage = async ({}) => {

    // const session = useSession();

    const session = await getServerAuthSession();
    console.log(session)


    // const [selectedTab, setSelectedTab] = useState<
    //     typeof TABS[number]
    // >("Recent");

    return null;

    return (
        <>
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>

                {session && <div className="flex">
                    {/*{TABS.map(tab => {*/}
                    {/*    return (*/}
                    {/*        <button*/}
                    {/*            key={tab}*/}
                    {/*            className={twJoin(*/}
                    {/*                "flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200",*/}
                    {/*                tab === selectedTab*/}
                    {/*                    ? "border-b-4 border-b-blue-500 font-bold"*/}
                    {/*                    : ""*/}
                    {/*            )}*/}
                    {/*            onClick={() => setSelectedTab(tab)}*/}
                    {/*        >*/}
                    {/*            {tab}*/}
                    {/*        </button>*/}
                    {/*    );*/}
                    {/*})}*/}
                </div>}
            </header>
            <div>213123</div>

            <NewTweetForm/>

            {/*{selectedTab == "Recent" ? */}
            213231
                {/*<RecentTweets/>*/}
                 {/*: <FollowingTweets/>}*/}
        </>
    );
};

export default Home