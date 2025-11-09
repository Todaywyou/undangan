import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function IsiUcapan() {
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [daftarPesan, setDaftarPesan] = useState([]);
  const scrollRef = useRef(null);

  // Ambil data realtime dari Firestore
  useEffect(() => {
    const q = query(collection(db, "ucapan"), orderBy("waktu", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDaftarPesan(data);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [daftarPesan]);

  const kirimPesan = async () => {
    if (!nama.trim() || !pesan.trim()) {
      alert("Nama dan pesan tidak boleh kosong!");
      return;
    }
    try {
      await addDoc(collection(db, "ucapan"), {
        nama: nama.trim(),
        pesan: pesan.trim(),
        waktu: serverTimestamp(),
      });
      setPesan("");
    } catch (e) {
      console.error("Gagal kirim ucapan:", e);
    }
  };

  const warnaAvatar = (text) => {
    const colors = [
      "bg-pink-400",
      "bg-purple-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-amber-400",
      "bg-rose-400",
      "bg-teal-400",
    ];
    const i = text.charCodeAt(0) % colors.length;
    return colors[i];
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6 bg-gradient-to-b from-pink-50 to-white rounded-2xl shadow-md">
      {/* Judul */}
      <h2 className="text-center text-lg font-semibold text-pink-600 mb-4 flex items-center justify-center gap-2">
        💌 Kirim Ucapan
      </h2>

      {/* Daftar Ucapan (scrollable) */}
      <div className="max-h-96 overflow-y-auto space-y-3 mb-4 px-1">
        {daftarPesan.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            Belum ada ucapan 😄
          </p>
        ) : (
          daftarPesan.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 bg-white border border-pink-100 rounded-xl p-3 shadow-sm"
            >
              {/* Avatar huruf depan */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm ${warnaAvatar(
                  item.nama || "?"
                )}`}
              >
                {item.nama ? item.nama.charAt(0).toUpperCase() : "?"}
              </div>

              {/* Isi ucapan */}
              <div className="flex-1">
                <p className="font-semibold text-pink-600 text-sm">
                  {item.nama}
                </p>
                <p className="text-gray-700 text-sm">{item.pesan}</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {item.waktu
                    ? new Date(item.waktu.toDate()).toLocaleString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                      })
                    : "Baru saja"}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* Form input */}
      <div className="bg-white border border-pink-100 rounded-xl p-3 shadow-sm space-y-2">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu..."
          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapanmu..."
          className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-16"
        />
        <button
          onClick={kirimPesan}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-lg transition-all shadow-sm"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
