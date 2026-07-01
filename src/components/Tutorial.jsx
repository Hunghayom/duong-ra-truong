import React from 'react';

export default function Tutorial({ onStartLevel }) {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-6" style={{ fontFamily: "'Playpen Sans', cursive" }}>
            <div className="max-w-3xl w-full bg-white border-[3px] border-black p-8 hand-drawn-border mb-8"
                style={{ borderRadius: '15px 225px 15px 255px/255px 15px 225px 15px' }}>
                <h2 className="text-4xl font-bold mb-6 text-center border-b-2 border-dashed border-black pb-4">Hướng dẫn</h2>
                <ul className="text-xl space-y-4 font-semibold text-gray-800 leading-relaxed">
                    <li>🎓 Bạn sẽ trải qua các sự kiện trong 4 năm học đại học.</li>
                    <li>🃏 Mỗi sự kiện cung cấp 3 thẻ hành động. Bạn chỉ được chọn 1.</li>
                    <li>⚖️ Mọi quyết định đều làm thay đổi 2 chỉ số: <span className="text-blue-600">Công nghệ</span> và <span className="text-pink-600">Nghệ thuật</span>.</li>
                    <li>💡 Không có lựa chọn nào hoàn toàn sai, hãy chọn theo cách bạn muốn định hình bản thân.</li>
                </ul>
            </div>

            <button
                onClick={onStartLevel}
                className="px-10 py-3 text-xl font-bold bg-black text-white border-[3px] border-black hand-drawn-border hover:bg-gray-800 transition-colors"
                style={{ borderRadius: '25px 10px 25px 10px/10px 25px 10px 25px' }}
            >
                Bắt đầu Năm Nhất
            </button>
        </div>
    );
}