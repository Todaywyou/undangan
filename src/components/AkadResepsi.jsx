import React, { useMemo } from "react";
import { motion } from "framer-motion";

export default function AkadResepsi() {


  return (
    <section className="relative w-full flex flex-col items-center justify-center bg-white py-20 px-6 overflow-visible">
    

      {/* 🩷 Judul Utama */}
      <motion.img
        src="/judul.png"
        alt="Akad & Resepsi"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-[260px] sm:w-[320px] md:w-[380px] lg:w-[420px] mb-12 z-10"
      />

      {/* 💍 Bagian Akad */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-[#ffe9ec]/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#fdd5da] p-8 sm:p-10 mb-10 max-w-3xl w-full text-center z-10"
      >
        <motion.img
          src="/akad.png"
          alt="Akad Nikah"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 w-[200px] sm:w-[260px] md:w-[300px]"
        />

        <p className="text-[#6a5444] mb-2 font-serif italic">
          Jumat, 5 Desember 2025
        </p>
        <p className="text-[#6a5444] mb-2 font-serif">
          Pukul 13.30 WIB - Selesai
        </p>
        <p className="text-[#6a5444] font-serif mb-4">
          Jln. Sentosa Mega Mendung Lr. Talang Kemang Rt 32 Rw.09 (Dekat mesjid
          sukalilah)
        </p>

        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2918701454085!2d104.79825907496512!3d-3.002633896949872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9d78f627feaf%3A0x43d49388581d760!2sMasjid%20Sukailah!5e0!3m2!1sid!2sid!4v1730264000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        </div>

        <a
          href="https://maps.app.goo.gl/eY6MEGrkEib77cCa8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 px-6 py-2 bg-[#f9d9da] hover:bg-[#f3c9ca] rounded-full text-[#5b4636] font-medium transition"
        >
          Buka di Google Maps
        </a>
      </motion.div>

      {/* 🎉 Bagian Resepsi */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-[#ffe9ec]/90 backdrop-blur-sm shadow-lg rounded-3xl border border-[#fdd5da] p-8 sm:p-10 max-w-3xl w-full text-center z-10"
      >
        <motion.img
          src="/resepsi.png"
          alt="Resepsi"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-6 w-[200px] sm:w-[260px] md:w-[300px]"
        />

        <p className="text-[#6a5444] mb-2 font-serif italic">
          Minggu, 7 Desember 2025
        </p>
        <p className="text-[#6a5444] mb-2 font-serif">
          Pukul 10.00 WIB - Selesai
        </p>
        <p className="text-[#6a5444] font-serif mb-4">
          Jln. Sentosa Mega Mendung Lr. Talang Kemang Rt 32 Rw.09 (Dekat mesjid
          sukalilah)
        </p>

        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2918701454085!2d104.79825907496512!3d-3.002633896949872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b9d78f627feaf%3A0x43d49388581d760!2sMasjid%20Sukailah!5e0!3m2!1sid!2sid!4v1730264000000!5m2!1sid!2sid"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0"
          ></iframe>
        </div>

        <a
          href="https://maps.app.goo.gl/eY6MEGrkEib77cCa8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 px-6 py-2 bg-[#f9d9da] hover:bg-[#f3c9ca] rounded-full text-[#5b4636] font-medium transition"
        >
          Buka di Google Maps
        </a>
      </motion.div>
    </section>
  );
}
