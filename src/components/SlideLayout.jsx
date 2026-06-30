import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SlideLayout({ title, text, isTitleSlide, children, onNextSlide, onSkipIntro }) {
    const lines = text ? text.split('\n') : [];
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedChars, setDisplayedChars] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setCurrentLineIndex(0);
        setDisplayedChars(0);
        setIsTyping(true);
    }, [text]);

    useEffect(() => {
        if (isTitleSlide || !isTyping || currentLineIndex >= lines.length) return;

        const currentLine = lines[currentLineIndex];
        const interval = setInterval(() => {
            setDisplayedChars((prev) => {
                if (prev >= currentLine.length) {
                    setIsTyping(false);
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(interval);
    }, [currentLineIndex, isTyping, lines, isTitleSlide]);

    const handleScreenClick = (e) => {
        if (isTitleSlide) return; // Màn hình tiêu đề không cho click bừa để qua màn nữa

        if (isTyping) {
            setDisplayedChars(lines[currentLineIndex].length);
            setIsTyping(false);
        } else {
            if (currentLineIndex < lines.length - 1) {
                setCurrentLineIndex((prev) => prev + 1);
                setDisplayedChars(0);
                setIsTyping(true);
            } else {
                if (onNextSlide) onNextSlide();
            }
        }
    };

    // ==========================================
    // GIAO DIỆN MÀN HÌNH MỞ ĐẦU (ƯU TIÊN WEB)
    // ==========================================
    if (isTitleSlide) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-transparent"
                style={{ fontFamily: "'Playpen Sans', cursive" }}
            >
                {/* Tiêu đề chính giữa */}
                <h1 className="text-7xl md:text-8xl lg:text-[7rem] font-bold text-center drop-shadow-sm mb-12 text-black">
                    {title}
                </h1>

                {/* Nút Bắt đầu lớn */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNextSlide}
                    className="px-14 py-4 text-3xl font-bold bg-white border-4 border-black text-black rounded-[255px_15px_225px_15px/15px_225px_15px_255px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors"
                >
                    Bắt đầu
                </motion.button>

                {/* Nút Skip Intro gạch chân dưới cùng */}
                <button
                    onClick={onSkipIntro}
                    className="absolute bottom-10 text-xl text-gray-500 hover:text-black underline underline-offset-8 decoration-2 font-semibold transition-colors"
                >
                    Skip Intro
                </button>
            </motion.div>
        );
    }

    // ==========================================
    // GIAO DIỆN CÁC SLIDE HỘI THOẠI
    // ==========================================
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            onClick={handleScreenClick}
            className="relative z-10 w-full max-w-4xl flex flex-col items-center h-full justify-center py-12 px-6 cursor-pointer"
            style={{ fontFamily: "'Playpen Sans', cursive" }}
        >
            <div className="flex-1 w-full flex items-center justify-center mb-8">
                <div className="w-[400px] h-[300px] border-4 border-black flex items-center justify-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] overflow-hidden">
                    {children}
                </div>
            </div>

            <div className="w-full bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[180px] relative rounded-[15px_225px_15px_255px/255px_15px_225px_15px]">
                <div className="text-xl md:text-2xl leading-relaxed text-black font-semibold">
                    {lines.slice(0, currentLineIndex).map((line, idx) => (
                        <p key={idx} className="mb-3">{line}</p>
                    ))}
                    {currentLineIndex < lines.length && (
                        <p className="mb-3">
                            {lines[currentLineIndex].substring(0, displayedChars)}
                        </p>
                    )}
                </div>

                {!isTyping && (
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute bottom-4 right-6 text-3xl font-bold text-gray-800"
                    >
                        ▼
                    </motion.div>
                )}
            </div>

            {/* Dòng Skip Intro cho các slide nội dung */}
            <button
                onClick={(e) => { e.stopPropagation(); if (onSkipIntro) onSkipIntro(); }}
                className="absolute bottom-6 right-6 text-lg text-gray-400 hover:text-black underline underline-offset-4 decoration-2 transition-colors z-20"
            >
                Skip Intro
            </button>
        </motion.div>
    );
}