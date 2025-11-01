import React from "react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative w-full flex flex-col justify-start items-center bg-via-[#fff5f6]  overflow-hidden">
      {/* ✨ Nama pasangan muncul estetik */}
      <motion.img
        src="/nama.png"
        alt="Sela & Edo"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.8,
          duration: 1.5,
          ease: "easeOut",
        }}
        className="w-[80%] sm:w-[60%] md:w-[40%] mt-10 md:mt-16 drop-shadow-lg"
      />
    </header>
  );
}
