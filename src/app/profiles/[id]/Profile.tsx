'use client';

import React, {FC} from 'react';
import Link from "next/link";
import { IconHoverEffect } from "@/components/IconHoverEffect";
import { VscArrowLeft } from "react-icons/vsc";
import { ProfileImage } from "@/components/ProfileImage";
import { FollowButton } from "@/components/FollowButton";
import { api } from "@/trpc/react";

interface ProfileProps {
    initialProfile: any;
    userId: string;
}

const pluralRules = new Intl.PluralRules();

function getPlural(number: number, singular: string, plural: string) {
    return pluralRules.select(number) == "one" ? singular : plural;
}

export const Profile: FC<ProfileProps> = ({
    initialProfile,
    userId
}) => {
    // Hydrate profile data
    const {data: profile} = api.profile.getById.useQuery(
        {id: userId},
        {
            initialData: initialProfile,
        }
    );

    if(!profile) return null;

    return (
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

            </div>

            <FollowButton
                isFollowing={profile.isFollowing}
                userId={userId}
                // onClick={() => {}}
            />
        </header>
    );
};