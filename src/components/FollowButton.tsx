import React, { memo, FC } from 'react';

interface FollowButtonProps {
    isFollowing: boolean;
    userId: string;
    onClick: () => void;
}

export const FollowButton: FC<FollowButtonProps> = ({}) => {


    return (
        <div className="">
            Follow
        </div>
    );
}