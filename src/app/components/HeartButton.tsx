'use client';

import React, { memo, FC } from 'react';
import { useSession } from "next-auth/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { twJoin } from "tailwind-merge";
import { IconHoverEffect } from "@/app/components/IconHoverEffect";

interface HeartButtonProps {
    likedByMe: boolean;
    likeCount: number;
    onClick: () => void;
    isLoading: boolean;
}

export const HeartButton: FC<HeartButtonProps> = memo(({
    likedByMe,
    likeCount,
    onClick,
    isLoading
}) => {
    const session = useSession();
    const HeartIcon = likedByMe
        ? VscHeartFilled
        : VscHeart

    if (session.status !== 'authenticated') return (
        <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
            <HeartIcon/>
            <span>{likeCount}</span>
        </div>
    );

    return (
        <button
            disabled={isLoading}
            onClick={onClick}
            className={twJoin(
                "group items-center gap-1 self-start flex transition-colors duration-200 -ml-2",
                likedByMe
                    ? "text-red-500"
                    : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
            )}
        >
            <IconHoverEffect red>
                <HeartIcon className={twJoin(
                    "transition-colors duration-200",
                    likedByMe
                        ? "fill-red-500"
                        : "group-hover:fill-red-500 fill-gray-500 group-focus-visible:fill-red-500"
                )}/>
            </IconHoverEffect>

            <span>
                {likeCount}
            </span>
        </button>
    );
});