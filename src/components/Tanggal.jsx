import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Tanggal() {
  const [clicked, setClicked] = useState(null);
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 20 + Math.random() * 25,
        delay: Math.random() * 5,
        duration: 6 + Math.random() * 5,
      });
    }
    setFlowers(arr);
  }, []);

  const dateData = [
    { value: "07", color: "from-pink-300 to-rose-400" },
    { value: "12", color: "from-rose-300 to-pink-400" },
    { value: "2025", color: "from-pink-200 to-rose-300" },
  ];

  return (
    <div className="relative flex justify-center items-center w-full py-10 bg-gradient-to-b from-pink-50 to-rose-100 overflow-hidden md:rounded-none rounded-2xl shadow-md mx-auto transition-all duration-500">
      {/* 🌸 Bunga jatuh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {flowers.map((flower) => (
          <motion.img
            key={flower.id}
            src="/2.png"
            alt="bunga jatuh"
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: "110%",
              opacity: [0.9, 1, 0.8],
              rotate: Math.random() * 360,
              x: Math.random() * 40 - 20,
            }}
            transition={{
              duration: flower.duration,
              delay: flower.delay,
              ease: "easeInOut",
              repeat: Infinity,
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

      {/* 🌸 Bulatan tanggal */}
      <div className="relative flex justify-center items-center gap-3 sm:gap-6 md:gap-10 z-10 px-2 flex-wrap sm:flex-nowrap">
        {dateData.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => setClicked(clicked === index ? null : index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: clicked === index ? 1.25 : 1,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 25px rgba(255, 182, 193, 0.7)",
            }}
            className={`relative flex flex-col justify-center items-center text-white rounded-full shadow-lg border border-pink-100 cursor-pointer transition-all duration-500 bg-gradient-to-br ${item.color}
              w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 md:w-32 md:h-32`}
          >
            <p className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
              {item.value}
            </p>

            {/* shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
