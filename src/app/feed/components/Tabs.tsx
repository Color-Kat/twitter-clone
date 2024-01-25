import React, { memo, FC, useState } from 'react';
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { getServerAuthSession } from "@/server/auth";

const TABS = [
    "Recent", "Following"
] as const;

export const Tabs: FC<{current: typeof TABS[number]}> = async ({
    current
}) => {

    const session = await getServerAuthSession();

    if (!session) return null;

    return (
        <div className="flex">
            {TABS.map(tab => {
                return (
                    <Link
                        key={tab}
                        href={`/feed/${tab.toLowerCase()}`}
                        className={twJoin(
                            "flex-grow p-2 hover:bg-gray-200 focus-visible:bg-gray-200",
                            tab === current
                                ? "border-b-4 border-b-blue-500 font-bold"
                                : ""
                        )}
                    >
                        {tab}
                    </Link>
                );
            })}
        </div>
    );
};