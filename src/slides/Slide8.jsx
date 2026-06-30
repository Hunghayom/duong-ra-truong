import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide8() {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Tớ cũng tham gia vào câu lạc bộ của trường nữa (thật ra là 2).\nMột là một câu lạc bộ nổi tiếng và lâu đời của trường.\nMột là một câu lạc bộ non trẻ, vừa được thành lập xong. \nTớ rất yêu mọi người, vì họ cho tớ nhiều thứ: Bạn bè, mối quan hệ, trải nghiệm, cảm xúc. \nÀ thì lâu lâu cũng có vài khúc mắc với cãi vã, giận dỗi, nhưng cơ bản thì vẫn là vui."}

        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 8 ]
                </text>
            </svg>
        </SlideLayout>
    );
}
