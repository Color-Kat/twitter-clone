import {NextPage} from 'next';
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { FollowingTweets } from "@/components/FollowingTweets";
import { serverClient } from "@/trpc/serverClient";
import { serverApi } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";

const FollowingTweetsPage: NextPage = async ({}) => {
    // noStore();
    // const tweets = await serverApi.tweet.infiniteFeed.query({
    //     onlyFollowing: true
    // });

    const tweets = await serverClient.tweet.infiniteFeed({
        onlyFollowing: true
    });

    
    return (
        <TabsWrapper
            current="Following"
        >
            <FollowingTweets
                initialTweets={tweets}
            />
        </TabsWrapper>
    );
};

export default FollowingTweetsPage