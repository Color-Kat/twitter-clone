import {NextPage} from 'next';
import {NewTweetForm} from "@/app/components/NewTweetForm";
import {RecentTweets} from "@/app/components/RecentTweets";

const Home: NextPage = ({}) => {

    return (
        <>
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>
            </header>

            <NewTweetForm />

            <RecentTweets />
        </>
    );
};

export default Home