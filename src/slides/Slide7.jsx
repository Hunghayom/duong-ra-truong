import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide7({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Tớ gặp được những người bạn, họ rất tốt và giúp đỡ tớ rất nhiều, cả trong việc học và trong cuộc sống. \nCũng có vài cãi vã, nhưng sau đó thì mối quan hệ của chúng tớ lại càng bền hơn."}
            onNextSlide={onNextSlide}
            onSkipIntro={onSkipIntro}
        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 7 ]
                </text>
            </svg>
        </SlideLayout>
    );
}
