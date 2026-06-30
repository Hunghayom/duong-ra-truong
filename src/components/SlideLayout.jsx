import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SlideLayout({ title, text, isTitleSlide, children, onNextSlide, onSkipIntro }) {
  const lines = text ? text.split('\n') : [];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Reset khi chuyển slide
  useEffect(() => {
    setCurrentLineIndex(0);
    setDisplayedChars(0);
    setIsTyping(true);
  }, [text]);

  // Logic hiệu ứng đánh máy chữ
  useEffect(() => {
    if (isTitleSlide || !isTyping || currentLineIndex >= lines.length) return;
    
    const currentLine = lines[currentLineIndex];
    const interval = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= currentLine.length) {
          setIsTyping(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 25); 

    return () => clearInterval(interval);
  }, [currentLineIndex, isTyping, lines, isTitleSlide]);

  const handleScreenClick = (e) => {
    if (isTitleSlide) return; // Màn hình tiêu đề có nút Bắt đầu riêng
    
    if (isTyping) {
      // Đang gõ dở -> Bấm click để hiện TẤT CẢ chữ của câu hiện tại
      setDisplayedChars(lines[currentLineIndex].length);
      setIsTyping(false);
    } else {
      // Đã gõ xong -> Chuyển sang CÂU TIẾP THEO (câu cũ sẽ bị thay thế)
      if (currentLineIndex < lines.length - 1) {
        setCurrentLineIndex((prev) => prev + 1);
        setDisplayedChars(0);
        setIsTyping(true);
      } else {
        // Hết tất cả các câu -> Chuyển Slide
        if (onNextSlide) onNextSlide();
      }
    }
  };

  // ==========================================
  // GIAO DIỆN MÀN HÌNH MỞ ĐẦU
  // ==========================================
  if (isTitleSlide) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center bg-transparent"
        style={{ fontFamily: "'Playpen Sans', cursive" }}
      >
        <h1 className="text-7xl md:text-8xl lg:text-[7rem] font-bold text-center drop-shadow-sm mb-12 text-black">
          {title}
        </h1>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNextSlide}
          // Nút bấm nét vẽ tay run rẩy
          className="px-14 py-4 text-3xl font-bold bg-white text-black transition-colors z-20"
          style={{
            border: '3px solid #1a1a1a',
            borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
            boxShadow: '2px 3px 0px 0px rgba(0,0,0,0.8), -1px -1px 0px 0px rgba(0,0,0,0.2)'
          }}
        >
          Bắt đầu
        </motion.button>

        <button 
          onClick={onSkipIntro}
          className="absolute bottom-6 right-8 text-xl text-gray-500 hover:text-black underline underline-offset-8 decoration-2 font-semibold transition-colors z-20"
        >
          Skip Intro
        </button>
      </motion.div>
    );
  }

  // ==========================================
  // GIAO DIỆN CÁC SLIDE HỘI THOẠI (VISUAL NOVEL)
  // ==========================================
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      onClick={handleScreenClick}
      // Khung bao phủ toàn màn hình
      className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-12 cursor-pointer overflow-hidden"
      style={{ fontFamily: "'Playpen Sans', cursive" }}
    >
      {/* ẢNH NỀN BACKGROUND: Không còn khung giới hạn, tràn ra phía sau chữ */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-90">
        {children}
      </div>

      {/* KHUNG HIỂN THỊ CHỮ: Rộng 80%, thu hẹp chiều cao, nét run rẩy */}
      <div 
        className="z-10 w-[80%] max-w-5xl bg-white/95 backdrop-blur-sm p-6 relative flex flex-col items-center justify-center min-h-[120px]"
        style={{
          border: '3px solid #1a1a1a',
          borderRadius: '255px 20px 225px 25px/25px 225px 15px 255px',
          boxShadow: '3px 4px 0px 0px rgba(0,0,0,0.8), -1px -2px 0px 0px rgba(0,0,0,0.1)'
        }}
      >
        <div className="text-xl md:text-2xl leading-relaxed text-black font-semibold text-center w-full px-4">
          {/* LOGIC MỚI: Chỉ hiển thị duy nhất câu hiện tại, xóa hoàn toàn các câu cũ */}
          {currentLineIndex < lines.length && (
            <p className="m-0">
              {lines[currentLineIndex].substring(0, displayedChars)}
            </p>
          )}
        </div>
        
        {/* Mũi tên nhấp nháy báo hiệu có thể click tiếp */}
        {!isTyping && (
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute bottom-2 right-6 text-3xl font-bold text-gray-800"
          >
            ▼
          </motion.div>
        )}
      </div>

      {/* NÚT SKIP INTRO: Đã được chuyển hẳn xuống góc dưới cùng bên phải */}
      <button 
        onClick={(e) => { e.stopPropagation(); if(onSkipIntro) onSkipIntro(); }}
        className="absolute bottom-6 right-8 text-lg text-gray-400 hover:text-black underline underline-offset-4 decoration-2 transition-colors z-20"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
