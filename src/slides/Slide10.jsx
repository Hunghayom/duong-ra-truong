import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide10({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Cảm ơn mọi người vì đã đồng hành cùng tớ. \nDành cho những ai đã theo dõi tớ đến giờ phút này, tớ có một món quà nho nhỏ dành tặng mọi người. \nHi vọng mọi người sẽ có khoảng thời gian thư giãn với trò chơi này của tớ. \nHẹn gặp lại mọi người ở lễ tốt nghiệp của tớ!"}
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
                    [ Chừa chỗ chèn ảnh SVG 10 ]
                </text>
            </svg>
        </SlideLayout>
    );
}
