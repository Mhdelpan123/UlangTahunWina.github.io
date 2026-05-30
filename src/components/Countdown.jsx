import React, { useState, useEffect } from 'react';

export default function Countdown({ onFinish }) {
  // TODO: Ganti tanggal ulang tahun Wina di sini (Format: YYYY-MM-DDTHH:mm:ss)
  // Contoh: '2026-06-15T00:00:00'
  const TARGET_DATE = '2026-06-02T00:00:00'; 

  const calculateTimeLeft = () => {
    const difference = +new Date(TARGET_DATE) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
        jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
        menit: Math.floor((difference / 1000 / 60) % 60),
        detik: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Kalau waktu habis, panggil fungsi onFinish buat pindah fase
      if (Object.keys(remaining).length === 0) {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format angka biar selalu 2 digit (misal: 05)
  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-rose-100 max-w-md mx-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-rose-400 mb-2 tracking-wide uppercase">Counting Down to Wina's Day</h2>
      <p className="text-gray-400 text-xs mb-6">Sabar ya, sebentar lagi kok...</p>
      
      <div className="flex gap-4 justify-center">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md shadow-rose-200">
              {formatNumber(value || 0)}
            </div>
            <span className="text-xs font-medium text-gray-500 mt-2 capitalize">{label}</span>
          </div>
        ))}
      </div>

      {/* Tombol Rahasia buat testing biar lu gak nunggu sampai hari-H */}
      <button 
        onClick={onFinish}
        className="mt-6 text-[10px] text-gray-300 hover:text-rose-400 transition-colors block mx-auto underline cursor-pointer"
      >
        Skip Countdown (Buat Tes Doang)
      </button>
    </div>
  );
}