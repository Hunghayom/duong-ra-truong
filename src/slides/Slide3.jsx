import React from 'react';
import SlideLayout from '../components/SlideLayout';
import DrawingSlide3 from '../components/slide/DrawingSlide3'

export default function Slide3({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Để mà nói thì đây không phải nguyện vọng 1 của mình. \nNguyện vọng 1 của mình là các trường kiến trúc với mỹ thuật cơ, vì mình rất thích vẽ (dù không giỏi lắm). \nNhưng, như một sự sắp đặt tình cờ, mình đã nhập học ở đây"}
            onNextSlide={onNextSlide}
            onSkipIntro={onSkipIntro}
        >
            <DrawingSlide3 />
        </SlideLayout>
    );
}