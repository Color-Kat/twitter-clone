'use client';

import React, { memo, FC, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { Button } from "@/UI/Button";
import { ProfileImage } from "@/components/ProfileImage";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { Tweet } from "@/types/Tweet";

function updateTextAreaSize(textarea?: HTMLTextAreaElement) {
    if (!textarea) return;
    textarea.style.height = "0";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export const NewTweetForm: FC = memo(({}) => {
    const session = useSession();
    if (session.status !== "authenticated") return null;

    return <Form/>;
});


const Form: FC = ({}) => {
    const session = useSession();
    const [inputValue, setInputValue] = React.useState<string>("");
    const textAreaRef = useRef<HTMLTextAreaElement>();

    // When textarea is rendered this callback ref will be called
    // Inside it, call updateTextAreaSize and set the real textarea ref
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea;
    }, []);

    useLayoutEffect(() => {
        updateTextAreaSize(textAreaRef.current);
    }, [inputValue]);

    const trpcUtils = api.useContext()

    const createTweet = api.tweet.create.useMutation({
        onSuccess: newTweet => {
            setInputValue("");

            if(session.status !== "authenticated") return;

            trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
                if(oldData == null || oldData.pages[0] == null) return;

                const newCacheTweet = {
                    ...newTweet,
                    likeCount: 0,
                    likedByMe: false,
                    user: {
                        id: session.data.user.id,
                        name: session.data.user.name,
                        image: session.data.user.image
                    }
                } as Tweet;

                return {
                    ...oldData,
                    pages: [
                        {
                            ...oldData.pages[0],
                            tweets: [
                                newCacheTweet,
                                ...oldData.pages[0].tweets
                            ]
                        },
                        ...oldData.pages.slice(1)
                    ]
                }
            });
        }
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        createTweet.mutate({
            content: inputValue
        });
    }

    if (session.status !== "authenticated") return null;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image}/>

                <textarea
                    ref={inputRef}
                    style={{ height: 0 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
                    placeholder="What's happening?"
                ></textarea>
            </div>

            <Button className="self-end">
                Tweet
            </Button>
        </form>
    );
};