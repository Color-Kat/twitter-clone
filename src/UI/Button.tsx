import React, {memo, FC, ButtonHTMLAttributes} from 'react';
import {twMerge} from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    small?: boolean;
    gray?: boolean;
    className?: string;
}

export const Button: FC<ButtonProps> = memo(({
                                                 small,
                                                 gray,
                                                 className,
                                                 ...props
                                             }) => {
    const sizeClasses = small ? "px-2 py-1" : "px-4 py-2 font-bold";
    const grayClasses = gray
        ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300"
        : "bg-blue-500 hover:bg-blue-400 focus-visible:bg-blue-400"


    return (
        <button
            className={twMerge(
                "rounded-full tracking-colors duration-200 disabled:cursor-not-allowed disable:opacity-50",
                "text-white",
                sizeClasses,
                grayClasses,
                className
            )}
            {...props}
        >

        </button>
    );
});