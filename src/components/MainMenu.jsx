import React from 'react';
import { motion } from 'framer-motion';

export default function MainMenu({ onPlay }) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-center hand-drawn-border p-8 bg-white"
                style={{ clipPath: 'polygon(2% 2%, 98% 4%, 99% 97%, 1% 98%)' }}>
                Đường Ra Trường
            </h1>
            <p className="text-xl mb-12 text-gray-600 font-semibold">Trò chơi mô phỏng hành trình ra trường của một bạn sinh viên công nghệ yêu nghệ thuật</p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPlay}
                className="px-12 py-4 text-2xl font-bold bg-white border-[3px] border-black text-black hand-drawn-border"
                style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
            >
                Vào Trò Chơi
            </motion.button>
        </div>
    );
}