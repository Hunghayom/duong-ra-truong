import React, { useState } from 'react';
import IntroManager from './components/IntroManager';
import MainMenu from './components/MainMenu';
import Tutorial from './components/Tutorial';
import GameLevel1 from './components/GameLevel1';

export default function App() {
  // Trạng thái ứng dụng: INTRO -> MAIN_MENU -> TUTORIAL -> PLAYING_Y1
  const [appState, setAppState] = useState('INTRO');

  // Lưu trữ chỉ số người chơi giữa các năm
  const [globalStats, setGlobalStats] = useState({ tech: 0, art: 0 });

  const handleFinishLevel1 = (finalStatsY1) => {
    // Lưu lại điểm số của năm nhất
    setGlobalStats(finalStatsY1);
    // Chuyển sang Year 2 (hoặc màn hình tổng kết)
    alert(`Hoàn thành Năm Nhất! Điểm của bạn:\nTech: ${finalStatsY1.tech} | Art: ${finalStatsY1.art}`);
  };

  return (
    <div className="w-full h-screen font-sans">
      {appState === 'INTRO' && (
        <IntroManager onFinishIntro={() => setAppState('MAIN_MENU')} />
      )}

      {appState === 'MAIN_MENU' && (
        <MainMenu onPlay={() => setAppState('TUTORIAL')} />
      )}

      {appState === 'TUTORIAL' && (
        <Tutorial onStartLevel={() => setAppState('PLAYING_Y1')} />
      )}

      {appState === 'PLAYING_Y1' && (
        <GameLevel1 onLevelComplete={handleFinishLevel1} />
      )}
    </div>
  );
}