// Import modul utama dari Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase milikmu
const firebaseConfig = {
  apiKey: "AIzaSyDTa4R1VLOcH6iMq7jWNFu9KfEnwKjlg68",
  authDomain: "undangan-ucapan.firebaseapp.com",
  projectId: "undangan-ucapan",
  storageBucket: "undangan-ucapan.firebasestorage.app",
  messagingSenderId: "26079506021",
  appId: "1:26079506021:web:50fee1ce014763e11ca08c",
  measurementId: "G-FM72SMQB2K",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(app);

// Ekspor agar bisa dipakai di file lain
export { db };
