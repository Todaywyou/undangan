import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function IsiUcapan() {
  const [pesan, setPesan] = useState("");

  const kirimPesan = async () => {
    try {
      await addDoc(collection(db, "ucapan"), {
        pesan: pesan,
        waktu: serverTimestamp(),
      });
      setPesan("");
      alert("Ucapan berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim ucapan:", error);
    }
  };

  return (
    <div>
      <textarea
        value={pesan}
        onChange={(e) => setPesan(e.target.value)}
        placeholder="Tulis ucapan..."
      />
      <button onClick={kirimPesan}>Kirim</button>
    </div>
  );
}
