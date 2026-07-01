import React, { useState, useEffect } from 'react';
import { fixedEventsYear1 } from '../data/eventsYear1Fixed';
import { randomEventsYear1 } from '../data/eventsYear1Random';

const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

export default function GameLevel1({ onLevelComplete }) {
    const [eventQueue, setEventQueue] = useState([]);
    const [unusedEvents, setUnusedEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Chỉ số cốt lõi
    const [stats, setStats] = useState({ tech: 0, art: 0 });
    const [happiness, setHappiness] = useState(10); // Tối đa 10

    const [step, setStep] = useState('CHOOSING'); // CHOOSING | OUTCOME | LEVEL_COMPLETE
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [burnoutAlert, setBurnoutAlert] = useState(false);

    useEffect(() => {
        const shuffledRandom = shuffleArray(randomEventsYear1);
        const selectedRandom = shuffledRandom.slice(0, 6);
        const remainingRandom = shuffledRandom.slice(6); // Giữ lại làm sự kiện cứu trợ

        const combined = [...fixedEventsYear1, ...selectedRandom];
        setEventQueue(combined);
        setUnusedEvents(remainingRandom);
    }, []);

    if (eventQueue.length === 0) return null;

    const currentEvent = eventQueue[currentIndex];
    const currentTurn = currentIndex % 2 === 0 ? 'Nghệ thuật' : 'Công nghệ';

    const handleCardClick = (choice) => {
        let hapChange = 0;
        // Tụt hạnh phúc nếu phải hi sinh một trong hai, cộng hạnh phúc nếu cả 2 cùng tiến
        if (choice.tech < 0 || choice.art < 0) hapChange = -2;
        else if (choice.tech >= 0 && choice.art >= 0) hapChange = 1;

        let newHap = Math.min(10, happiness + hapChange);
        let newTech = stats.tech + choice.tech;
        let newArt = stats.art + choice.art;
        let isBurnout = false;

        // Cơ chế Kiệt sức (Burnout)
        if (newHap <= 0) {
            isBurnout = true;
            newTech -= 3;
            newArt -= 3;
            newHap = 5; // Hồi lại một chút sau khi nghỉ ngơi
        }

        setBurnoutAlert(isBurnout);
        setHappiness(newHap);
        setStats({ tech: newTech, art: newArt });
        setSelectedChoice(choice);
        setStep('OUTCOME');
    };

    const handleNextEvent = () => {
        if (currentIndex < eventQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStep('CHOOSING');
            setSelectedChoice(null);
        } else {
            // KIỂM TRA TĂNG CA: Nếu có điểm âm, tìm sự kiện cứu trợ
            if ((stats.tech < 0 || stats.art < 0) && unusedEvents.length > 0) {
                const statToBoost = stats.tech < 0 ? 'tech' : 'art';
                // Tìm 1 sự kiện chưa dùng có lựa chọn tăng điểm đang bị âm
                const eventIndex = unusedEvents.findIndex(ev => ev.choices.some(c => c[statToBoost] > 0));

                if (eventIndex !== -1) {
                    const newEvent = unusedEvents[eventIndex];
                    const newUnused = [...unusedEvents];
                    newUnused.splice(eventIndex, 1); // Rút ra khỏi bể

                    setUnusedEvents(newUnused);
                    setEventQueue(prev => [...prev, newEvent]); // Nối thêm vào cuối hàng đợi
                    setCurrentIndex(prev => prev + 1);
                    setStep('CHOOSING');
                    setSelectedChoice(null);
                    return;
                }
            }
            // Nếu không cần cứu trợ hoặc hết thẻ, kết thúc năm
            setStep('LEVEL_COMPLETE');
        }
    };

    // Cấu trúc trục đường: Từ -5 đến 20 (Tổng 26 ô)
    const trackStart = -5;
    const trackEnd = 20;
    const trackCells = trackEnd - trackStart + 1;

    // Hàm tính toán % vị trí trên track (Giới hạn hiển thị không tràn ra ngoài)
    const getPosition = (val) => {
        const clampedVal = Math.max(trackStart, Math.min(trackEnd, val));
        return ((clampedVal - trackStart + 0.5) / trackCells) * 100;
    };

    // ==========================
    // GIAO DIỆN HOÀN THÀNH NĂM
    // ==========================
    if (step === 'LEVEL_COMPLETE') {
        return (
            <div className="w-full h-screen bg-gray-50 flex flex-col items-center justify-center p-6" style={{ fontFamily: "'Playpen Sans', cursive" }}>
                <div className="max-w-3xl w-full bg-white border-[3px] border-black p-10 flex flex-col items-center text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}>
                    <h1 className="text-5xl font-bold mb-4">Hoàn thành Năm Nhất!</h1>
                    <p className="text-xl text-gray-600 mb-8">Một năm đầy giông bão đã trôi qua. Đây là vị trí hiện tại của bạn:</p>

                    <div className="flex gap-12 text-3xl font-bold mb-10 border-[3px] border-black p-6" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                        <span className={stats.tech < 0 ? 'text-red-500' : 'text-blue-600'}>Công nghệ: {stats.tech}</span>
                        <span className={stats.tech < 0 || stats.art < 0 ? 'text-black' : 'text-gray-300'}>|</span>
                        <span className={stats.art < 0 ? 'text-red-500' : 'text-pink-600'}>Nghệ thuật: {stats.art}</span>
                    </div>

                    <button
                        onClick={() => onLevelComplete(stats)}
                        className="px-12 py-4 text-2xl font-bold bg-black text-white hover:bg-gray-800 transition-colors uppercase"
                        style={{ borderRadius: '15px 10px 15px 10px/10px 15px 10px 15px' }}
                    >
                        Sang năm tiếp theo
                    </button>
                </div>
            </div>
        );
    }

    // ==========================
    // GIAO DIỆN CHƠI GAME CHÍNH
    // ==========================
    return (
        <div className="w-full min-h-screen bg-white p-4 md:p-8 flex flex-col items-center" style={{ fontFamily: "'Playpen Sans', cursive" }}>

            {/* HUD GÓC TRÊN CÙNG */}
            <div className="w-full max-w-6xl flex justify-between items-center mb-8">
                <div className="text-3xl md:text-4xl font-bold border-[3px] border-black px-8 py-2 bg-white" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    Năm nhất
                </div>

                {/* Thanh Hạnh phúc */}
                <div className="flex flex-col items-end">
                    <div className="text-xl font-bold mb-1">💖 Hạnh phúc: {happiness}/10</div>
                    <div className="w-48 h-4 border-[3px] border-black p-[2px]" style={{ borderRadius: '10px' }}>
                        <div className="h-full transition-all duration-300" style={{ width: `${(happiness / 10) * 100}%`, backgroundColor: happiness > 5 ? '#ec4899' : '#ef4444', borderRadius: '5px' }}></div>
                    </div>
                </div>
            </div>

            {/* TRỤC ĐƯỜNG CHIA Ô -5 ĐẾN 20 */}
            <div className="w-full max-w-6xl relative mb-16 mt-8">
                <div className="flex w-full h-12 border-y-[3px] border-r-[3px] border-black bg-gray-50">
                    {[...Array(trackCells)].map((_, i) => {
                        const cellValue = trackStart + i;
                        return (
                            <div key={i} className="flex-1 border-l-[3px] border-black h-full flex items-center justify-center relative">
                                {/* Đánh số một vài mốc quan trọng để dễ nhìn */}
                                {(cellValue === 0 || cellValue === 10 || cellValue === 20 || cellValue === -5) && (
                                    <span className="absolute -bottom-6 text-sm font-bold text-gray-500">{cellValue}</span>
                                )}
                                {/* Đánh dấu vạch xuất phát 0 */}
                                {cellValue === 0 && <div className="absolute top-0 w-1 h-full bg-red-400"></div>}
                            </div>
                        );
                    })}
                </div>

                {/* Cờ Đích */}
                <div className="absolute -top-12 right-0 translate-x-1/2">
                    <svg width="40" height="60" viewBox="0 0 30 50" fill="none" stroke="black" strokeWidth="2">
                        <path d="M5 50 L5 5 M5 5 L25 15 L5 25" fill="#facc15" />
                    </svg>
                </div>

                {/* Nhân vật Nghệ thuật (Tròn) */}
                <div className="absolute bottom-12 transition-all duration-700 ease-in-out" style={{ left: `${getPosition(stats.art)}%`, transform: 'translateX(-50%)', zIndex: currentTurn === 'Nghệ thuật' ? 20 : 10 }}>
                    {currentTurn === 'Nghệ thuật' && step === 'CHOOSING' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl font-bold animate-bounce text-pink-600">!</div>}
                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="20" cy="15" r="8" fill="white" />
                        <path d="M20 23 L20 35 M20 25 L10 20 M20 25 L30 30 M20 35 L12 48 M20 35 L28 48" />
                    </svg>
                </div>

                {/* Nhân vật Công nghệ (Vuông) */}
                <div className="absolute bottom-12 transition-all duration-700 ease-in-out ml-4" style={{ left: `${getPosition(stats.tech)}%`, transform: 'translateX(-50%)', zIndex: currentTurn === 'Công nghệ' ? 20 : 10 }}>
                    {currentTurn === 'Công nghệ' && step === 'CHOOSING' && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl font-bold animate-bounce text-blue-600">!</div>}
                    <svg width="40" height="50" viewBox="0 0 40 50" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="12" y="7" width="16" height="16" fill="black" />
                        <path d="M20 23 L20 35 M20 25 L10 30 M20 25 L30 20 M20 35 L12 48 M20 35 L28 48" />
                    </svg>
                </div>
            </div>

            {/* KHU VỰC THẺ BÀI / KẾT QUẢ */}
            <div className="w-full max-w-6xl border-[3px] border-black p-6 md:p-8 relative mt-8 bg-white" style={{ borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px' }}>
                <div className="absolute -top-6 left-8 bg-white border-[3px] border-black px-6 py-2 text-xl font-bold" style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                    Lượt của {currentTurn}
                </div>

                {step === 'CHOOSING' ? (
                    <div className="flex flex-col items-center mt-4">
                        <div className="text-center mb-8 max-w-4xl">
                            <h2 className="text-3xl font-bold mb-4">🌟 {currentEvent.title}</h2>
                            <p className="text-xl text-gray-800">{currentEvent.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {currentEvent.choices.map((choice) => (
                                <div
                                    key={choice.id}
                                    onClick={() => handleCardClick(choice)}
                                    className="bg-white border-[3px] border-black p-5 flex flex-col cursor-pointer hover:bg-gray-100 transition-transform hover:-translate-y-2 h-full"
                                    style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}
                                >
                                    <h3 className="text-2xl font-bold mb-3 border-b-2 border-black border-dashed pb-2">{choice.title}</h3>
                                    <p className="text-lg flex-1 text-gray-700">{choice.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center mt-4 py-8">
                        {burnoutAlert ? (
                            <div className="mb-6 p-4 border-[3px] border-red-500 bg-red-50 text-red-700 font-bold max-w-2xl text-xl" style={{ borderRadius: '10px' }}>
                                ⚠️ CẢNH BÁO KIỆT SỨC! Bạn đã vắt kiệt hạnh phúc của mình. Cả 2 chỉ số đều bị lùi lại 3 ô!
                            </div>
                        ) : (
                            <h2 className="text-3xl font-bold mb-6">Kết quả lựa chọn</h2>
                        )}

                        <p className="text-2xl mb-8 leading-relaxed font-semibold max-w-3xl">{selectedChoice.outcome}</p>

                        <div className="flex gap-12 mb-8 text-2xl font-bold">
                            <span className={selectedChoice.tech > 0 ? 'text-blue-600' : selectedChoice.tech < 0 ? 'text-red-500' : 'text-gray-500'}>
                                Tech {selectedChoice.tech > 0 ? '+' : ''}{selectedChoice.tech}
                            </span>
                            <span className={selectedChoice.art > 0 ? 'text-pink-600' : selectedChoice.art < 0 ? 'text-red-500' : 'text-gray-500'}>
                                Art {selectedChoice.art > 0 ? '+' : ''}{selectedChoice.art}
                            </span>
                        </div>

                        <button
                            onClick={handleNextEvent}
                            className="px-10 py-3 text-xl font-bold border-[3px] border-black bg-white hover:bg-black hover:text-white transition-colors uppercase"
                            style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                        >
                            Tiếp tục
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}