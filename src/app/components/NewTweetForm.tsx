'use client';

import React, {memo, FC, useEffect, useRef, useLayoutEffect, useCallback} from 'react';
import {Button} from "@/app/UI/Button";
import {ProfileImage} from "@/app/components/ProfileImage";
import {useSession} from "next-auth/react";

function updateTextAreaSize(textarea?: HTMLTextAreaElement) {
    if(!textarea) return;
    textarea.style.height = "0";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

export const NewTweetForm: FC = memo(({}) => {
    const session = useSession();
    if(session.status !== "authenticated") return null;

    return <Form />;
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

    if(session.status !== "authenticated") return null;

    return (
        <form className="flex flex-col gap-2 border-b px-4 py-2">
            <div className="flex gap-4">
                <ProfileImage src={session.data.user.image} />

                <textarea
                    ref={inputRef}
                    style={{height: 0}}
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