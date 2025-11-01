import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Isi from "./Pages/Isi"; // ✅ Tambah import halaman isi

export default function App() {
  const audioRef = useRef(null);

  // 🎵 Mulai lagu otomatis setelah interaksi pertama (aturan browser)
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
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
        style={{ display: "none" }}
      />

      {/* Semua halaman */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/isi" element={<Isi />} /> {/* ✅ route baru */}
      </Routes>
    </BrowserRouter>
  );
}
