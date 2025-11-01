import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";

export default function Rek() {
  const [text, setText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [clickedIndex, setClickedIndex] = useState(null);
  const fullText = "Kirim Amplop Digital";

  // 🩷 Efek mengetik setiap kali halaman dibuka
  useEffect(() => {
    setText("");
    setShowContent(false);
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(typing);
        setTimeout(() => setShowContent(true), 300);
      }
    }, 80);
    return () => clearInterval(typing);
  }, [window.location.pathname]); // reset ketika halaman ini dimasuki

  const rekenings = [
    { bank: "BCA", no: "8435439841", nama: "Nabilah Pramasshella" },
    { bank: "BRI", no: "220601004891500", nama: "Eko Rikardo" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden px-6 py-24">
      <motion.div
        key={window.location.pathname} // trigger ulang animasi setiap buka halaman
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col items-center text-center"
      >
        {/* ✨ Efek mengetik judul */}
        <motion.h2
          className="text-4xl sm:text-5xl font-serif text-[#5b4636] mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="ml-1 inline-block w-1 bg-[#5b4636] align-middle"
          />
        </motion.h2>

        <AnimatePresence>
          {showContent && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="max-w-xl"
            >
              <motion.p
                className="text-[#6a5444] font-serif italic text-lg leading-relaxed mb-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                Terima kasih atas doa dan restu Anda. Jika berkenan berbagi
                kebahagiaan, berikut rekening pengantin:
              </motion.p>

              {/* 🌷 Rekening muncul dari samping */}
              <div className="space-y-8">
                {rekenings.map((rek, idx) => (
                  <motion.div
                    key={rek.no}
                    initial={{
                      opacity: 0,
                      x: idx % 2 === 0 ? -80 : 80,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.9, ease: "easeOut" },
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      setClickedIndex(idx);
                      setTimeout(() => setClickedIndex(null), 400);
                    }}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#fff3f5] to-[#ffe9eb] border border-[#ffdce0]/60 shadow-sm cursor-pointer relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        scale: clickedIndex === idx ? 1.08 : 1,
                        transition: {
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        },
                      }}
                    />
                    <p className="text-2xl font-serif text-[#5b4636] relative z-10">
                      💖 {rek.bank} — {rek.no}
                    </p>
                    <p className="text-sm text-[#7a6050] italic mt-1 relative z-10">
                      a.n. {rek.nama}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tombol kontak */}
              <motion.a
                href="https://wa.me/6282177948310?text=Halo%20kami%20ingin%20menghubungi%20pengantin%20terkait%20amplop%20digital%20💌"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mt-14 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#ffd6da] to-[#ffe9eb] text-[#5b4636] font-medium shadow-sm hover:shadow-md transition-all"
              >
                <Phone size={18} />
                Hubungi Pengantin
              </motion.a>

          
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
