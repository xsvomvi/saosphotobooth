"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PrinterPage() {
  const [selectedStrip, setSelectedStrip] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Ophalen van gekozen photostrip
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    // Ophalen van 3 foto's
    const photosTaken = JSON.parse(localStorage.getItem("photosTaken")) || [];
    setPhotos(photosTaken.slice(0, 3)); // maximaal 3
  }, []);

  // Exacte y-coördinaten van de foto's
  const photoPositions = [60.7, 170.7, 280.7];

  return (
    <div
      className="flex flex-col items-center px-[5vw] py-[5vh] min-h-screen"
      style={{
        backgroundImage: "url('/printer_background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeFat: "no-repeat",
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

      {/* PHOTOSTRIP CONTAINER */}
      <div
        className="relative w-[205px] h-[614px] bg-cover bg-center mt-7"
        style={{
          backgroundImage: `url(${selectedStrip})`, // PNG als overlay
        }}
      >
        {/* FOTO'S */}
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="absolute left-[9.1px] w-[186px] h-[105px] overflow-hidden"
            style={{
              top: `${photoPositions[idx]}px`,
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

      {/* BUTTONS */}
      <div className="flex">
        <button
          onClick={() => window.print()}
          className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer mt-15`}
        >
          SAVE PHOTO STRIP
        </button>
      </div>
    </div>
  );
}