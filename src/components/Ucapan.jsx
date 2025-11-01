import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbysbQ2eeH6cSIjVIO02lxx62LMoyM-4uCSiI5D_zaMIfi_GC47BxuA9BQtF9kDpC9qr/exec";

export default function Ucapan() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [ucapanList, setUcapanList] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Ambil semua ucapan dari Google Sheet
  const fetchUcapan = async () => {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      setUcapanList(data.reverse());
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchUcapan();
  }, []);

  // 🔹 Kirim ucapan baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !pesan) return;
    setLoading(true);

    const newUcapan = { nama, pesan };

    try {
      // Kirim ke Google Sheet
      await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUcapan),
      });

      // Tampilkan langsung di bawah form
      setUcapanList((prev) => [newUcapan, ...prev]);

      // Reset input
      setNama("");
      setPesan("");
    } catch (error) {
      console.error("Gagal mengirim:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center py-16 px-6 bg-white overflow-hidden">
      {/* Background gradasi lembut */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-100 via-white to-pink-50 pointer-events-none"
      />

      {/* Judul animasi */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl font-semibold text-[#5b4636] mb-6 relative z-10"
      >
        Kirim Ucapan untuk Pengantin 💌
      </motion.h2>

      {/* Form kirim ucapan */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/70 backdrop-blur-md border border-pink-100 rounded-2xl shadow-md p-6 w-full max-w-md relative z-10"
      >
        <input
          type="text"
          placeholder="Nama kamu..."
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full mb-3 px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <textarea
          placeholder="Tulis ucapan bahagia..."
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
        ></textarea>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#f9c9d4] to-[#f8a5b3] text-[#5b4636] font-medium py-2 rounded-xl shadow hover:scale-105 transition-transform"
        >
          {loading ? "Mengirim..." : "Kirim Ucapan 💖"}
        </button>
      </motion.form>

      {/* Daftar ucapan */}
      <div className="mt-10 w-full max-w-md space-y-4 relative z-10">
        {ucapanList.length === 0 ? (
          <p className="text-center text-[#7b6a5a] italic">
            Belum ada ucapan 💐
          </p>
        ) : (
          ucapanList.map((u, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-pink-50 border border-pink-100 rounded-xl p-4 shadow-sm"
            >
              <p className="text-[#5b4636] font-semibold">{u.nama}</p>
              <p className="text-[#7b6a5a] text-sm mt-1">{u.pesan}</p>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
