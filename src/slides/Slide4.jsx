import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide4({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Nên là khi vào trường, mình đã luôn tự hỏi một câu: Mình thật sự thích điều gì? Nghệ thuật hay công nghệ? \nNghệ thuật là thứ mình thích khi còn bé, còn tin học là môn mình giỏi suốt những năm cấp 3. \nVà lựa chọn của mình có phải thứ mình thật sự mong muốn hay không...?"}
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
                    [ Chừa chỗ chèn ảnh SVG 4 ]
                </text>
            </svg>
        </SlideLayout>
    );
}