import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide3({ onNextSlide }) {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Để mà nói thì đây không phải nguyện vọng 1 của mình. \nNguyện vọng 1 của mình là các trường kiến trúc với mỹ thuật thôi, vì mình rất thích vẽ dù không giỏi lắm. \nNhưng, như một sự sắp đặt tình cờ, mình đã nhập học ở đây"}
            onNextSlide={onNextSlide}
        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 3 ]
                </text>
            </svg>
        </SlideLayout>
    );
}