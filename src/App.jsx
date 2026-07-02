import React, { useState } from 'react';
import IntroManager from './components/IntroManager';
import MainMenu from './components/MainMenu';
import Tutorial from './components/Tutorial';
import LoadingScreen from './components/LoadingScreen';
import GameLevel1 from './components/GameLevel1';

// Component Nút Cài đặt Âm thanh Toàn cục
const AudioSettings = ({ bgmVolume, setBgmVolume, sfxVolume, setSfxVolume }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50" style={{ fontFamily: "'Playpen Sans', cursive" }}>
      {/* Nút bấm bánh răng bo góc */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-white border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-all"
        style={{ borderRadius: '10px 8px 12px 10px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>

      {/* Bảng điều chỉnh âm lượng */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white border-[3px] border-black p-4 w-64 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" style={{ borderRadius: '12px 8px 10px 12px' }}>
          <h4 className="font-bold text-lg mb-4 border-b-2 border-dashed border-black pb-2">Cài đặt Âm thanh</h4>

          <div className="mb-4">
            <label className="flex justify-between font-semibold mb-1 text-sm">
              <span>Nhạc nền (BGM)</span>
              <span>{Math.round(bgmVolume * 100)}%</span>
            </label>
            <input type="range" min="0" max="1" step="0.05" value={bgmVolume} onChange={(e) => setBgmVolume(parseFloat(e.target.value))} className="w-full accent-black cursor-pointer" />
          </div>

          <div>
            <label className="flex justify-between font-semibold mb-1 text-sm">
              <span>Hiệu ứng (SFX)</span>
              <span>{Math.round(sfxVolume * 100)}%</span>
            </label>
            <input type="range" min="0" max="1" step="0.05" value={sfxVolume} onChange={(e) => setSfxVolume(parseFloat(e.target.value))} className="w-full accent-black cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [appState, setAppState] = useState('INTRO');
  const [globalStats, setGlobalStats] = useState({ tech: 0, art: 0 });

  // State lưu trữ âm lượng toàn cục (Mặc định 40% cho BGM, 80% cho SFX)
  const [bgmVolume, setBgmVolume] = useState(0.4);
  const [sfxVolume, setSfxVolume] = useState(0.8);

  const handleFinishLevel1 = (finalStatsY1) => {
    setGlobalStats(finalStatsY1);
    setAppState('MAIN_MENU');
  };

  return (
    <div className="w-full h-screen font-sans relative">
      {/* UI Cài đặt luôn xuất hiện */}
      <AudioSettings bgmVolume={bgmVolume} setBgmVolume={setBgmVolume} sfxVolume={sfxVolume} setSfxVolume={setSfxVolume} />

      {appState === 'INTRO' && <IntroManager onFinishIntro={() => setAppState('MAIN_MENU')} />}
      {appState === 'MAIN_MENU' && <MainMenu onPlay={() => setAppState('TUTORIAL')} />}
      {appState === 'TUTORIAL' && <Tutorial onStartLevel={() => setAppState('LOADING')} />}
      {appState === 'LOADING' && <LoadingScreen onComplete={() => setAppState('PLAYING_Y1')} />}

      {/* Truyền mức âm lượng xuống GameLevel1 */}
      {appState === 'PLAYING_Y1' && (
        <GameLevel1
          onLevelComplete={handleFinishLevel1}
          bgmVolume={bgmVolume}
          sfxVolume={sfxVolume}
        />
      )}
    </div>
  );
}