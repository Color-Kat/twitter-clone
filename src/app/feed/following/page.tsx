import {NextPage} from 'next';
import { TabsWrapper } from "@/app/feed/components/TabsWrapper";
import { FollowingTweets } from "@/components/FollowingTweets";
import { serverClient } from "@/trpc/serverClient";

const FollowingTweetsPage: NextPage = async ({}) => {
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