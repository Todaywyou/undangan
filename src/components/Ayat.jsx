import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Burung from "./Burung";

export default function Ayat() {
  const fullText = `“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”`;
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 35; // kecepatan ketikan (ms per huruf)

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, typingSpeed);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center bg-[#fffdfb] overflow-hidden py-20 px-6">
      {/* 🕊️ Animasi Burung */}
      <Burung />

      {/* 🌷 Ayat muncul satu per satu */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative max-w-3xl"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-[#5b4636] leading-relaxed italic whitespace-pre-line">
          {displayedText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-1 h-6 bg-[#5b4636] ml-1 align-middle"
          />
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 12.5, duration: 2.2 }}
          className="mt-6 text-lg md:text-xl text-[#7a6759] font-medium"
        >
          — QS. Ar-Rum (30): 21 —
        </motion.p>
      </motion.div>
    </section>
  );
}
