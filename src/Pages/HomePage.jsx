import React from "react";
import Pembukaan from "../components/Pembukaan";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  // Fungsi untuk pindah ke halaman isi
  const handleOpenInvitation = () => {
    navigate("/isi");
  };

  return (
    <div>
      <Pembukaan onOpen={handleOpenInvitation} />{" "}
      {/* ✅ kirim fungsi ke komponen */}
    </div>
  );
}
