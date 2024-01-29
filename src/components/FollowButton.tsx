'use client';

import React, { FC } from 'react';
import { useSession } from "next-auth/react";
import { Button } from "@/UI/Button";

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

    const onClick = () => {
        
    }

    if(session.status === "unauthenticated" || session.data?.user.id == userId)
        return null;

    return (
        <Button
            onClick={onClick}
            small
            gray={isFollowing}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}