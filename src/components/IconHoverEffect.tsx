import React, {memo, FC, ReactNode} from 'react';
import {twJoin} from "tailwind-merge";

interface IconHoverEffectProps {
    children: ReactNode;
    red?: boolean
}

export const IconHoverEffect: FC<IconHoverEffectProps> = ({
                                                              children,
                                                              red = false
                                                          }) => {

    const colorClasses = red
        ? "outline-red-500 hover:bg-red-200 group-hover:bg-red-200 group-focus-visible:bg-red-200 focus-visible:bg-red-200"
        : "outline-gray-500 hover:bg-gray-200 group-hover:bg-gray-200 group-focus-visible:bg-gray-200 focus-visible:bg-gray-200";

    return (
        <div className={twJoin(
            "rounded-full p-2 transition-colors duration-200",
            colorClasses
        )}>
            {children}
        </div>
    );
};