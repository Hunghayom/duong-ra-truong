import React, { useState } from 'react';
import IntroManager from './components/IntroManager';
// import GameBoard from './components/GameBoard'; // Import game của bạn sau này

export default function App() {
  // State quản lý xem đang ở màn hình Intro hay đã vào Game
  const [isIntroFinished, setIsIntroFinished] = useState(false);

  return (
    <div className="w-full h-screen font-sans">
      {!isIntroFinished ? (
        // Hiện phần Visual Novel
        <IntroManager onFinishIntro={() => setIsIntroFinished(true)} />
      ) : (
        // Hiện phần Game (Chừa chỗ chèn Logic Game)
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <h1 className="text-3xl font-bold">
            [ CHỪA CHỖ GẮN COMPONENT GAME VÀO ĐÂY ]
          </h1>
          {/* <GameBoard /> */}
        </div>
      )}
    </div>
  );
}