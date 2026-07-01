import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 400); // Đợi 0.4s để nhìn rõ 100% rồi mới chuyển
                    return 100;
                }
                // Nhịp tăng chậm và ngẫu nhiên để giống thật
                return prev + Math.floor(Math.random() * 8 + 2);
            });
        }, 250);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            {/* Tăng kích thước tổng thể lên (w-96, h-10) */}
            <div className="relative w-96 flex flex-col items-center mt-10">

                {/* Nhân vật di chuyển TRÊN NÓC thanh loading */}
                <div
                    className="absolute bottom-full mb-1 transition-all duration-200 ease-linear"
                    style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                >
                    <svg width="40" height="50" viewBox="0 0 30 40" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="15" cy="10" r="5" />
                        <path d="M15 15 L15 25 M15 18 L5 15 M15 18 L25 22 M15 25 L10 35 M15 25 L20 35" />
                    </svg>
                </div>

                {/* Thanh Loading */}
                <div className="w-full h-8 border-[3px] border-black p-[2px] relative overflow-hidden" style={{ borderRadius: '6px 8px 5px 6px/8px 5px 6px 8px' }}>
                    {/* Lớp đổ màu xám đen, chạy đồng bộ với nhân vật */}
                    <div
                        className="h-full bg-gray-800 transition-all duration-200 ease-linear"
                        style={{ width: `${progress}%`, borderRadius: '3px' }}
                    ></div>
                </div>

                <p className="mt-8 text-3xl font-bold tracking-widest text-gray-800">Đang tải {progress}%</p>
            </div>
        </div>
    );
}