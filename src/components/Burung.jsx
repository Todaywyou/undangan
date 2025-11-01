import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function Burung() {
  const [birds, setBirds] = useState(null);

  useEffect(() => {
    fetch("/birds.json") // akses dari folder public
      .then((res) => res.json())
      .then((data) => setBirds(data));
  }, []);

  if (!birds) return null; // pastikan aman sebelum render

  return (
    <div className="absolute top-0 left-0 w-full flex justify-center opacity-70 pointer-events-none">
      <Lottie animationData={birds} loop={true} />
    </div>
  );
}
