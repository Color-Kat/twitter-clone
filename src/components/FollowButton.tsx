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

    const trpcUtils = api.useUtils();
    const toggleFollow = api.profile.toggleFollow.useMutation({
        onSuccess: ({addedFollow}) => {
            console.log(1312)
            trpcUtils.profile.getById.setData(
                {id: userId},
                (prev) => {
                    if(!prev) return;

                    const countModifier = addedFollow ? 1 : -1;
                    console.log('here', addedFollow);
                    return {
                        ...prev,
                        isFollowing: addedFollow,
                        followersCount: prev.followersCount + countModifier
                    }
                }
            )
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