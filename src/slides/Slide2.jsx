import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide2() {
    return (
        <SlideLayout
            isTitleSlide={false}
            text="Xin chào mọi người, mình là Tạ Việt Hùng. Mình là sinh viên trường ĐHCN - ĐHQGHN. Ngày 5/7 tới sẽ là lễ tốt nghiệp của mình."
        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 2 ]
                </text>
            </svg>
        </SlideLayout>
    );
}