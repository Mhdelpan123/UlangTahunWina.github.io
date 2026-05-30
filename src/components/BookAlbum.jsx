import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import 10 foto lu dari folder assets
import foto1 from '../assets/foto1.jpg';
import foto2 from '../assets/foto2.jpg';
import foto3 from '../assets/foto3.jpg';
import foto4 from '../assets/foto4.jpg';
import foto5 from '../assets/foto5.jpg';
import foto6 from '../assets/foto6.jpg';
import foto7 from '../assets/foto7.jpg';
import foto8 from '../assets/foto8.jpg';
import foto9 from '../assets/foto9.jpg';
import foto10 from '../assets/foto10.jpg';

export default function BookAlbum({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const daftarFoto = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9, foto10];

  const handleNext = () => {
    if (currentIndex < daftarFoto.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Kalau foto ke-10 udah kelar, langsung pindah ke fase Love Story!
      onFinish();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-rose-400 text-sm font-medium mb-6 animate-pulse">
        📸 Klik fotonya untuk melihat kenangan berikutnya ({currentIndex + 1}/{daftarFoto.length})
      </p>

      <div 
        className="relative w-[340px] h-[460px] bg-white p-3 rounded-2xl shadow-2xl border border-rose-100 cursor-pointer overflow-hidden flex flex-col justify-between"
        onClick={handleNext}
      >
        <div className="w-full h-[85%] rounded-xl overflow-hidden bg-rose-50 relative">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={daftarFoto[currentIndex]}
              alt="Kenangan Wina"
              className="w-full h-full object-cover absolute top-0 left-0"
              initial={{ opacity: 0, x: 150, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -150, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/340460?text=Foto+Belum+Ada";
              }}
            />
          </AnimatePresence>
        </div>

        {/* Teks romantis di bawah foto */}
        <div className="h-[12%] flex items-center justify-center text-center">
          <p className="text-rose-600 font-serif italic text-sm px-2">
            {currentIndex === 0 && "Your beautiful smile..."}
            {currentIndex === 1 && "Every moment with you is special..."}
            {currentIndex === 2 && "The day you make me happy..."}
            {currentIndex === 3 && "You are my favorite view..."}
            {currentIndex === 4 && "Laughing together with you..."}
            {currentIndex === 5 && "Thank you for being you..."}
            {currentIndex === 6 && "My safest place to go..."}
            {currentIndex === 7 && "I love everything about you..."}
            {currentIndex === 8 && "Cheers to more memories..."}
            {currentIndex === 9 && "Click once more for a surprise... ❤️"}
          </p>
        </div>
      </div>
    </div>
  );
}