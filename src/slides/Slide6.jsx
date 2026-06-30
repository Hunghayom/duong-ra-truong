import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide6({ onNextSlide }) {
    return (
        <SlideLayout
            isTitleSlide={false}

            text={"Tuy nhiên thì cuộc sống của mình ở đại học không đến nỗi quá tệ. \nMình gặp nhiều người mới, được tiếp xúc với nhiều thứ, có tốt, có cả xấu.\nCó những cuộc gặp gỡ tình cờ và những cuộc chia li không hẹn trước."}
            onNextSlide={onNextSlide}
        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 6 ]
                </text>
            </svg>
        </SlideLayout>
    );
}