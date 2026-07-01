import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 400);
                    return 100;
                }
                // Tốc độ chậm và tự nhiên hơn
                return prev + Math.floor(Math.random() * 8 + 2);
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-6" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            <div className="relative w-96 h-16 flex flex-col items-center">

                {/* Nhân vật thân dày đi bộ PHÍA TRÊN thanh loading */}
                <div
                    className="absolute -top-12 transition-all duration-150 ease-linear"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                >
                    <svg width="45" height="55" viewBox="0 0 45 55" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="22" cy="12" r="8" fill="white" />
                        <path d="M22 20 L22 36" strokeWidth="5" /> {/* Thân dày */}
                        <path d="M22 24 L12 18 M22 24 L32 28" /> {/* Tay */}
                        <path d="M22 36 L14 50 M22 36 L30 50" /> {/* Chân */}
                    </svg>
                </div>

                {/* Thanh Loading to hơn (+30%), bo góc vẽ tay */}
                <div className="w-full h-8 border-[4px] border-black p-1 relative bg-white"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    <div
                        className="h-full bg-black transition-all duration-150 ease-linear"
                        style={{ width: `${progress}%`, borderRadius: '10px' }}
                    ></div>
                </div>

                <p className="mt-6 text-3xl font-bold tracking-widest text-black">Đang tải... {progress}%</p>
            </div>
        </div>
    );
}