import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Bersama() {
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);

  const photos = [
    {
      id: 1,
      src: "/b1.jpg",
      caption:
        "Momen penuh tawa dan kebersamaan, di mana cinta tumbuh tanpa rencana.",
    },
    {
      id: 2,
      src: "/b2.jpg",
      caption:
        "Setiap detik bersamamu adalah kenangan indah yang tak tergantikan.",
    },
    {
      id: 3,
      src: "/6.png",
      caption: "Kita tidak sempurna, tapi bersama kita menjadi utuh.",
    },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      setIndex((prev) => (prev + 1) % photos.length);
    } else if (info.offset.x > 100) {
      setIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-gradient-to-b via-[#ffe9ee] to-white py-20 px-6 overflow-visible">
      {/* 🌸 Ornamen kiri */}
      <motion.img
        src="/kiri.png"
        alt="ornamen kiri"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 w-[180px] sm:w-[220px] opacity-90 pointer-events-none select-none"
      />

      {/* 🌸 Ornamen kanan */}
      <motion.img
        src="/kiri.png"
        alt="ornamen kanan"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 rotate-180 w-[180px] sm:w-[220px] opacity-90 pointer-events-none select-none"
      />

      {/* 🩷 Judul */}
      <h2 className="text-3xl sm:text-4xl font-script text-[#5b4636] mb-12 text-center z-10">
        Momen Spesial
      </h2>

      {/* 📱 Mobile Mode */}
      {isMobile ? (
        <div className="relative w-full flex justify-center items-center overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-[220px] h-[300px] bg-white border border-rose-100 rounded-3xl shadow-xl overflow-hidden flex-shrink-0 cursor-grab active:cursor-grabbing"
              onClick={() => setSelected(photos[index])}
            >
              <img
                src={photos[index].src}
                alt="foto"
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        // 💻 Desktop Mode
        <div className="relative flex items-center justify-center w-full max-w-5xl z-10 gap-12">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelected(photo)}
              whileHover={{ scale: 1.05 }}
              className={`cursor-pointer bg-white border border-rose-100 rounded-3xl shadow-xl overflow-hidden transition-transform duration-300 ${
                i === 1
                  ? "z-20 w-[260px] h-[320px]"
                  : "z-10 w-[240px] h-[300px]"
              }`}
              style={{
                transform:
                  i === 0
                    ? "rotate(-6deg)"
                    : i === 2
                    ? "rotate(6deg)"
                    : "rotate(0deg)",
              }}
            >
              <img
                src={photo.src}
                alt="foto"
                className="w-full h-full object-cover rounded-3xl"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* ✨ Popup detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className={`fixed inset-0 flex items-center justify-center z-50 ${
              isMobile ? "bg-black/40" : "bg-black/60"
            }`}
            onClick={() => setSelected(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.4 }}
              className={`${
                isMobile
                  ? "w-[85%] max-w-[320px] bg-white rounded-2xl shadow-lg flex flex-col items-center p-3"
                  : "bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl"
              }`}
            >
              {/* 📷 Foto */}
              <img
                src={selected.src}
                alt="foto"
                className={`${
                  isMobile
                    ? "w-[90%] h-[180px] object-cover rounded-xl mb-2"
                    : "md:w-1/2 w-full h-[350px] object-cover"
                }`}
              />

              {/* 🩷 Caption */}
              <div
                className={`${
                  isMobile
                    ? "px-3 pb-2 text-center"
                    : "md:w-1/2 p-8 text-center md:text-left bg-gradient-to-br from-[#fff8f9] to-[#ffeef0]"
                }`}
              >
                <h3 className="text-xl font-script text-[#5b4636] mb-2">
                  Momen Spesial
                </h3>
                <p className="text-[#6a5444] text-sm font-serif italic leading-relaxed">
                  {selected.caption}
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-3 px-4 py-2 bg-[#f9d9da] hover:bg-[#f3c9ca] rounded-full text-[#5b4636] text-sm font-medium transition"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
