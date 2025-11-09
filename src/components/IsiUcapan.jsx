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
  const [pesan, setPesan] = useState("");
  const [daftarPesan, setDaftarPesan] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "ucapan"), orderBy("waktu", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDaftarPesan(data);
    });
    return () => unsubscribe();
  }, []);

  // Auto scroll ke bawah saat pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [daftarPesan]);

  const kirimPesan = async () => {
    if (!pesan.trim()) return alert("Pesan tidak boleh kosong!");
    try {
      await addDoc(collection(db, "ucapan"), {
        pesan: pesan.trim(),
        waktu: serverTimestamp(),
      });
      setPesan("");
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden flex flex-col h-[80vh]">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 text-center font-semibold text-lg shadow-md">
        💌 Kirim Ucapan
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-pink-50 space-y-3">
        {daftarPesan.length > 0 ? (
          daftarPesan.map((item, index) => (
            <div
              key={item.id}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-md text-sm ${
                  index % 2 === 0
                    ? "bg-white border border-pink-100 text-gray-700"
                    : "bg-pink-500 text-white"
                }`}
              >
                <p>{item.pesan}</p>
                <p className="text-[10px] opacity-70 mt-1 text-right">
                  {item.waktu
                    ? new Date(item.waktu.toDate()).toLocaleTimeString()
                    : "Baru saja"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-sm mt-10">
            Belum ada ucapan 😄
          </p>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-pink-100 flex items-center space-x-2">
        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis ucapanmu..."
          className="flex-1 resize-none p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm h-12"
        />
        <button
          onClick={kirimPesan}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl px-4 py-2 transition-all shadow-md"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
