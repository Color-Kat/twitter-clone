import React, { FC, ReactNode, ComponentProps } from 'react';
import { NewTweetForm } from "@/components/NewTweetForm";
import { Tabs } from "@/app/feed/components/Tabs";

interface TabsProps {
    children: ReactNode;
    current: ComponentProps<typeof Tabs>['current']
}

export const TabsWrapper: FC<TabsProps> = ({current, children}) => {


    return (
        <div className="">
            <header className="sticky top-o z-10 border-b bg-white pt-2">
                <h1 className="mb-2 px-4 text-lg font-bold">Home</h1>

                <Tabs
                    current={current}
                />
            </header>

            <NewTweetForm/>

            {children}
        </div>
    );
};