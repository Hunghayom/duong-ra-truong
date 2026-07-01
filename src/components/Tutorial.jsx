import React from 'react';

export default function Tutorial({ onStartLevel }) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-6" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            <div className="max-w-4xl w-full bg-white border-[3px] border-black p-8 hand-drawn-border mb-8"
                style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}>
                <h2 className="text-4xl font-bold mb-6 text-center border-b-2 border-dashed border-black pb-4">Hướng dẫn Trò chơi</h2>
                <ul className="text-xl space-y-4 font-semibold text-gray-800 leading-relaxed">
                    <li>🎓 Bạn sẽ đối mặt với các sự kiện trong suốt 4 năm học. Mỗi sự kiện có 3 lựa chọn.</li>
                    <li>⚖️ Các lựa chọn sẽ làm thay đổi vị trí của 2 nhân vật: <span className="text-blue-600 font-bold">Công nghệ</span> và <span className="text-pink-600 font-bold">Nghệ thuật</span> trên trục đường (từ ô -5 đến 20).</li>
                    <li>💖 <strong>Chỉ số Hạnh phúc:</strong> Tăng lên khi cân bằng, nhưng sẽ sụt giảm mạnh nếu bạn chọn các thẻ ép buộc đánh đổi (tiến 1 chỉ số nhưng lùi chỉ số kia).</li>
                    <li>⚠️ <strong>Kiệt sức (Burnout):</strong> Nếu để Hạnh phúc cạn kiệt, bạn sẽ rơi vào trạng thái Kiệt sức. Cả 2 nhân vật sẽ bị phạt lùi lại 3 ô!</li>
                    <li>🔄 Nếu một nhân vật bị lùi xuống vạch âm, năm học có thể sẽ kéo dài hơn để bạn có cơ hội "gỡ điểm".</li>
                </ul>
            </div>

            <button
                onClick={onStartLevel}
                className="px-10 py-3 text-2xl font-bold bg-white text-black border-[3px] border-black hover:bg-black hover:text-white transition-colors"
                style={{ borderRadius: '25px 10px 25px 10px/10px 25px 10px 25px' }}
            >
                Đã hiểu, Bắt đầu Năm Nhất!
            </button>
        </div>
    );
}