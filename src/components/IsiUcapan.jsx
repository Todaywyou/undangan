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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    }
  };

  const getColor = (text) => {
    const colors = [
      "bg-pink-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-yellow-400",
      "bg-purple-400",
      "bg-orange-400",
      "bg-rose-400",
      "bg-teal-400",
    ];
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 text-center font-semibold text-lg shadow-md sticky top-0 z-10">
        💌 Kirim Ucapan
      </div>

      {/* Chat List (scrollable area) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100">
        {daftarPesan.length > 0 ? (
          daftarPesan.map((item, index) => (
            <div
              key={item.id}
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="flex items-end space-x-2 max-w-[80%]">
                {/* Avatar kiri */}
                {index % 2 === 0 && (
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm shadow-md ${getColor(
                      item.nama || "?"
                    )}`}
                  >
                    {item.nama ? item.nama.charAt(0).toUpperCase() : "?"}
                  </div>
                )}

                {/* Chat Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl shadow-md ${
                    index % 2 === 0
                      ? "bg-white border border-pink-100 text-gray-700"
                      : "bg-pink-500 text-white"
                  }`}
                >
                  <p className="font-semibold text-sm">{item.nama}</p>
                  <p className="text-sm">{item.pesan}</p>
                  <p className="text-[10px] opacity-70 mt-1 text-right">
                    {item.waktu
                      ? new Date(item.waktu.toDate()).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Baru saja"}
                  </p>
                </div>

                {/* Avatar kanan */}
                {index % 2 !== 0 && (
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold text-sm shadow-md ${getColor(
                      item.nama || "?"
                    )}`}
                  >
                    {item.nama ? item.nama.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
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

      {/* Input Bar (sticky bottom) */}
      <div className="bg-white border-t border-pink-100 p-3 sticky bottom-0 z-10">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama kamu..."
          className="w-full p-2 mb-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
        />
        <div className="flex space-x-2">
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
    </div>
  );
}
