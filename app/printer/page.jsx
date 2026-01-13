"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Handjet } from "next/font/google";
import html2canvas from "html2canvas";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PrinterPage() {
  const [selectedStrip, setSelectedStrip] = useState(null);
  const [photos, setPhotos] = useState([]);
  const stripRef = useRef(null);

  useEffect(() => {
    // Ophalen van gekozen photostrip
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    // Ophalen van foto's (max 3)
    const photosTaken =
      JSON.parse(localStorage.getItem("photosTaken")) || [];
    setPhotos(photosTaken.slice(0, 3));
  }, []);

  // Pixel-perfect y-coördinaten
  const photoPositions = [60, 170, 280];

  const savePhotoStrip = async () => {
    if (!stripRef.current) return;

    const canvas = await html2canvas(stripRef.current, {
      scale: 2, // hoge kwaliteit, zonder vervorming
      useCORS: true,
      backgroundColor: null,
      width: 205,
      height: 614,
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "photostrip.png";
    link.click();
  };

  return (
    <div
      className="flex flex-col items-center px-[5vw] py-[5vh] min-h-screen"
      style={{
        backgroundImage: "url('/printer_background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* GO BACK BUTTON */}
      <div className="absolute top-[3vh] left-[2vw] z-50">
        <Link href="/booth">
          <button
            className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
          >
            GO BACK
          </button>
        </Link>
      </div>

      {/* PHOTOSTRIP CONTAINER (PIXEL-LOCKED) */}
      <div
        ref={stripRef}
        className="relative mt-7"
        style={{
          width: "205px",
          height: "614px",
          backgroundImage: `url(${selectedStrip})`,
          backgroundSize: "205px 614px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
      >
        {/* FOTO'S */}
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden"
            style={{
              left: "9px",
              top: `${photoPositions[idx]}px`,
              width: "187px",
              height: "105.21px",
            }}
          >
            <img
              src={photo}
              alt={`Photo ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <div className="flex">
        <button
          onClick={savePhotoStrip}
          className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer mt-15`}
        >
          SAVE PHOTO STRIP
        </button>
      </div>
    </div>
  );
}