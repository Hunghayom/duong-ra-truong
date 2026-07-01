import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 300); // Chuyển màn sau khi đầy 100%
                    return 100;
                }
                return prev + Math.floor(Math.random() * 15 + 5);
            });
        }, 200);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            <div className="relative w-64 h-12 flex flex-col items-center">
                {/* Nhân vật di chuyển trên thanh tiến trình */}
                <div
                    className="absolute bottom-8 transition-all duration-200 ease-linear"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                >
                    {/* Vẽ nhân vật stickman đơn giản */}
                    <svg width="30" height="40" viewBox="0 0 30 40" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round">
                        <circle cx="15" cy="10" r="5" /> {/* Đầu tròn */}
                        <path d="M15 15 L15 25 M15 18 L5 15 M15 18 L25 22 M15 25 L10 35 M15 25 L20 35" /> {/* Thân và chi */}
                    </svg>
                </div>

                {/* Thanh Loading vẽ tay */}
                <div className="w-full h-4 border-[3px] border-black p-[2px] relative overflow-hidden" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    <div
                        className="h-full bg-black transition-all duration-200 ease-linear"
                        style={{ width: `${progress}%`, borderRadius: '15px' }}
                    ></div>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-widest text-gray-700">Loading {progress}%</p>
            </div>
        </div>
    );
}