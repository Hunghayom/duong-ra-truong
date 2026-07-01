import React, { useState } from 'react';
import IntroManager from './components/IntroManager';
import MainMenu from './components/MainMenu';
import Tutorial from './components/Tutorial';
import LoadingScreen from './components/LoadingScreen';
import GameLevel1 from './components/GameLevel1';

export default function App() {
  const [appState, setAppState] = useState('INTRO');
  const [globalStats, setGlobalStats] = useState({ tech: 0, art: 0 });

  const handleFinishLevel1 = (finalStatsY1) => {
    setGlobalStats(finalStatsY1);
    alert(`Hoàn thành Năm Nhất! Điểm của bạn:\nTech: ${finalStatsY1.tech} | Art: ${finalStatsY1.art}`);
  };

  return (
    <div className="w-full h-screen font-sans">
      {appState === 'INTRO' && <IntroManager onFinishIntro={() => setAppState('MAIN_MENU')} />}
      {appState === 'MAIN_MENU' && <MainMenu onPlay={() => setAppState('TUTORIAL')} />}
      {appState === 'TUTORIAL' && <Tutorial onStartLevel={() => setAppState('LOADING')} />}

      {/* Hiện Loading Screen trước khi vào game */}
      {appState === 'LOADING' && <LoadingScreen onComplete={() => setAppState('PLAYING_Y1')} />}

      {appState === 'PLAYING_Y1' && <GameLevel1 onLevelComplete={handleFinishLevel1} />}
    </div>
  );
}