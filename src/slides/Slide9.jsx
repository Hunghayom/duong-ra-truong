import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide9({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Tớ nhận ra mình không cần phải chọn một trong hai. \nTớ không phải là người chuyên về công nghệ. Tớ cũng không phải là người chuyên vẽ và nghệ thuật các thứ. \nTớ là Hùng.\nBên trong tớ luôn tồn tại hai nhân vật song hành, và hiện giờ tớ cảm thấy ổn về điều đó."}
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
                    [ Chừa chỗ chèn ảnh SVG 9 ]
                </text>
            </svg>
        </SlideLayout>
    );
}
