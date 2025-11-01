import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Pembukaan({ onOpen}) {
  const [flowers, setFlowers] = useState([]);
  const weddingDate = new Date("2025-12-07T10:00:00"); // 📅 7 Desember 2025

  // 🌸 Efek bunga jatuh
  useEffect(() => {
    const generateFlower = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: 20 + Math.random() * 30,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 3,
    });

    const interval = setInterval(() => {
      setFlowers((prev) => {
        const newFlower = generateFlower();
        return [...prev.slice(-20), newFlower];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background: "linear-gradient(180deg, #faf6f1 0%, #f3e7db 100%)",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {/* 🌸 Bunga jatuh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {flowers.map((flower) => (
          <motion.img
            key={flower.id}
            src="/2.png"
            alt="bunga jatuh"
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: "110vh",
              opacity: [0.9, 1, 0.8],
              rotate: Math.random() * 360,
              x: Math.random() * 40 - 20,
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${flower.left}%`,
              width: `${flower.size}px`,
              height: "auto",
              filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.2))",
            }}
          />
        ))}
      </div>

      {/* 🌺 Bunga di empat sudut */}
      <img
        src="/flower-corner.png"
        alt="bunga kiri atas"
        className="absolute top-0 left-0 w-28 sm:w-40 md:w-52 opacity-95 select-none"
        style={{ transform: "scaleY(-1)" }}
      />
      <img
        src="/flower-corner.png"
        alt="bunga kanan atas"
        className="absolute top-0 right-0 w-28 sm:w-40 md:w-52 opacity-95 select-none"
        style={{ transform: "scale(-1, -1)" }}
      />
      <img
        src="/flower-corner.png"
        alt="bunga kiri bawah"
        className="absolute bottom-0 left-0 w-28 sm:w-40 md:w-52 opacity-95 select-none"
      />
      <img
        src="/flower-corner.png"
        alt="bunga kanan bawah"
        className="absolute bottom-0 right-0 w-28 sm:w-40 md:w-52 opacity-95 select-none"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* 🕊️ The Wedding of */}
      <motion.img
        src="/thewending.png"
        alt="The Wedding of"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-56 sm:w-64 md:w-72 mb-3 z-10 select-none"
        style={{
          opacity: 0.9,
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))",
        }}
      />

      {/* ✨ Nama pengantin utama */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl sm:text-6xl font-bold mb-2 z-10 text-center drop-shadow-md"
        style={{
          color: "#5b3a29",
          textShadow: "0 2px 6px rgba(139, 93, 60, 0.3)",
        }}
      >
        Sela & Edo
      </motion.h1>

      {/* 📅 Tanggal Pernikahan */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-lg sm:text-2xl italic mb-6 z-10 text-center"
        style={{
          color: "#8b6a4f",
          letterSpacing: "1px",
          background: "rgba(255,255,255,0.4)",
          padding: "0.3rem 1rem",
          borderRadius: "1rem",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        Minggu, 7 Desember 2025
      </motion.p>

      {/* 💞 Layout foto dan nama */}
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-20 z-10 mb-3">
        {/* 🧑 Edo */}
        <motion.div
          className="text-center md:text-right md:w-64"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2
            className="text-base sm:text-2xl font-semibold"
            style={{ color: "#5b3a29" }}
          >
            Edo Pratama
          </h2>
          <p
            className="italic text-sm sm:text-lg mt-1 leading-tight"
            style={{ color: "#8b6a4f" }}
          >
            Putra dari Bapak Arif & Ibu Wati
          </p>
        </motion.div>

        {/* 👰 Foto pasangan */}
        <motion.img
          src="/6.png"
          alt="Pasangan"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-64 sm:w-70 md:w-70 z-10 object-cover my-2 md:my-0"
        />

        {/* 👩 Sela */}
        <motion.div
          className="text-center md:text-left md:w-64"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <h2
            className="text-base sm:text-2xl font-semibold"
            style={{ color: "#5b3a29" }}
          >
            Sela Rahmawati
          </h2>
          <p
            className="italic text-sm sm:text-lg mt-1 leading-tight"
            style={{ color: "#8b6a4f" }}
          >
            Putri dari Bapak Dedi & Ibu Sari
          </p>
        </motion.div>
      </div>

      {/* 💌 Tombol buka — lebih dekat dengan gambar */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="px-8 py-3 rounded-full shadow-md transition z-10 font-medium tracking-wide mt-2"
        style={{
          background:
            "linear-gradient(90deg, #b88b65 0%, #d3a77c 50%, #b88b65 100%)",
          color: "white",
          boxShadow: "0 5px 15px rgba(184, 139, 101, 0.4)",
        }}
      >
        Buka Undangan
      </motion.button>
    </div>
  );
}

export default Pembukaan;
