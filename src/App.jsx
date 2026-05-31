import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MailOpen, Mail, Anchor, Volume2, VolumeX, ExternalLink } from 'lucide-react'; 

// ==========================================
// 1. IMPORT ASET FOTO & AUDIO
// ==========================================
import foto1 from './assets/foto1.jpg';
import foto2 from './assets/foto2.jpg';
import foto3 from './assets/foto3.jpg';
import foto4 from './assets/foto4.jpg';
import foto5 from './assets/foto5.jpg';
import foto6 from './assets/foto6.jpg';
import foto7 from './assets/foto7.jpg';
import foto8 from './assets/foto8.jpg';
import foto9 from './assets/foto9.jpg';
import foto10 from './assets/foto10.jpg';
import laguSpesial from './assets/musik.mp3';

const daftarFoto = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8, foto9, foto10];

// ==========================================
// BACKGROUND LAUT CERAH
// ==========================================
function OceanBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-gradient-to-b from-sky-400 via-blue-400 to-cyan-500">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.4),transparent_60%)] opacity-40 animate-gleam" />
      
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/30 rounded-full backdrop-blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: `-10%`,
            width: `${Math.random() * 12 + 6}px`,
            height: `${Math.random() * 12 + 6}px`,
            animation: `floatUp ${Math.random() * 5 + 5}s linear infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="absolute bottom-0 w-full opacity-20 animate-wave">
        <svg viewBox="0 0 1440 320" className="w-full h-24 md:h-40 fill-white">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1440,112L1440,320L0,320Z"></path>
        </svg>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-5px) scaleY(1.02); }
        }
        @keyframes gleam {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-wave { animation: wave 6s ease-in-out infinite; }
        .animate-gleam { animation: gleam 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

// ==========================================
// EFEK MERCUN LOVE
// ==========================================
function MercunLove() {
  const partikel = [
    { left: '20%', top: '25%', textShadow: '20px -30px 0 #f43f5e, -30px 30px 0 #38bdf8', delay: '0s' },
    { left: '75%', top: '35%', textShadow: '-20px -20px 0 #fbbf24, 30px 20px 0 #22d3ee', delay: '0.4s' },
    { left: '50%', top: '15%', textShadow: '30px 30px 0 #a855f7, -30px -30px 0 #34d399', delay: '0.2s' },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {partikel.map((p, i) => (
        <div key={i} className="absolute text-xl md:text-2xl opacity-0" style={{ left: p.left, top: p.top, textShadow: p.textShadow, animation: `ledakan 1.5s ease-out infinite`, animationDelay: p.delay }}> ❤️ </div>
      ))}
      <style>{`
        @keyframes ledakan {
          0% { transform: scale(0.1); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; filter: blur(1px); }
        }
      `}</style>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN COUNTDOWN (RESPONSIF)
// ==========================================
function CountdownComponent({ onFinish }) {
  const TARGET_DATE = '2026-06-02T00:00:00';
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(TARGET_DATE) - +new Date();
      if (difference <= 0) {
        clearInterval(timer);
        onFinish();
      } else {
        setTimeLeft({
          hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
          jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
          menit: Math.floor((difference / 1000 / 60) % 60),
          detik: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center p-6 md:p-12 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 max-w-[90%], sm:max-w-md md:max-w-lg w-full mx-4 relative z-10 text-white font-poppins">
      <div className="flex justify-center mb-3 text-cyan-100"> <Anchor className="w-6 h-6 md:w-8 md:h-8 animate-pulse" /> </div>
      <h2 className="text-lg md:text-2xl font-fredoka font-bold tracking-widest uppercase text-cyan-500 bg-white/90 px-4 py-1.5 rounded-full inline-block shadow-md">Wina's Day Voyage</h2>
      
      {/* Grid responsif: kecil di HP, normal di tablet/PC */}
      <div className="grid grid-cols-4 gap-2 md:gap-4 justify-center mt-6 md:mt-8">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-full aspect-square max-w-[64px] md:max-w-[80px] bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-3xl font-black shadow-xl border border-white/20">
              {String(value || 0).padStart(2, '0')}
            </div>
            <span className="text-[10px] md:text-xs text-cyan-100 font-semibold mt-1.5 md:mt-2.5 capitalize tracking-wider">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. KOMPONEN SLIDE ALBUM (AUTOPLAY + SIZE FIX)
// ==========================================
function AlbumComponent({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < 9) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleManualClick = () => {
    if (currentIndex < 9) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 relative z-10 font-poppins w-full max-w-[95vw]">
      <p className="text-cyan-100 text-[11px] md:text-xs tracking-wider font-medium mb-3 md:mb-4 animate-pulse bg-blue-600/30 px-3 py-1 rounded-full backdrop-blur-sm">
        🌊 Memori berputar otomatis... ({currentIndex + 1}/10)
      </p>
      
      {/* Menggunakan max-w dan aspect-ratio biar ga meledak di layar hp kecil */}
      <div 
        className="relative w-full max-w-[340px] md:max-w-[360px] h-[450px] md:h-[490px] bg-white p-3 md:p-4 rounded-3xl shadow-2xl border border-cyan-100 cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-cyan-900/20 transition-all" 
        onClick={handleManualClick}
      >
        <div className="w-full h-[82%] rounded-2xl overflow-hidden bg-sky-50 relative shadow-inner">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={currentIndex}
              src={daftarFoto[currentIndex]}
              className="w-full h-full object-cover absolute"
              initial={{ opacity: 0, x: 150, rotate: 3, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, x: -150, rotate: -3, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 95, damping: 15 }}
            />
          </AnimatePresence>
        </div>
        <div className="h-[15%] flex items-center justify-center text-center">
          <p className="text-blue-900 font-medium text-xs md:text-sm px-1 leading-tight md:leading-normal">
            {currentIndex === 0 && "Your beautiful smile, bright as the ocean sun..."}
            {currentIndex === 1 && "Every single day with you is a grand blessing..."}
            {currentIndex === 2 && "The way you laugh is my absolute favorite thing..."}
            {currentIndex === 3 && "Thank you for always being right by my side..."}
            {currentIndex === 4 && "No matter what they say, you're always the prettiest..."}
            {currentIndex === 5 && "Hope your special day is as bright as your soul..."}
            {currentIndex === 6 && "Sailing through every up and down together..."}
            {currentIndex === 7 && "In every life, I'd still choose you..."}
            {currentIndex === 8 && "Cheers to countless more sweet memories..."}
            {currentIndex === 9 && "Tap once more for the final surprise... ❤️"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. KOMPONEN LOVE GALLERY (RESPONSIF KORDINAT)
// ==========================================
function LoveGalleryComponent({ onClickHeart }) {
  const [isFormed, setIsFormed] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsFormed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Koordinat formasi love (Skala dikontrol via CSS transform agar pas di HP/PC)
  const lovePositions = [{ x: 0, y: -130 }, { x: -80, y: -175 }, { x: -160, y: -115 }, { x: -180, y: -10 }, { x: -120, y: 95 }, { x: 0, y: 190 }, { x: 120, y: 95 }, { x: 180, y: -10 }, { x: 160, y: -115 }, { x: 80, y: -175 }];

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden z-10 font-poppins">
      <p className="absolute top-6 md:top-10 text-white font-medium bg-blue-900/40 px-4 py-1.5 rounded-full backdrop-blur-sm animate-pulse text-xs md:text-sm text-center max-w-[85%]">
        {isFormed ? "💙 Sentuh jantung samudera di tengah untuk suratnya 💙" : "Menyusun rangkaian dermaga cintamu..."}
      </p>
      
      {/* Menggunakan responsive scale: Mengecil di HP (scale-65), normal di monitor */}
      <div className="relative w-full h-full flex items-center justify-center scale-[0.65] sm:scale-75 md:scale-95 lg:scale-100">
        {daftarFoto.map((foto, index) => {
          const lovePos = lovePositions[index];
          return (
            <motion.div key={index} className="absolute w-24 h-32 md:w-28 md:h-36 bg-white p-1.5 rounded-xl shadow-2xl border border-cyan-100 overflow-hidden" animate={{ x: isFormed ? lovePos.x : (Math.sin(index) * 140), y: isFormed ? lovePos.y : (Math.cos(index) * 140), rotate: isFormed ? 0 : index * 25 }} transition={{ type: "spring", stiffness: 45, damping: 13, delay: isFormed ? index * 0.08 : 0 }}>
              <img src={foto} className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          );
        })}
        {isFormed && (
          <motion.button animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} onClick={onClickHeart} className="absolute z-40 bg-gradient-to-tr from-blue-500 to-cyan-400 text-white p-5 md:p-6 rounded-full shadow-2xl border-4 border-white cursor-pointer">
            <Heart className="w-8 h-8 md:w-10 md:h-10 fill-white" />
          </motion.button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. KOMPONEN SURAT INTERAKTIF (MOBILE OPTIMIZED)
// ==========================================
function LetterComponent({ onFinishClose }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center p-4 relative z-10 w-full max-w-[90vw] md:max-w-xl font-poppins">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="envelope" className="bg-white/90 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-2xl border border-white max-w-sm w-full flex flex-col items-center cursor-pointer text-center" onClick={() => setIsOpen(true)} whileHover={{ scale: 1.02 }} exit={{ opacity: 0, y: -40 }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan-50 rounded-full flex items-center justify-center text-cyan-500 mb-4 animate-bounce"> <Mail className="w-8 h-8 md:w-10 md:h-10" /> </div>
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-blue-900 tracking-wide">A Message from the Deep Sea</h2>
          </motion.div>
        ) : (
          <motion.div key="letter" className="bg-amber-50 p-5 md:p-12 rounded-3xl shadow-2xl border-2 border-amber-100/60 w-full max-h-[75vh] md:max-h-[550px] overflow-y-auto relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 100, filter: "blur(10px)", scale: 0.8 }}>
            <div className="flex justify-center text-cyan-600 mb-2"> <MailOpen className="w-6 h-6 md:w-8 md:h-8" /> </div>
            <h2 className="text-center font-fredoka font-bold text-xl md:text-2xl text-blue-950 mb-4 md:mb-6 border-b pb-2">Dear Winaaa,</h2>
            <div className="text-sm md:text-[15px] text-slate-800 leading-relaxed space-y-4 px-1 md:px-4">
              <p>Terima kasih sudah bertahan sejauh ini.</p>
              <p>Memasuki usia yang baru ini semoga hidup wina berjalan layaknya samudra yang luas yang penuh dengan mimpi-mimpi yang sedang pasang dan keberanian yang sedalam lautan. Selamat atas bertambahnya angka usia dan berkurangnya jatah hidup di dunia. Wina itu manusia yang paling di nantikan hadirnya yang tumbuh menjadi manusia tangguh buat menghadapi dunia.</p>
              <p>Diantara banyaknya sedih bahkan sempit yang menghampiri mu, semoga kamu selalu diberi alasan kecil yang mampu membangkitkan semangatmu untuk terus memperjuangkan mimpi baikmuu</p>
              <p>selalu berterima kasih kepada dirimu sendiri karena kalau bukan karena dirimu yang hebat mungkin wina gabakal kuat menginjak di usia ini </p>
              <p>Hope your special day is as incredible as you are!</p>
              <p className="text-center text-xl md:text-3xl font-bold font-fredoka text-blue-600 pt-3">Happy Birthday, Winaaa! 🌊💙</p>
            </div>
            <button onClick={onFinishClose} className="mt-6 md:mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full block mx-auto cursor-pointer shadow-md"> Tutup Surat 💙 </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 6. ANIMASI CLOSING HEART (RESPONSIF ADJUSTED)
// ==========================================
function FinalHeartComponent() {
  const [faseKondisi, setFaseKondisi] = useState("BERSERAKAN");
  const TARGET_URL = "https://Mhdelpan123.github.io";

  useEffect(() => {
    const timer = setTimeout(() => setFaseKondisi("BENTUK_LOVE"), 1800);
    return () => clearTimeout(timer);
  }, []);

  const posisiBerserakan = [{ x: -160, y: -180, r: -35 }, { x: 160, y: -150, r: 45 }, { x: -150, y: 160, r: -45 }, { x: 170, y: 150, r: 35 }, { x: -50, y: -220, r: 15 }, { x: 60, y: 210, r: -20 }, { x: -180, y: 10, r: 45 }, { x: 190, y: -10, r: -45 }, { x: -30, y: 120, r: -10 }, { x: 40, y: -110, r: 25 }];
  const posisiLoveFinal = [{ x: 0, y: -120 }, { x: -75, y: -160 }, { x: -150, y: -100 }, { x: -165, y: -10 }, { x: -110, y: 80 }, { x: 0, y: 160 }, { x: 110, y: 80 }, { x: 165, y: -10 }, { x: 150, y: -100 }, { x: 75, y: -160 }];
  
  return (
    <div className="relative w-screen h-screen flex items-center justify-center z-10 font-poppins">
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-8 md:top-12 text-center z-30 px-4">
          <h2 className="text-xl md:text-3xl font-black font-fredoka text-white drop-shadow-md">{faseKondisi === "BERSERAKAN" ? "Whoops! 🌊" : "I Love You Forever, Wina 🌊💙"}</h2>
          {faseKondisi === "BENTUK_LOVE" && <p className="text-cyan-100 text-[10px] md:text-xs mt-1 tracking-widest uppercase">Perjalanan kita belum usai...</p>}
        </motion.div>
      </AnimatePresence>

      {/* Kontainer foto closing di-scale responsif biar gak nabrak tepi HP */}
      <div className="relative w-full h-full flex items-center justify-center scale-[0.65] sm:scale-75 md:scale-95 lg:scale-100">
        {daftarFoto.map((foto, index) => {
          const acak = posisiBerserakan[index];
          const love = posisiLoveFinal[index];
          return (
            <motion.div key={index} className="absolute w-24 h-32 md:w-28 md:h-36 bg-white p-1.5 rounded-xl shadow-2xl border border-cyan-100 overflow-hidden" animate={{ x: faseKondisi === "BERSERAKAN" ? acak.x : love.x, y: faseKondisi === "BERSERAKAN" ? acak.y : love.y, rotate: faseKondisi === "BERSERAKAN" ? acak.r : 0 }} transition={{ type: "spring", stiffness: faseKondisi === "BERSERAKAN" ? 110 : 40, damping: 11, delay: index * 0.04 }}>
              <img src={foto} className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          );
        })}
        
        {faseKondisi === "BENTUK_LOVE" && (
          <motion.a
            href={TARGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.1, 1], opacity: 1 }}
            transition={{ delay: 1.5, scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
            className="absolute z-40 bg-white text-blue-600 px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-2xl border-4 border-cyan-100 flex items-center gap-2 cursor-pointer text-sm md:text-base font-fredoka font-bold tracking-wide"
          >
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
            <span>Lanjut Voyage</span>
          </motion.a>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 7. MAIN APP CONTROLLER
// ==========================================
export default function App() {
  const [fase, setFase] = useState("COUNTDOWN");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const words = ["Happy", "Birthday", "Winaaa!!"];

  const toggleMute = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (fase === "ANIMASI_TEKS") {
      if (audioRef.current) audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
      const timer = setTimeout(() => setFase("ALBUM_BUKU"), 4000);
      return () => clearTimeout(timer);
    }
  }, [fase]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden selection:bg-cyan-200">
      <audio ref={audioRef} src={laguSpesial} loop />
      <OceanBackground />
      {fase !== "COUNTDOWN" && (
        <button onClick={toggleMute} className="absolute top-3 right-3 md:top-4 md:right-4 z-50 bg-white/20 backdrop-blur-md p-2 md:p-3 rounded-full border border-white/30 text-white cursor-pointer shadow-md">
          {isPlaying ? <Volume2 className="w-4 h-4 md:w-5 md:h-5 animate-pulse" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5" />}
        </button>
      )}
      <AnimatePresence mode="wait">
        {fase === "COUNTDOWN" && ( <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}> <CountdownComponent onFinish={() => setFase("ANIMASI_TEKS")} /> </motion.div> )}
        {fase === "ANIMASI_TEKS" && (
          <div className="relative w-full h-full flex flex-col items-center justify-center z-10 font-fredoka">
            <MercunLove />
            <motion.div key="2" className="flex flex-wrap justify-center gap-x-2 md:gap-x-4 gap-y-1 max-w-2xl px-6 text-center" exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}>
              {words.map((word, index) => ( <motion.span key={index} className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] italic" initial={{ opacity: 0, y: 30, scale: 0.7 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", delay: index * 0.25 }}> {word} </motion.span> ))}
            </motion.div>
          </div>
        )}
        {fase === "ALBUM_BUKU" && ( <motion.div key="3" initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}> <AlbumComponent onFinish={() => setFase("LOVE_STORY")} /> </motion.div> )}
        {fase === "LOVE_STORY" && ( <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}> <LoveGalleryComponent onClickHeart={() => setFase("SURAT")} /> </motion.div> )}
        {fase === "SURAT" && ( <motion.div key="5" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}> <LetterComponent onFinishClose={() => setFase("FINAL_HEART")} /> </motion.div> )}
        {fase === "FINAL_HEART" && ( <motion.div key="6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}> <FinalHeartComponent /> </motion.div> )}
      </AnimatePresence>
    </div>
  );
}
