import React from 'react';
import SlideLayout from '../components/SlideLayout';

export default function Slide1() {
    return (
        <SlideLayout
            isTitleSlide={true}
            title="Lễ tốt nghiệp của tôi"
        >
            {/* Slide này chỉ có chữ Title, không cần truyền ảnh vào đây */}
        </SlideLayout>
    );
}