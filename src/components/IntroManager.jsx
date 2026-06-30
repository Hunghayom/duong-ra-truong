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
            case 1: return <Slide1 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 2: return <Slide2 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 3: return <Slide3 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 4: return <Slide4 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 5: return <Slide5 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 6: return <Slide6 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 7: return <Slide7 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 8: return <Slide8 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 9: return <Slide9 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
            case 10: return <Slide10 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;

            default: return <Slide1 onNextSlide={handleNext} onSkipIntro={onSkipIntro} />;
        }
    };

    return (
        <div className="relative w-full h-screen bg-white text-black flex flex-col items-center justify-center overflow-hidden selection:bg-none">
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            {renderSlide()}
        </div>
    );
}