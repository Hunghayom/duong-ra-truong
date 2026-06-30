import React from 'react';
import SlideLayout from '../components/SlideLayout';

// BẮT BUỘC phải nhận 2 props này từ IntroManager truyền xuống
export default function Slide1({ onNextSlide, onSkipIntro }) {
    return (
        <SlideLayout
            isTitleSlide={true}
            title="Lễ tốt nghiệp của tôi"
            onNextSlide={onNextSlide} // BẮT BUỘC có dòng này
            onSkipIntro={onSkipIntro} // BẮT BUỘC có dòng này
        >
            {/* Màn hình tiêu đề không cần children ảnh */}
        </SlideLayout>
    );
}