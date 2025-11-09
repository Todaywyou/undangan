import React, { useState, useEffect } from "react";
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

  // Ambil data secara real-time
  useEffect(() => {
    const q = query(collection(db, "ucapan"), orderBy("waktu", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDaftarPesan(data);
    });

    return () => unsubscribe();
  }, []);

  // Fungsi kirim pesan
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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
        💌 Kirim Ucapan
      </h2>

      <textarea
        value={pesan}
        onChange={(e) => setPesan(e.target.value)}
        placeholder="Tulis ucapanmu di sini..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 mb-3"
        rows="3"
      />
      <button
        onClick={kirimPesan}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium transition-all"
      >
        Kirim
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-3">
          ✨ Ucapan dari Teman-Teman
        </h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {daftarPesan.length > 0 ? (
            daftarPesan.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-pink-50 border border-pink-100 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">{item.pesan}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.waktu
                    ? new Date(item.waktu.toDate()).toLocaleString()
                    : "Baru saja"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm text-center">
              Belum ada ucapan 😄
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
