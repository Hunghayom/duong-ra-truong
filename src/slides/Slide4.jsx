import React from 'react';
import SlideLayout from '../components/SlideLayout';
import DrawingSlide4 from '../components/slide/DrawingSlide4'

export default function Slide4({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Nên là khi vào trường, mình đã luôn tự hỏi một câu: Mình thật sự thích điều gì? Nghệ thuật hay công nghệ? \nNghệ thuật là thứ mình thích khi còn bé, còn tin học là môn mình giỏi suốt những năm cấp 3. \nVà lựa chọn của mình có phải thứ mình thật sự mong muốn hay không...?"}
            onNextSlide={onNextSlide}
            onSkipIntro={onSkipIntro}
        >
            <DrawingSlide4 />
        </SlideLayout>
    );
}