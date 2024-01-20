import React, {memo, FC} from 'react';
import {twMerge} from "tailwind-merge";
import Image from "next/image";

interface ProfileImageProps {
    src?: string | null;
    className?: string;
}

export const ProfileImage: FC<ProfileImageProps> = ({
    src,
    className
                                                    }) => {
    
    
    return (
        <div className={twMerge(
            "relative h-12 w-12 overflow-hidden rounded-full",
            className
        )}>
            {src == null
                ? null
                : <Image
                    src={src}
                    alt="Profile Image"
                    quality={100}
                    fill
                />
            }
        </div>
    );
};