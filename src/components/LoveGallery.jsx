import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

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

export default function LoveGallery({ onClickHeart }) {
  const [isFormed, setIsFormed] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const daftarFoto = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9, foto10];

  useEffect(() => {
    // Ngambil ukuran layar biar sebaran acaknya pas di monitor/HP lu
    setDimensions({
      width: window.innerWidth > 600 ? 500 : window.innerWidth - 60,
      height: window.innerHeight > 800 ? 500 : window.innerHeight - 200,
    });

    // Foto bertebaran dulu selama 2 detik, baru otomatis ngebentuk Love
    const timer = setTimeout(() => {
      setIsFormed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Koordinat matematika biar 10 foto lu presisi ngebentuk pola Love (Hati)
  const lovePositions = [
    { x: 0, y: -120 },    // Atas tengah (lekukan dalam)
    { x: -75, y: -160 },  // Lengkungan kiri atas 1
    { x: -150, y: -100 }, // Lengkungan kiri atas 2
    { x: -170, y: -10 },  // Samping kiri
    { x: -110, y: 80 },   // Lereng kiri bawah
    { x: 0, y: 170 },     // Ujung lancip bawah
    { x: 110, y: 80 },    // Lereng kanan bawah
    { x: 170, y: -10 },   // Samping kanan
    { x: 150, y: -100 },  // Lengkungan kanan atas 2
    { x: 75, y: -160 },   // Lengkungan kanan atas 1
  ];

  // Efek posisi berantakan pas pertama kali masuk halaman
  const getRandomPosition = (index) => {
    const seedX = Math.sin(index + 1) * (dimensions.width / 2);
    const seedY = Math.cos(index + 1) * (dimensions.height / 2);
    return { x: seedX, y: seedY, rotate: seedX % 25 };
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden bg-rose-50/30">
      <p className="absolute top-10 text-rose-400 text-sm font-medium animate-pulse text-center px-4 z-50">
        {isFormed ? "❤️ Klik jantung di tengah untuk membuka suratnya ❤️" : "Membuat sesuatu untukmu..."}
      </p>

      <div className="relative w-full h-full flex items-center justify-center">
        {daftarFoto.map((foto, index) => {
          const randomPos = getRandomPosition(index);
          const lovePos = lovePositions[index];

          return (
            <motion.div
              key={index}
              className="absolute w-24 h-32 md:w-32 md:h-44 bg-white p-1.5 rounded-lg shadow-xl border border-gray-100 overflow-hidden"
              style={{ zIndex: isFormed ? 10 : index }}
              animate={{
                x: isFormed ? lovePos.x : randomPos.x,
                y: isFormed ? lovePos.y : randomPos.y,
                rotate: isFormed ? 0 : randomPos.rotate,
                scale: isFormed ? 1 : 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 14,
                delay: isFormed ? index * 0.12 : 0, // Efek rapi satu per satu jalan ngebentuk love
              }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
            >
              <img src={foto} alt="" className="w-full h-full object-cover rounded-md" />
            </motion.div>
          );
        })}

        {/* Tombol Heart berdenyut di tengah pola Love */}
        {isFormed && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ 
              scale: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
              opacity: { delay: 1.2 }
            }}
            onClick={onClickHeart}
            className="absolute z-40 bg-rose-500 hover:bg-rose-600 text-white p-5 rounded-full shadow-2xl cursor-pointer border-4 border-white flex items-center justify-center group transition-colors"
          >
            <Heart className="w-8 h-8 fill-white group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </div>
    </div>
  );
}