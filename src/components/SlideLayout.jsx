import React from 'react';
import { motion } from 'framer-motion';
import TypewriterText from './TypewriterText';

export default function SlideLayout({ title, text, isTitleSlide, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-2xl flex flex-col items-center h-full justify-between py-12 px-6"
        >
            {/* KHU VỰC CHỨA HÌNH ẢNH (Phần children sẽ được truyền từ các file Slide riêng) */}
            <div className="flex-1 w-full flex items-center justify-center">
                {isTitleSlide ? (
                    <h1 className="text-5xl md:text-7xl font-bold text-center drop-shadow-md"
                        style={{ fontFamily: "'Patrick Hand', cursive" }}>
                        {title}
                    </h1>
                ) : (
                    // Khung viền vẽ tay chứa ảnh
                    <div className="w-64 h-64 border-4 border-black flex items-center justify-center bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[255px_15px_225px_15px/15px_225px_15px_255px] overflow-hidden">
                        {children}
                    </div>
                )}
            </div>

            {/* KHU VỰC HỘP THOẠI (Chỉ hiện nếu không phải Title Slide) */}
            {!isTitleSlide && (
                <div className="w-full bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[140px] relative rounded-[15px_225px_15px_255px/255px_15px_225px_15px]">
                    <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Comic Neue', sans-serif" }}>
                        <TypewriterText text={text} />
                    </p>

                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute bottom-3 right-4 text-2xl font-bold text-gray-500"
                    >
                        ▼
                    </motion.div>
                </div>
            )}

            {/* Nút bấm cho Title Slide */}
            {isTitleSlide && (
                <div className="mt-8 mb-20 text-xl md:text-2xl font-bold border-b-4 border-black pb-1 hover:text-gray-600 transition-colors uppercase tracking-widest animate-pulse">
                    Chạm để bắt đầu
                </div>
            )}
        </motion.div>
    );
}