import React, { useState, useEffect } from 'react';
import { fixedEventsYear1 } from '../data/eventsYear1Fixed';
import { randomEventsYear1 } from '../data/eventsYear1Random';

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

export default function GameLevel1({ onLevelComplete }) {
    const [eventQueue, setEventQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState({ tech: 0, art: 0 });
    const [happiness, setHappiness] = useState(10);
    const [step, setStep] = useState('CHOOSING');
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [burnoutAlert, setBurnoutAlert] = useState(false);

    useEffect(() => {
        // Trộn ngẫu nhiên và chuẩn bị hàng đợi
        const combined = [...fixedEventsYear1, ...shuffleArray(randomEventsYear1)];
        setEventQueue(combined);
    }, []);

    if (eventQueue.length === 0) return null;

    // Nếu hết sự kiện mà chưa ai đến đích, tự động trộn lại bể random để chơi tiếp
    const currentEvent = eventQueue[currentIndex % eventQueue.length];
    const currentTurn = currentIndex % 2 === 0 ? 'Nghệ thuật' : 'Công nghệ';

    const handleCardClick = (choice) => {
        let hapChange = 0;
        if (choice.tech < 0 || choice.art < 0) hapChange = -2;
        else if (choice.tech > 0 && choice.art > 0) hapChange = 1;

        let newHap = Math.min(10, happiness + hapChange);

        // HỆ SỐ ĐIỂM MỚI: Tiến cực nhanh (+4), lùi cực nhẹ (-1)
        let boostTech = choice.tech > 0 ? choice.tech * 2 : choice.tech;
        let boostArt = choice.art > 0 ? choice.art * 2 : choice.art;

        let newTech = stats.tech + boostTech;
        let newArt = stats.art + boostArt;
        let isBurnout = false;

        // Luật Kiệt sức: Phạt lùi 3 ô nếu Hạnh phúc = 0
        if (newHap <= 0) {
            isBurnout = true;
            newTech -= 3;
            newArt -= 3;
            newHap = 5;
        }

        setBurnoutAlert(isBurnout);
        setHappiness(newHap);
        setStats({ tech: newTech, art: newArt });
        setSelectedChoice({ ...choice, tech: boostTech, art: boostArt });
        setStep('OUTCOME');
    };

    const handleNextEvent = () => {
        // ĐIỀU KIỆN THẮNG MỚI: Chỉ cần 1 trong 2 chạm đích (ô 20)
        if (stats.tech >= 20 || stats.art >= 20) {
            setStep('LEVEL_COMPLETE');
        } else {
            setCurrentIndex(prev => prev + 1);
            setStep('CHOOSING');
            setSelectedChoice(null);
        }
    };

    const trackStart = -5;
    const trackEnd = 20;
    const trackCells = trackEnd - trackStart + 1;
    const getPosition = (val) => {
        const clampedVal = Math.max(trackStart, Math.min(trackEnd, val));
        return ((clampedVal - trackStart + 0.5) / trackCells) * 100;
    };

    if (step === 'LEVEL_COMPLETE') {
        return (
            <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center p-6" style={{ fontFamily: "'Playpen Sans', cursive" }}>
                <div className="max-w-3xl w-full bg-white border-[4px] border-black p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    <h1 className="text-5xl font-bold mb-4">🎉 Hoàn thành Năm Nhất!</h1>
                    <p className="text-xl text-gray-700 mb-8 font-semibold">Một trong hai nhân vật đã về đích thành công. Vị trí tổng kết:</p>

                    <div className="flex gap-12 text-3xl font-bold mb-10 border-[3px] border-black p-6 bg-gray-50" style={{ borderRadius: '20px' }}>
                        <span className="text-blue-600">⚙️ Công nghệ: {stats.tech}</span>
                        <span>|</span>
                        <span className="text-pink-600">🎨 Nghệ thuật: {stats.art}</span>
                    </div>

                    <button
                        onClick={() => onLevelComplete(stats)}
                        className="px-12 py-4 text-2xl font-bold bg-black text-white hover:bg-gray-800 transition-colors uppercase"
                        style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                    >
                        Sang năm tiếp theo ➔
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white p-4 md:p-8 flex flex-col items-center" style={{ fontFamily: "'Playpen Sans', cursive" }}>

            {/* HUD HEADER */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-12">
                <div className="text-3xl md:text-4xl font-bold border-[3px] border-black px-8 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    Năm nhất
                </div>

                <div className="flex flex-col items-end">
                    <div className="text-xl font-bold mb-1">💖 Hạnh phúc: {happiness}/10</div>
                    <div className="w-56 h-5 border-[3px] border-black p-[2px] bg-white" style={{ borderRadius: '12px' }}>
                        <div className="h-full transition-all duration-300" style={{ width: `${(happiness / 10) * 100}%`, backgroundColor: happiness > 4 ? '#ec4899' : '#ef4444', borderRadius: '6px' }}></div>
                    </div>
                </div>
            </div>

            {/* TRỤC ĐƯỜNG BẢN ĐỒ */}
            <div className="w-full max-w-6xl relative mb-20 mt-8">
                <div className="flex w-full h-14 border-y-[3px] border-r-[3px] border-black bg-white">
                    {[...Array(trackCells)].map((_, i) => {
                        const cellValue = trackStart + i;
                        const isZero = cellValue === 0;
                        return (
                            <div key={i} className={`flex-1 border-l-[3px] border-black h-full flex flex-col items-center justify-center relative ${isZero ? 'bg-red-200' : ''}`}>
                                {isZero && <span className="absolute -top-7 text-xs font-bold text-red-600 uppercase tracking-tighter whitespace-nowrap">Bắt đầu năm học</span>}
                                {(cellValue === 0 || cellValue === 10 || cellValue === 20 || cellValue === -5) && (
                                    <span className="absolute -bottom-7 text-sm font-bold text-black">{cellValue}</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* BIỂU TƯỢNG NGÔI TRƯỜNG Ở ĐÍCH */}
                <div className="absolute -top-16 right-0 translate-x-1/2 flex flex-col items-center">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M30 8 L5 22 L55 22 Z" fill="#fef08a" /> {/* Mái trường */}
                        <rect x="10" y="22" width="40" height="30" fill="white" /> {/* Thân trường */}
                        <rect x="24" y="36" width="12" height="16" fill="#93c5fd" /> {/* Cửa */}
                        <path d="M30 4 L30 8" /> {/* Cột cờ */}
                    </svg>
                    <span className="text-xs font-bold bg-black text-white px-1 mt-1 rounded">ĐHCN</span>
                </div>

                {/* NHÂN VẬT NGHỆ THUẬT (Đầu Tròn - Thân dày) */}
                <div className="absolute bottom-14 transition-all duration-500 ease-out" style={{ left: `${getPosition(stats.art)}%`, transform: 'translateX(-50%)', zIndex: currentTurn === 'Nghệ thuật' ? 20 : 10 }}>
                    {currentTurn === 'Nghệ thuật' && step === 'CHOOSING' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl font-bold animate-bounce text-pink-600">▼</div>}
                    <svg width="45" height="55" viewBox="0 0 45 55" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round">
                        {/* Đầu đổi màu hồng nếu đến lượt */}
                        <circle cx="22" cy="15" r="9" fill={currentTurn === 'Nghệ thuật' ? '#f472b6' : 'white'} />
                        <path d="M22 24 L22 38" strokeWidth="5" />
                        <path d="M22 26 L12 21 M22 26 L32 31 M22 38 L14 51 M22 38 L30 51" />
                    </svg>
                </div>

                {/* NHÂN VẬT CÔNG NGHỆ (Đầu Vuông - Thân dày) */}
                <div className="absolute bottom-14 transition-all duration-500 ease-out ml-5" style={{ left: `${getPosition(stats.tech)}%`, transform: 'translateX(-50%)', zIndex: currentTurn === 'Công nghệ' ? 20 : 10 }}>
                    {currentTurn === 'Công nghệ' && step === 'CHOOSING' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-3xl font-bold animate-bounce text-blue-600">▼</div>}
                    <svg width="45" height="55" viewBox="0 0 45 55" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        {/* Đầu đổi màu xanh dương nếu đến lượt */}
                        <rect x="13" y="6" width="18" height="18" fill={currentTurn === 'Công nghệ' ? '#60a5fa' : 'black'} />
                        <path d="M22 24 L22 38" strokeWidth="5" />
                        <path d="M22 26 L12 31 M22 26 L32 21 M22 38 L14 51 M22 38 L30 51" />
                    </svg>
                </div>
            </div>

            {/* KHUNG SỰ KIỆN THẺ BÀI */}
            <div className="w-full max-w-6xl border-[3px] border-black p-8 relative mt-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>

                <div className="absolute -top-6 left-10 bg-white border-[3px] border-black px-6 py-2 text-xl font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    Lượt của: <span className={currentTurn === 'Nghệ thuật' ? 'text-pink-600' : 'text-blue-600'}>{currentTurn}</span>
                </div>

                {step === 'CHOOSING' ? (
                    <div className="flex flex-col items-center mt-4">
                        <div className="text-center mb-8 max-w-4xl">
                            <h2 className="text-3xl font-bold mb-3">✦ {currentEvent.title} ✦</h2>
                            <p className="text-xl text-gray-800 font-medium">{currentEvent.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {currentEvent.choices.map((choice) => (
                                <div
                                    key={choice.id}
                                    onClick={() => handleCardClick(choice)}
                                    className="bg-white border-[3px] border-black p-6 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform hover:-translate-y-1 h-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                    style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}
                                >
                                    <h3 className="text-2xl font-bold mb-3 border-b-2 border-black border-dashed pb-2">{choice.title}</h3>
                                    <p className="text-lg flex-1 text-gray-800 font-medium">{choice.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center mt-2 py-6">
                        {burnoutAlert ? (
                            <div className="mb-6 p-4 border-[3px] border-red-500 bg-red-100 text-red-700 font-bold max-w-2xl text-xl" style={{ borderRadius: '15px' }}>
                                ⚠️ KIỆT SỨC (BURNOUT)! Hạnh phúc chạm đáy 0. Cả 2 chỉ số bị phạt lùi 3 ô!
                            </div>
                        ) : (
                            <h2 className="text-3xl font-bold mb-4">Kết quả</h2>
                        )}

                        <p className="text-2xl mb-8 leading-relaxed font-semibold max-w-3xl">{selectedChoice.outcome}</p>

                        <div className="flex gap-12 mb-8 text-3xl font-bold">
                            <span className={selectedChoice.tech > 0 ? 'text-blue-600' : 'text-red-500'}>
                                Tech {selectedChoice.tech > 0 ? `+${selectedChoice.tech}` : selectedChoice.tech}
                            </span>
                            <span className={selectedChoice.art > 0 ? 'text-pink-600' : 'text-red-500'}>
                                Art {selectedChoice.art > 0 ? `+${selectedChoice.art}` : selectedChoice.art}
                            </span>
                        </div>

                        <button
                            onClick={handleNextEvent}
                            className="px-12 py-3 text-xl font-bold border-[3px] border-black bg-white hover:bg-black hover:text-white transition-colors uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                        >
                            Tiếp tục ➔
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}