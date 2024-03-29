import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { serverClient } from "@/trpc/serverClient";
import { cache } from "react";
import { notFound } from "next/navigation";
import { ProfileTweets } from "@/components/ProfileTweets";
import { Profile } from "@/app/profiles/[id]/Profile";

export const dynamic = "force-static";
export const dynamicParams = true

interface Props {
    params: {
        id: string;
    };
    searchParams: string
}

const getProfile = cache(async (id: string) => {
    return await serverClient.profile.getById({
        id
    });
});

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const profile = await getProfile(params.id);

    if (!profile) return {
        title: 'Profile Not Found'
    }

    return {
        title: profile.name,
        description: `Awesome profile of cool person - ${profile.name}`
    }
}

const ProfilePage: NextPage<Props> = async ({ params }) => {
    const initialProfile = await getProfile(params.id);
    const initialTweets = await serverClient.tweet.infiniteProfileFeed({
        userId: params.id
    });

    if (!initialProfile) return notFound()

    return (
        <>
            <Profile
                initialProfile={initialProfile}
                userId={params.id}
            />

            <main className="">
                <ProfileTweets
                    userId={params.id}
                    initialTweets={initialTweets}
                />
            </main>
        </>
    );
};

export async function generateStaticParams() {
    const profileIds = await serverClient.profile.getAllProfileIds();

    // I think that it's not so good to prerender tons of profiles,
    // But let's do it for practice
    return profileIds;
}

export default ProfilePage;