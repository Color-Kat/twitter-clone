import React, { memo, FC } from 'react';
import { Tweet } from "@/app/types/Tweet";
import Link from "next/link";
import Image from "next/image";
import { ProfileImage } from "@/app/components/ProfileImage";
import { HeartButton } from "@/app/components/HeartButton";
import { api } from "@/trpc/react";

const dateTimeFormatter = Intl.DateTimeFormat('en-US', {
    dateStyle: "short"
});

export const TweetCard: FC<Tweet> = ({
    id,
    user,
    content,
    createdAt,
    likeCount,
    likedByMe
}) => {
    const trpcUtils = api.useContext();

    const toggleLike = api.tweet.toggleLike.useMutation({
        onSuccess: async ({addedLike}) => {
            await trpcUtils.tweet.infiniteFeed.invalidate();
        }
    });

    const handleToggleLike = () => {
        toggleLike.mutate({ id });
    }


    return (
        <li className="flex gap-4 border-b px-4 py-4">
            {/* Profile Image */}
            <Link href={`/profiles/${user.id}`}>
                <ProfileImage src={user.image}/>
            </Link>

            <div className="flex flex-grow flex-col">
                {/* User info */}
                <div className="flex gap-1">
                    {/* User name*/}
                    <Link
                        href={`/prifiles/${user.id}`}
                        className="font-bold hover:underline focus-visible:underline outline-none"
                    >
                        {user.name}
                    </Link>

                    <span className="text-gray-500">-</span>
                    <span className="text-gray-500">{dateTimeFormatter.format(createdAt)}</span>

                </div>

                {/* Content */}
                <p className="whitespace-pre-wrap">
                    {content}
                </p>

                <HeartButton
                    likedByMe={likedByMe}
                    likeCount={likeCount}
                    onClick={handleToggleLike}
                    isLoading={toggleLike.isLoading}
                />
            </div>
        </li>
    );
};