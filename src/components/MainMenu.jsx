import React from 'react';
import { motion } from 'framer-motion';

export default function MainMenu({ onPlay }) {
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center bg-white text-black overflow-hidden" style={{ fontFamily: "'Playpen Sans', cursive" }}>

            {/* Nền chấm bi chuẩn */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 text-center hand-drawn-border p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ clipPath: 'polygon(2% 2%, 98% 4%, 99% 97%, 1% 98%)' }}>
                    Đường Ra Trường
                </h1>
                <p className="text-xl mb-12 text-gray-800 font-semibold bg-white px-4 py-1">Bản lĩnh Công nghệ - Tâm hồn Nghệ thuật</p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onPlay}
                    className="px-12 py-4 text-2xl font-bold bg-white border-[3px] border-black text-black hand-drawn-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                >
                    Vào Trò Chơi
                </motion.button>
            </div>
        </div>
    );
}