'use client';

import React, { FC } from 'react';
import { useSession } from "next-auth/react";
import { Button } from "@/UI/Button";
import { api } from "@/trpc/react";

interface FollowButtonProps {
    isFollowing: boolean;
    userId: string;
    // onClick: () => void;
}

export const FollowButton: FC<FollowButtonProps> = ({
    isFollowing,
    userId,
    // onClick
}) => {
    const session = useSession();
    const toggleFollow = api.profile.toggleFollow.useMutation({
        onSuccess: ({addedFollow}) => {

        }
    })

    const onClick = () => {
        toggleFollow.mutate({
            userId
        });
    }

    if(session.status === "unauthenticated" || session.data?.user.id == userId)
        return null;

    return (
        <Button
            onClick={onClick}
            small
            gray={isFollowing}
            disabled={toggleFollow.isLoading}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}