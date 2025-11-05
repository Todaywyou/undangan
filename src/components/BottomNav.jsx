import { Link, useLocation } from "react-router-dom";
import { Home, Users, Gem } from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  // Styling helper: aktifkan ikon jika di halaman tersebut
  const isActive = (path) => location.pathname === path;

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 flex justify-between items-center w-[90%] max-w-md md:max-w-lg border border-gray-200">
      {/* Home */}
      <Link
        to="/"
        className={`flex flex-col items-center text-sm transition ${
          isActive("/") ? "text-pink-600" : "text-gray-600"
        }`}
      >
        <Home size={22} />
        <span className="text-[12px] mt-1">Home</span>
      </Link>

      {/* Akad & Resepsi */}
      <button
        onClick={() => {
          if (location.pathname === "/isi") {
            scrollToId("akad");
          } else {
            window.location.href = "/isi#akad";
          }
        }}
        className="flex flex-col items-center text-sm text-gray-600 hover:text-pink-600 transition"
      >
        <Gem size={22} />
        <span className="text-[12px] mt-1">Akad</span>
      </button>

      {/* Foto */}
      <button
        onClick={() => {
          if (location.pathname === "/isi") {
            scrollToId("foto");
          } else {
            window.location.href = "/isi#foto";
          }
        }}
        className="flex flex-col items-center text-sm text-gray-600 hover:text-pink-600 transition"
      >
        <Users size={22} />
        <span className="text-[12px] mt-1">Kami</span>
      </button>
    </nav>
  );
}
