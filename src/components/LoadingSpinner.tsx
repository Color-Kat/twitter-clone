import React, {memo, FC} from 'react';
import { VscRefresh } from "react-icons/vsc";
import { twJoin } from "tailwind-merge";

export const LoadingSpinner: FC<{big?: boolean}> = memo(({big = false}) => {
    const sizeClasses = big ? "w-16 h-16" : "w-10 h-10";
    
    return (
        <div className="flex justify-center p-2 h-8">
            <VscRefresh className={twJoin(
                sizeClasses,
                "animate-spin"
            )}/>
        </div>
    );
});