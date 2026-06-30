import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SlideLayout({ title, text, isTitleSlide, children, onNextSlide }) {
    // Tách đoạn text thành một mảng các dòng dựa trên \n
    const lines = text ? text.split('\n') : [];

    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedChars, setDisplayedChars] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    // Reset trạng thái mỗi khi chuyển slide (text thay đổi)
    useEffect(() => {
        setCurrentLineIndex(0);
        setDisplayedChars(0);
        setIsTyping(true);
    }, [text]);

    // Logic gõ từng chữ cho dòng hiện tại
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
        }, 30); // Tốc độ gõ chữ

        return () => clearInterval(interval);
    }, [currentLineIndex, isTyping, lines, isTitleSlide]);

    // Xử lý khi người dùng Click vào màn hình
    const handleScreenClick = () => {
        // Nếu là màn hình tiêu đề, click phát qua slide luôn
        if (isTitleSlide) {
            if (onNextSlide) onNextSlide();
            return;
        }

        if (isTyping) {
            // Đang gõ dở -> Bấm click để hiện toàn bộ dòng hiện tại
            setDisplayedChars(lines[currentLineIndex].length);
            setIsTyping(false);
        } else {
            // Đã gõ xong dòng hiện tại
            if (currentLineIndex < lines.length - 1) {
                // Nếu chưa hết dòng -> Xuống dòng tiếp theo
                setCurrentLineIndex((prev) => prev + 1);
                setDisplayedChars(0);
                setIsTyping(true);
            } else {
                // Đã hết toàn bộ các dòng -> Chuyển sang slide tiếp theo
                if (onNextSlide) onNextSlide();
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            // Gắn sự kiện click vào toàn bộ màn hình của Layout này
            onClick={handleScreenClick}
            className="relative z-10 w-full max-w-2xl flex flex-col items-center h-full justify-between py-12 px-6 cursor-pointer"
        >
            {/* KHU VỰC HÌNH ẢNH */}
            <div className="flex-1 w-full flex items-center justify-center">
                {isTitleSlide ? (
                    <h1 className="text-5xl md:text-7xl font-bold text-center drop-shadow-md"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}>
                        {title}
                    </h1>
                ) : (
                    <div className="w-64 h-64 border-4 border-black flex items-center justify-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] overflow-hidden">
                        {children}
                    </div>
                )}
            </div>

            {/* KHU VỰC HỘP THOẠI */}
            {!isTitleSlide && (
                <div className="w-full bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[160px] relative rounded-[15px_225px_15px_255px/255px_15px_225px_15px]">
                    <div className="text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Comic Neue', sans-serif" }}>

                        {/* Hiển thị các dòng ĐÃ gõ xong trước đó */}
                        {lines.slice(0, currentLineIndex).map((line, idx) => (
                            <p key={idx} className="mb-2">{line}</p>
                        ))}

                        {/* Hiển thị dòng ĐANG gõ */}
                        {currentLineIndex < lines.length && (
                            <p className="mb-2">
                                {lines[currentLineIndex].substring(0, displayedChars)}
                            </p>
                        )}

                    </div>

                    {/* Mũi tên nhấp nháy báo hiệu đã gõ xong dòng/slide */}
                    {!isTyping && (
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="absolute bottom-3 right-4 text-2xl font-bold text-gray-800"
                        >
                            ▼
                        </motion.div>
                    )}
                </div>
            )}

            {isTitleSlide && (
                <div className="mt-8 mb-20 text-xl md:text-2xl font-bold border-b-4 border-black pb-1 hover:text-gray-600 transition-colors uppercase tracking-widest animate-pulse">
                    Chạm để bắt đầu
                </div>
            )}
        </motion.div>
    );
}