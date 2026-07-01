import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fixedEventsYear1 } from '../data/eventsYear1Fixed';
import { randomEventsYear1 } from '../data/eventsYear1Random';

// Hàm xáo trộn mảng
const shuffleArray = (array) => [...array].sort(() => 0.5 - Math.random());

export default function GameLevel1({ onLevelComplete }) {
    const [eventQueue, setEventQueue] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Chỉ số nhân vật
    const [stats, setStats] = useState({ tech: 0, art: 0 });

    // Trạng thái màn hình (Chọn thẻ hay Xem kết cục)
    const [step, setStep] = useState('CHOOSING'); // 'CHOOSING' | 'OUTCOME'
    const [selectedChoice, setSelectedChoice] = useState(null);

    // Khởi tạo hàng đợi sự kiện khi component được mount
    useEffect(() => {
        const shuffledRandom = shuffleArray(randomEventsYear1).slice(0, 6); // Lấy 6 random
        const fixed = [...fixedEventsYear1]; // 4 cố định (tạm thời array mẫu có 1, bạn cần điền đủ 4)

        // Xen kẽ: F - R - R - F - R - R - F - R - R - F (Tổng 10)
        // Để code chạy mượt mà dù bạn chưa điền đủ data, ta trộn thẳng vào 1 mảng
        const combined = [...fixed, ...shuffledRandom];
        setEventQueue(combined);
    }, []);

    if (eventQueue.length === 0) return <div>Đang nạp dữ liệu...</div>;

    const currentEvent = eventQueue[currentIndex];

    const handleCardClick = (choice) => {
        setSelectedChoice(choice);
        setStats(prev => ({
            tech: prev.tech + choice.tech,
            art: prev.art + choice.art
        }));
        setStep('OUTCOME');
    };

    const handleNextEvent = () => {
        if (currentIndex < eventQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStep('CHOOSING');
            setSelectedChoice(null);
        } else {
            // Hết năm nhất
            onLevelComplete(stats);
        }
    };

    return (
        <div className="w-full h-screen bg-gray-50 p-6 flex flex-col items-center" style={{ fontFamily: "'Playpen Sans', cursive" }}>

            {/* THANH TRẠNG THÁI (HUD) */}
            <div className="w-full max-w-5xl flex justify-between items-center bg-white border-[3px] border-black p-4 mb-8 hand-drawn-border"
                style={{ borderRadius: '15px' }}>
                <div className="text-xl font-bold">Năm Nhất: Kỳ 1 & 2</div>
                <div className="flex gap-6 text-lg font-bold">
                    <span className="text-blue-600">⚙️ Công nghệ: {stats.tech}</span>
                    <span className="text-pink-600">🎨 Nghệ thuật: {stats.art}</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 'CHOOSING' ? (
                    <motion.div
                        key="choosing"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-5xl flex flex-col items-center flex-1"
                    >
                        {/* TIÊU ĐỀ SỰ KIỆN */}
                        <div className="bg-white border-[3px] border-black p-6 mb-8 w-full hand-drawn-border text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                            style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}>
                            <h2 className="text-3xl font-bold mb-3">{currentEvent.title}</h2>
                            <p className="text-xl font-medium text-gray-700">{currentEvent.description}</p>
                        </div>

                        {/* 3 THẺ LỰA CHỌN */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {currentEvent.choices.map((choice) => (
                                <motion.div
                                    key={choice.id}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleCardClick(choice)}
                                    className="bg-white border-[3px] border-black p-6 flex flex-col justify-between cursor-pointer hand-drawn-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors h-full"
                                    style={{ borderRadius: '15px 255px 15px 225px/225px 15px 255px 15px' }}
                                >
                                    <h3 className="text-2xl font-bold mb-4 border-b-2 border-black pb-2">{choice.title}</h3>
                                    <p className="text-lg flex-1 mb-4">{choice.content}</p>

                                    {/* Có thể làm mờ/ẩn dòng này nếu muốn người chơi tự đoán */}
                                    <div className="text-sm font-bold text-gray-500 bg-gray-100 p-2 text-center rounded">
                                        Bấm để chọn hành động này
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="outcome"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className="w-full max-w-3xl bg-white border-[3px] border-black p-10 flex flex-col items-center text-center hand-drawn-border shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                        style={{ borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px' }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Kết quả</h2>
                        <p className="text-2xl mb-8 leading-relaxed font-semibold">{selectedChoice.outcome}</p>

                        <div className="flex gap-8 mb-10 text-2xl font-bold">
                            <span className={selectedChoice.tech > 0 ? 'text-blue-600' : selectedChoice.tech < 0 ? 'text-red-500' : 'text-gray-400'}>
                                Tech {selectedChoice.tech > 0 ? '+' : ''}{selectedChoice.tech}
                            </span>
                            <span className={selectedChoice.art > 0 ? 'text-pink-600' : selectedChoice.art < 0 ? 'text-red-500' : 'text-gray-400'}>
                                Art {selectedChoice.art > 0 ? '+' : ''}{selectedChoice.art}
                            </span>
                        </div>

                        <button
                            onClick={handleNextEvent}
                            className="px-12 py-3 text-xl font-bold border-[3px] border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest hand-drawn-border"
                        >
                            Tiếp tục
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}