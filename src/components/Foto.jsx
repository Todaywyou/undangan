import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function Foto() {
  // 🌸 Membuat posisi bunga acak yang tidak bertumpuk
  const flowers = useMemo(() => {
    const count = window.innerWidth < 768 ? 14 : 20;
    const used = [];
    const minDistance = 12;
    const safe = (pos) =>
      used.every(
        (p) => Math.hypot(p.left - pos.left, p.top - pos.top) > minDistance
      );

    const result = [];
    while (result.length < count) {
      const pos = { left: Math.random() * 85 + 5, top: Math.random() * 85 + 5 };
      if (safe(pos)) {
        used.push(pos);
        result.push({
          id: result.length,
          ...pos,
          size: 24 + Math.random() * 40,
          delay: Math.random() * 4,
          duration: 3 + Math.random() * 4,
        });
      }
    }
    return result;
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#fffdfb] via-[#fff5f6] to-[#ffeef0] py-16 px-4 sm:py-20 sm:px-6 overflow-hidden">
      {/* 🌸 Latar belakang bunga */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {flowers.map((flower) => (
          <motion.img
            key={flower.id}
            src="/kedip.png"
            alt="bunga"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.05, 1],
              rotate: Math.random() * 10 - 5,
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${flower.left}%`,
              top: `${flower.top}%`,
              width: `${flower.size}px`,
              height: "auto",
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))",
            }}
          />
        ))}
      </div>

      {/* 🕊️ Foto Mempelai Perempuan */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center text-center z-10"
      >
        <div className="relative rounded-full overflow-hidden shadow-lg border-4 border-rose-200 w-44 h-44 sm:w-60 sm:h-60 bg-white flex items-center justify-center">
          <img
            src="/wanita1.jpg"
            alt="Mempelai Wanita"
            className="w-full h-full object-contain bg-white scale-105"
          />
        </div>
        <h3 className="mt-5 text-xl sm:text-3xl font-script text-[#5b4636]">
          Nabila Prama Shella
        </h3>
        <p className="mt-2 text-sm sm:text-lg text-[#7a6759] italic">
          Anak Pertama dari Bpk Yudi Irawan & Ibu Rini Sundari
        </p>
      </motion.div>

      {/* 💞 Deskripsi */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="max-w-md sm:max-w-2xl text-center my-12 sm:my-16 z-10"
      >
        <p className="text-base sm:text-xl md:text-2xl text-[#6a5444] leading-relaxed font-serif italic">
          “Allah telah menumbuhkan cinta di antara dua hati yang tidak saling
          mengenal, lalu mempersatukan mereka dalam kasih dan janji suci.”
        </p>
      </motion.div>

      {/* 💍 Foto Mempelai Laki-laki */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center text-center z-10"
      >
        <div className="relative rounded-full overflow-hidden shadow-lg border-4 border-rose-200 w-44 h-44 sm:w-60 sm:h-60 bg-white flex items-center justify-center">
          <img
            src="/laki1.jpg"
            alt="Mempelai Pria"
            className="w-full h-full object-contain bg-white scale-105"
          />
        </div>
        <h3 className="mt-5 text-xl sm:text-3xl font-script text-[#5b4636]">
          Edo Rikardo
        </h3>
        <p className="mt-2 text-sm sm:text-lg text-[#7a6759] italic">
          Anak Pertama dari Bpk Supriyanto & Ibu Herawati
        </p>
      </motion.div>
    </section>
  );
}
