import React, { useState } from 'react';
// Import tất cả các slide bạn đã tạo
import Slide1 from '../slides/Slide1';
import Slide2 from '../slides/Slide2';
import Slide3 from '../slides/Slide3';
import Slide4 from '../slides/Slide4';
import Slide5 from '../slides/Slide5';
import Slide6 from '../slides/Slide6';
import Slide7 from '../slides/Slide7';
import Slide8 from '../slides/Slide8';
import Slide9 from '../slides/Slide9';
import Slide10 from '../slides/Slide10';
import Slide11 from '../slides/Slide11';

export default function IntroManager({ onFinishIntro }) {
    // Quản lý slide hiện tại (Bắt đầu từ số 1)
    const [currentStep, setCurrentStep] = useState(1);
    const totalSlides = 11; // Cập nhật số này khi bạn tạo thêm Slide3, Slide4...

    const handleNext = () => {
        if (currentStep < totalSlides) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Khi bấm next ở slide cuối cùng -> Gọi hàm chuyển sang Game
            onFinishIntro();
        }
    };

    // Hàm chọn Slide để render
    const renderSlide = () => {
        switch (currentStep) {
            case 1: return <Slide1 />;
            case 2: return <Slide2 />;
            case 3: return <Slide3 />;
            case 4: return <Slide4 />;
            case 5: return <Slide5 />;
            case 6: return <Slide6 />;
            case 7: return <Slide7 />;
            case 8: return <Slide8 />;
            case 9: return <Slide9 />;
            case 10: return <Slide10 />;
            case 11: return <Slide11 />;
            default: return <Slide1 />;
        }
    };

    return (
        <div
            className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden cursor-pointer selection:bg-none"
            onClick={handleNext} // Click bất kỳ đâu để qua slide
        >
            {/* Nền Caro/Doodle mờ phía sau */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {renderSlide()}

            {/* Nút Bỏ qua Intro */}
            <button
                onClick={(e) => { e.stopPropagation(); onFinishIntro(); }}
                className="absolute top-6 right-6 text-sm font-bold uppercase border-2 border-black px-3 py-1 rounded-[10px_20px_10px_20px/20px_10px_20px_10px] hover:bg-black hover:text-white transition-colors z-20"
            >
                Skip Intro
            </button>
        </div>
    );
}