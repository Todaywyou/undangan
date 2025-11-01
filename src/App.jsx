import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Isi from "./Pages/Isi";

export default function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.warn("⚠️ Autoplay diblokir:", err);
        });
      }
    };

    // ✅ Coba langsung play (desktop)
    playAudio();

    // ✅ Dengarkan interaksi pertama (HP / iOS)
    document.addEventListener("click", playAudio, { once: true });
    document.addEventListener("touchstart", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 🎶 Pemutar musik global */}
      <audio
        ref={audioRef}
        src="/lagu.mp3"
        loop
        preload="auto"
        onPlay={() => console.log("✅ Lagu berhasil diputar")}
        onError={(e) => console.error("❌ Gagal memuat lagu.mp3", e)}
        style={{ display: "none" }}
      />

      {/* Semua halaman */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/isi" element={<Isi />} />
      </Routes>
    </BrowserRouter>
  );
}
