'use client';
import React, {memo, FC} from 'react';
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";
import {IconHoverEffect} from "@/app/components/IconHoverEffect";
import {VscAccount, VscHome, VscSignIn, VscSignOut} from "react-icons/vsc";

export const SideNav: FC = ({}) => {
    const {data: session} = useSession();
    const user = session?.user;

    return (
        <nav className="sticky top-0 px-2 py-4">
            <ul className="flex flex-col items-center gap-2 whitespace-normal">
                <li>
                    <Link href="/">
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscHome className="h-8 w-8"/>
                                <span className="hidden md:inline text-lg">
                                    Home
                                </span>
                            </span>
                        </IconHoverEffect>
                    </Link>
                </li>

                {user && <li>
                    <Link href="/">
                        <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscAccount className="h-8 w-8"/>
                                <span className="hidden md:inline text-lg">
                                    Profile
                                </span>
                            </span>
                        </IconHoverEffect>
                    </Link>
                </li>}

                {user ? (
                    <li>
                        <button onClick={() => void signOut()}>
                            <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscSignOut className="h-8 w-8 fill-red-700"/>
                                <span className="hidden md:inline text-lg text-red-700">
                                    Log Out
                                </span>
                            </span>
                            </IconHoverEffect>
                        </button>
                    </li>
                ) : (
                    <li>
                        <button onClick={() => void signIn()}>
                            <IconHoverEffect>
                            <span className="flex items-center gap-4">
                                <VscSignIn className="h-8 w-8 fill-green-700"/>
                                <span className="hidden md:inline text-lg text-green-700">
                                    Log In
                                </span>
                            </span>
                            </IconHoverEffect>
                        </button>
                    </li>
                )}

            </ul>
        </nav>
    );
};