'use client';

import React, {memo, FC, ReactNode} from 'react';
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

interface ProviderProps {
    children: ReactNode;
    session?: Session;
}

export const Provider: FC<ProviderProps> = ({
                                                children,
                                                session
                                            }) => {


    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
};