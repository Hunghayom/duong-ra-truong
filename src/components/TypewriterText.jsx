import React, { useState, useEffect } from 'react';

export default function TypewriterText({ text }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Tốc độ gõ chữ

        return () => clearInterval(typingInterval);
    }, [text]);

    return <span>{displayedText}</span>;
}