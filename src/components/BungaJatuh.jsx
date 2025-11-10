// src/components/BungaJatuh.jsx
import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function BungaJatuh() {
  const flowers = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        size: 20 + Math.random() * 40,
        duration: 8 + Math.random() * 5,
        delay: Math.random() * 6,
        img: `/bunga${(i % 3) + 1}.png`,
      });
    }
    return arr;
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {flowers.map((flower) => (
        <motion.img
          key={flower.id}
          src={flower.img}
          alt="bunga jatuh"
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: "110vh",
            opacity: [0.9, 1, 0.8],
            rotate: Math.random() * 360,
            x: Math.random() * 50 - 25,
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
            width: `${flower.size}px`,
            height: "auto",
            filter: "drop-shadow(0 3px 3px rgba(0,0,0,0.15))",
          }}
        />
      ))}
    </div>
  );
}
