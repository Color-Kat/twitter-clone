import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { serverClient } from "@/trpc/serverClient";

export const dynamic = "force-static";

interface Props {
    params: {
        id: string;
    };
    searchParams: string
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    const user = {
        name: 'TODO'
    }

    return {
        title: user.name,
    }
}

const ProfilePage: NextPage<Props> = async ({params}) => {
    const tweets = await serverClient.tweet.infiniteFeed({});
    console.log(tweets)

    return (
        <>
wqeqwew
        </>
    );
};

export default ProfilePage