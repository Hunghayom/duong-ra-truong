import React from 'react';
import SlideLayout from '../components/SlideLayout';
import DrawingSlide2 from '../components/slide/DrawingSlide2'

export default function Slide2({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Xin chào mọi người, mình là Tạ Việt Hùng. Mình là sinh viên trường ĐHCN - ĐHQGHN. \nNgày 5/7 tới sẽ là lễ tốt nghiệp của mình."}
            onNextSlide={onNextSlide}
            onSkipIntro={onSkipIntro}
        >
            <DrawingSlide2 />
        </SlideLayout>
    );
}