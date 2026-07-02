import React, { useState, useEffect, useRef } from 'react';
import { fixedEventsYear1 } from '../data/eventsYear1Fixed';
import { randomEventsYear1 } from '../data/eventsYear1Random';

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

const HandDrawnHeart = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
);
const HandDrawnStar = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 mb-1"><path d="M12 3l2.5 6.5 7 .5-5 5 1.5 7-6-3.5-6 3.5 1.5-7-5-5 7-.5z" /></svg>
);

export default function GameLevel1({ onLevelComplete, bgmVolume, sfxVolume }) {
    const [eventQueue, setEventQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stats, setStats] = useState({ tech: 0, art: 0 });
    const [happiness, setHappiness] = useState(10);
    const [step, setStep] = useState('CHOOSING');
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [burnoutAlert, setBurnoutAlert] = useState(false);

    const bgmRef = useRef(null);
    const timeoutRef = useRef(null);

    const playSound = (soundName) => {
        try {
            const audio = new Audio(`/${soundName}.mp3`);
            audio.volume = sfxVolume;
            audio.play().catch(e => console.log("Lỗi phát SFX:", e));
        } catch (error) { }
    };

    useEffect(() => {
        const bgm = new Audio('/year1backgroundmusic.mp3');
        bgmRef.current = bgm;
        const playBGM = () => { bgm.play().catch(e => console.log("Trình duyệt chặn autoplay:", e)); };
        const handleEnded = () => { timeoutRef.current = setTimeout(playBGM, Math.floor(Math.random() * 2000) + 3000); };
        bgm.addEventListener('ended', handleEnded);
        playBGM();
        return () => { bgm.removeEventListener('ended', handleEnded); bgm.pause(); bgm.currentTime = 0; if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    }, []);

    useEffect(() => { if (bgmRef.current) bgmRef.current.volume = bgmVolume; }, [bgmVolume]);

    useEffect(() => {
        if (step === 'LEVEL_COMPLETE') {
            if (bgmRef.current) { bgmRef.current.pause(); if (timeoutRef.current) clearTimeout(timeoutRef.current); }
            playSound('reward');
        }
    }, [step]);

    useEffect(() => {
        const shuffledRandom = shuffleArray(randomEventsYear1).slice(0, 6);
        setEventQueue([...fixedEventsYear1, ...shuffledRandom]);
    }, []);

    if (eventQueue.length === 0) return null;

    const currentEvent = eventQueue[currentIndex];
    const currentTurn = currentIndex % 2 === 0 ? 'Nghệ thuật' : 'Công nghệ';

    const handleCardClick = (choice) => {
        playSound('click');
        let hapChange = 0;
        if (choice.tech < 0 || choice.art < 0) hapChange = -2;
        else if (choice.tech >= 0 && choice.art >= 0) hapChange = 1;

        let newHap = Math.min(10, happiness + hapChange);
        let newTech = stats.tech + choice.tech;
        let newArt = stats.art + choice.art;
        let isBurnout = false;

        if (newHap <= 0) { isBurnout = true; newTech -= 3; newArt -= 3; newHap = 5; }

        setBurnoutAlert(isBurnout);
        setHappiness(newHap);
        setStats({ tech: newTech, art: newArt });
        setSelectedChoice(choice);
        setStep('OUTCOME');
    };

    const handleNextEvent = () => {
        playSound('move');
        if (stats.tech >= 20 || stats.art >= 20) { setStep('LEVEL_COMPLETE'); return; }
        if (currentIndex >= eventQueue.length - 1) {
            const moreRandomEvents = shuffleArray([...randomEventsYear1]);
            setEventQueue(prev => [...prev, ...moreRandomEvents]);
        }
        setCurrentIndex(prev => prev + 1);
        setStep('CHOOSING');
        setSelectedChoice(null);
    };

    const trackStart = -5;
    const trackEnd = 20;
    const trackCells = trackEnd - trackStart + 1;
    const getPosition = (val) => { return ((Math.max(trackStart, Math.min(trackEnd, val)) - trackStart + 0.5) / trackCells) * 100; };

    const isOverlap = stats.art === stats.tech;
    const artOffset = isOverlap ? 'calc(-50% - 15px)' : '-50%';
    const techOffset = isOverlap ? 'calc(-50% + 15px)' : '-50%';

    // ==========================================
    // GIAO DIỆN HOÀN THÀNH NĂM (Đổi sang bg-white)
    // ==========================================
    if (step === 'LEVEL_COMPLETE') {
        const winner = stats.tech >= 20 ? 'Công nghệ' : 'Nghệ thuật';
        let endingMessage = happiness >= 7 ? "Bạn đã hoàn thành năm học với tinh thần tuyệt vời và tràn đầy cảm hứng!" : happiness >= 4 ? "Một năm học khá vất vả, nhưng bạn vẫn giữ được sự cân bằng ổn định." : "Bạn đã vắt kiệt sức lực của bản thân để đến được đây. Hãy nhớ chăm sóc sức khỏe tinh thần nhé!";

        return (
            <div className="relative w-full h-screen bg-white flex flex-col items-center justify-center p-6 overflow-hidden" style={{ fontFamily: "'Playpen Sans', cursive" }}>
                {/* Nền chấm bi */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <div className="relative z-10 max-w-3xl w-full bg-white border-[3px] border-black p-10 flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" style={{ borderRadius: '8px 12px 10px 8px/10px 8px 12px 10px' }}>
                    <h1 className="text-5xl font-bold mb-4">Hoàn thành Năm Nhất!</h1>
                    <p className="text-2xl font-bold text-gray-800 mb-2">Hướng đi nổi bật: <span className="text-blue-600 uppercase">{winner}</span></p>
                    <p className="text-lg text-gray-600 mb-8 italic">{endingMessage}</p>
                    <div className="flex gap-12 text-3xl font-bold mb-10 border-[3px] border-black p-6 bg-white" style={{ borderRadius: '8px 12px 10px 8px' }}>
                        <span className={stats.tech < 0 ? 'text-red-500' : 'text-blue-600'}>Công nghệ: {stats.tech}</span>
                        <span className="text-gray-300">|</span>
                        <span className={stats.art < 0 ? 'text-red-500' : 'text-pink-600'}>Nghệ thuật: {stats.art}</span>
                    </div>
                    <button onClick={() => onLevelComplete(stats)} className="px-12 py-4 text-2xl font-bold border-[3px] border-black bg-white hover:bg-black hover:text-white transition-colors uppercase" style={{ borderRadius: '8px' }}>
                        Sang năm tiếp theo
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // GIAO DIỆN CHƠI GAME CHÍNH
    // ==========================================
    return (
        <div className="relative w-full h-screen overflow-hidden bg-white text-black px-4 py-2 md:px-8 md:py-4 flex flex-col items-center justify-between" style={{ fontFamily: "'Playpen Sans', cursive" }}>

            {/* Nền chấm bi mịn */}
            <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* TẤT CẢ NỘI DUNG SAU ĐÂY PHẢI NẰM TRONG KHỐI Z-10 ĐỂ NỔI LÊN TRÊN NỀN */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">

                {/* HUD GÓC TRÊN */}
                <div className="w-full max-w-6xl flex justify-between items-center mb-2 mt-8 md:mt-2">
                    <div className="text-2xl md:text-3xl font-bold border-[3px] border-black px-6 py-1 bg-white ml-14 md:ml-0 shadow-sm" style={{ borderRadius: '8px 12px 10px 8px' }}>
                        Năm nhất
                    </div>
                    <div className="flex flex-col items-end bg-white/80 p-2 rounded-lg">
                        <div className="text-xl font-bold mb-1 flex items-center"><HandDrawnHeart /> Hạnh phúc: {happiness}/10</div>
                        <div className="w-48 h-5 border-[3px] border-black p-[2px] bg-white" style={{ borderRadius: '6px' }}>
                            <div className="h-full transition-all duration-300" style={{ width: `${(happiness / 10) * 100}%`, backgroundColor: happiness > 5 ? '#ec4899' : '#ef4444', borderRadius: '3px' }}></div>
                        </div>
                    </div>
                </div>

                {/* TRỤC ĐƯỜNG & NHÂN VẬT */}
                <div className="w-full max-w-6xl relative my-10">
                    {/* Nhân vật Nghệ thuật */}
                    <div className="absolute bottom-full mb-1 w-[40px] flex flex-col justify-end items-center transition-all duration-700 ease-in-out" style={{ left: `${getPosition(stats.art)}%`, transform: `translateX(${artOffset})`, zIndex: currentTurn === 'Nghệ thuật' ? 20 : 10 }}>
                        {currentTurn === 'Nghệ thuật' && step === 'CHOOSING' && <div className="absolute bottom-full mb-1 text-2xl font-bold animate-bounce text-pink-600 drop-shadow-sm">▼</div>}
                        <svg width="40" height="45" viewBox="0 0 40 50" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="20" cy="15" r="8" fill={currentTurn === 'Nghệ thuật' ? '#fbcfe8' : 'white'} />
                            <path d="M20 23 L20 35 M20 25 L10 20 M20 25 L30 30 M20 35 L12 48 M20 35 L28 48" />
                        </svg>
                    </div>

                    {/* Nhân vật Công nghệ */}
                    <div className="absolute bottom-full mb-1 w-[40px] flex flex-col justify-end items-center transition-all duration-700 ease-in-out" style={{ left: `${getPosition(stats.tech)}%`, transform: `translateX(${techOffset})`, zIndex: currentTurn === 'Công nghệ' ? 20 : 10 }}>
                        {currentTurn === 'Công nghệ' && step === 'CHOOSING' && <div className="absolute bottom-full mb-1 text-2xl font-bold animate-bounce text-blue-600 drop-shadow-sm">▼</div>}
                        <svg width="40" height="45" viewBox="0 0 40 50" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="12" y="7" width="16" height="16" fill={currentTurn === 'Công nghệ' ? '#bfdbfe' : 'white'} />
                            <path d="M20 23 L20 35 M20 25 L10 30 M20 25 L30 20 M20 35 L12 48 M20 35 L28 48" />
                        </svg>
                    </div>

                    <div className="flex w-full h-12 border-y-[3px] border-r-[3px] border-black bg-white relative shadow-sm">
                        {[...Array(trackCells)].map((_, i) => {
                            const cellValue = trackStart + i;
                            const isStart = cellValue === 0;
                            const isEnd = cellValue === 20;
                            const isNegative = cellValue < 0;
                            return (
                                <div key={i} className={`flex-1 border-l-[3px] border-black h-full relative flex items-center justify-center 
                  ${isStart ? 'bg-blue-100' : isEnd ? 'bg-pink-100' : ''} 
                  ${isNegative ? 'bg-gray-100 opacity-60' : ''}
                `}>
                                    {isStart && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><path d="M12 3L2 10h3v10h14V10h3L12 3z" /><path d="M10 20v-6h4v6" /></svg>}
                                    {isEnd && <svg width="20" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5"><path d="M4 22V2M4 4l16 5-16 5" fill="#facc15" /></svg>}
                                    {isStart && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-800">0</span>}
                                    {isEnd && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600 whitespace-nowrap bg-white/80 px-1">KẾT THÚC NĂM HỌC</span>}
                                    {(!isStart && !isEnd && (cellValue === 10 || cellValue === -5)) && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-500">{cellValue}</span>}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* KHU VỰC THẺ BÀI / KẾT QUẢ */}
                <div className="flex-1 w-full max-w-6xl border-[3px] border-black p-4 md:p-6 relative bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col" style={{ borderRadius: '8px 12px 10px 8px' }}>
                    <div className={`absolute -top-5 left-6 bg-white border-[3px] border-black px-4 py-1 text-lg font-bold ${currentTurn === 'Nghệ thuật' ? 'text-pink-600' : 'text-blue-600'}`} style={{ borderRadius: '6px 8px 5px 6px' }}>
                        Lượt của {currentTurn}
                    </div>

                    {step === 'CHOOSING' ? (
                        <div className="flex flex-col h-full mt-2">
                            <div className="text-center mb-4">
                                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center"><HandDrawnStar /> {currentEvent.title} <HandDrawnStar /></h2>
                                <p className="text-lg text-gray-800">{currentEvent.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full flex-1">
                                {currentEvent.choices.map((choice) => (
                                    <div key={choice.id} onClick={() => handleCardClick(choice)} className="bg-white border-[3px] border-black p-4 flex flex-col cursor-pointer hover:bg-gray-50 transition-transform hover:-translate-y-1 h-full" style={{ borderRadius: '8px 10px 8px 12px' }}>
                                        <h3 className="text-xl font-bold mb-2 border-b-2 border-black border-dashed pb-1 text-center">{choice.title}</h3>
                                        <p className="text-base flex-1 text-gray-700 text-justify">{choice.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center py-4">
                            {burnoutAlert ? (
                                <div className="mb-4 p-3 border-[3px] border-red-500 bg-red-50 text-red-700 font-bold max-w-2xl text-lg rounded-md shadow-sm">⚠️ KIỆT SỨC! Bạn đã vắt kiệt hạnh phúc. Cả 2 chỉ số bị lùi 3 ô!</div>
                            ) : <h2 className="text-2xl font-bold mb-4">Kết quả lựa chọn</h2>}

                            <p className="text-xl mb-6 leading-relaxed font-semibold max-w-3xl">{selectedChoice.outcome}</p>

                            <div className="flex flex-wrap justify-center gap-6 mb-6 text-xl font-bold bg-white px-6 py-3 border-[3px] border-black shadow-sm" style={{ borderRadius: '8px' }}>
                                <span className={selectedChoice.tech > 0 ? 'text-blue-600' : selectedChoice.tech < 0 ? 'text-red-500' : 'text-gray-500'}>Công nghệ {selectedChoice.tech > 0 ? '+' : ''}{selectedChoice.tech}</span>
                                <span className="text-gray-400">|</span>
                                <span className={selectedChoice.art > 0 ? 'text-pink-600' : selectedChoice.art < 0 ? 'text-red-500' : 'text-gray-500'}>Nghệ thuật {selectedChoice.art > 0 ? '+' : ''}{selectedChoice.art}</span>
                                <span className="text-gray-400">|</span>
                                {(() => {
                                    const hChange = (selectedChoice.tech < 0 || selectedChoice.art < 0) ? -2 : ((selectedChoice.tech >= 0 && selectedChoice.art >= 0) ? 1 : 0);
                                    return <span className={hChange > 0 ? 'text-pink-500' : hChange < 0 ? 'text-red-500' : 'text-gray-500'}>Hạnh phúc {hChange > 0 ? '+' : ''}{hChange}</span>;
                                })()}
                            </div>

                            <button onClick={handleNextEvent} className="px-8 py-2 text-lg font-bold border-[3px] border-black bg-white hover:bg-black hover:text-white transition-colors uppercase" style={{ borderRadius: '6px' }}>Tiếp tục</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}