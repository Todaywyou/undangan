import { motion } from "framer-motion";
import Ayat from "../components/Ayat";
import Header from "../components/Heder";
import Tanggal from "../components/Tanggal";
import Foto from "../components/Foto";
import Bersama from "../components/Bersama";
import AkadResepsi from "../components/AkadResepsi";
import BottomNav from "../components/BottomNav";
import Rek from "../components/Rek";
import IsiUcapan from "../components/IsiUcapan";

const fadeVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -40, scale: 0.95 },
};

// ✅ Komponen FadeSection — dengan opsi disableInView
function FadeSection({ children, id, disableInView = false }) {
  return disableInView ? (
    <div id={id} className="w-full flex flex-col items-center">
      {children}
    </div>
  ) : (
    <motion.div
      id={id}
      variants={fadeVariant}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: false, amount: 0.2 }}
      className="w-full flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}

export default function Isi() {
  return (
    <div className="min-h-[200vh] w-full flex flex-col items-center justify-start bg-via-[#fff5f6] space-y-12 pb-24">
      <FadeSection>
        <Header />
      </FadeSection>

      <FadeSection>
        <Bersama />
      </FadeSection>

      <FadeSection>
        <Tanggal />
      </FadeSection>

      <FadeSection>
        <Ayat />
      </FadeSection>

      <FadeSection id="foto">
        <Foto />
      </FadeSection>

      <FadeSection id="akad">
        <AkadResepsi />
      </FadeSection>

      <FadeSection id="rek">
        <Rek />
      </FadeSection>

      {/* ✅ Bagian ucapan tanpa animasi viewport */}
      <FadeSection id="ucapan" disableInView>
        <IsiUcapan />
      </FadeSection>

      {/* ✅ Sidebar bawah */}
      <BottomNav />
    </div>
  );
}
