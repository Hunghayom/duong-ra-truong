import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide5() {
    return (
        <SlideLayout
            isTitleSlide={false}
            text={"Năm đầu, mình vẫn học tập cùng với mọi người, cũng đạt được một vài thành công nho nhỏ trên con đường mới mẻ này.\nNhưng rồi khi càng học, càng tìm hiểu nhiều, mình càng nhận ra ràng mình chưa đam mê với ngành đủ nhiều như bạn bè, các đàn anh đàn chị đi trước.\nĐiều đó làm mình cảm thấy rất đuối sức, lạc lõng và cô đơn."}

        >
            {/* 
        CHỖ TRỐNG ĐỂ CHÈN ẢNH SVG/ROUGH.JS 
        Sau này bạn copy thẻ <path d="..."> từ AI/Figma vào thẻ <svg> này 
      */}
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Ví dụ 1 đường line nháp: <path d="M10 10 L190 190" stroke="black" /> */}
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#9ca3af" fontSize="14">
                    [ Chừa chỗ chèn ảnh SVG 5 ]
                </text>
            </svg>
        </SlideLayout>
    );
}