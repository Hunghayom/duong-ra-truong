import React, { useState } from 'react';
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



export default function IntroManager({ onFinishIntro }) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSlides = 10; // Tăng số này khi có thêm slide

    const handleNext = () => {
        if (currentStep < totalSlides) {
            setCurrentStep(prev => prev + 1);
        } else {
            onFinishIntro();
        }
    };

    const renderSlide = () => {
        switch (currentStep) {
            // Truyền hàm onNextSlide xuống các slide
            case 1: return <Slide1 onNextSlide={handleNext} />;
            case 2: return <Slide2 onNextSlide={handleNext} />;
            case 3: return <Slide3 onNextSlide={handleNext} />;
            case 4: return <Slide4 onNextSlide={handleNext} />;
            case 5: return <Slide5 onNextSlide={handleNext} />;
            case 6: return <Slide6 onNextSlide={handleNext} />;
            case 7: return <Slide7 onNextSlide={handleNext} />;
            case 8: return <Slide8 onNextSlide={handleNext} />;
            case 9: return <Slide9 onNextSlide={handleNext} />;
            case 10: return <Slide10 onNextSlide={handleNext} />;

            default: return <Slide1 onNextSlide={handleNext} />;
        }
    };

    return (
        <div className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden selection:bg-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {renderSlide()}

            <button
                onClick={(e) => { e.stopPropagation(); onFinishIntro(); }}
                className="absolute top-6 right-6 text-sm font-bold uppercase border-2 border-black px-3 py-1 rounded-[10px_20px_10px_20px/20px_10px_20px_10px] hover:bg-black hover:text-white transition-colors z-20"
            >
                Skip Intro
            </button>
        </div>
    );
}