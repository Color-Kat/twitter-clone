import { Metadata, NextPage, ResolvingMetadata } from 'next';
import { serverClient } from "@/trpc/serverClient";
import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { IconHoverEffect } from "@/components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import { ProfileImage } from "@/components/ProfileImage";
import { InfiniteTweetList } from "@/components/InfiniteTweetList";
import { FollowButton } from "@/components/FollowButton";
import { ProfileTweets } from "@/components/ProfileTweets";

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

const pluralRules = new Intl.PluralRules();

function getPlural(number: number, singular: string, plural: string) {
    return pluralRules.select(number) == "one" ? singular : plural;
}

const ProfilePage: NextPage<Props> = async ({ params }) => {
    const profile = await getProfile(params.id);
    const initialTweets = await serverClient.tweet.infiniteProfileFeed({
        userId: params.id
    });

    if (!profile) return notFound()
    // console.log(profile)

    return (
        <>
            <header className="sticky top-0 z-10 flex items-center border-b bg-white px-4 py-2">
                <Link
                    href=".."
                    className="mr-2"
                >
                    <IconHoverEffect>
                        <VscArrowLeft className="h-6 w-6"/>
                    </IconHoverEffect>
                </Link>

                <ProfileImage
                    className="shrink-0"
                    src={profile.image}
                />

                <div className="ml-2 grow">
                    <h1 className="text-lg font-bold">{profile.name}</h1>
                    <div className="text-gray-500">
                        {profile.tweetsCount}{" "}
                        {getPlural(profile.tweetsCount, "Tweet", "Tweets")}{" - "}

                        {profile.followersCount}{" "}
                        {getPlural(profile.followersCount, "Follower", "Followers")}{" - "}

                        {profile.followsCount}{" "}
                        {"Followings"}
                    </div>

                    <FollowButton
                        isFollowing={profile.isFollowing}
                        userId={params.id}
                        onClick={() => {
                        }}
                    />
                </div>
            </header>

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

export default ProfilePage