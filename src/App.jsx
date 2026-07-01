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
    // XÓA ALERT HOÀN TOÀN - Chuyển sang màn hình tổng kết hoặc năm tiếp theo ở đây
    console.log("Hoàn thành Năm 1 với điểm:", finalStatsY1);
  };

  return (
    <div className="w-full min-h-screen font-sans">
      {appState === 'INTRO' && <IntroManager onFinishIntro={() => setAppState('MAIN_MENU')} />}
      {appState === 'MAIN_MENU' && <MainMenu onPlay={() => setAppState('TUTORIAL')} />}
      {appState === 'TUTORIAL' && <Tutorial onStartLevel={() => setAppState('LOADING')} />}
      {appState === 'LOADING' && <LoadingScreen onComplete={() => setAppState('PLAYING_Y1')} />}
      {appState === 'PLAYING_Y1' && <GameLevel1 onLevelComplete={handleFinishLevel1} />}
    </div>
  );
}