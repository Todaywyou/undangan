import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Isi from "./Pages/Isi";

export default function App() {
  const audioRef = useRef(null);

  // ✅ Jalankan musik setelah interaksi pertama pengguna
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => console.log("🎵 Musik mulai diputar"))
          .catch((err) => console.warn("⚠️ Autoplay diblokir:", err));
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  return (
    <BrowserRouter>
      {/* 🎶 Pemutar musik global */}
      <audio
        ref={audioRef}
        src="/lagu.mp3"
        autoPlay
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
