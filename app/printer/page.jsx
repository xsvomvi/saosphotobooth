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

  // Overlay per foto (zelfde mapping als BoothPage)
  const specialOverlays = {
    "/jjk_special.png": [
      "/overlays/jjk_overlay1.svg",
      "/overlays/jjk_overlay2.svg",
      "/overlays/jjk_overlay3.svg",
    ],
    "/ds_special.png": [
      "/overlays/ds_overlay1.svg",
      "/overlays/ds_overlay2.svg",
      "/overlays/ds_overlay3.svg",
    ],
    "/fr_special.png": [
      "/overlays/fr_overlay1.svg",
      "/overlays/fr_overlay2.svg",
      "/overlays/fr_overlay3.svg",
    ],
  };

  // Pixel-perfect y-coördinaten voor foto's op de strip
  const photoPositions = [60, 170, 280];
  const photoWidth = 187;
  const photoHeight = 105.21;
  const stripWidth = 205;
  const stripHeight = 614;

  useEffect(() => {
    // Ophalen van gekozen photostrip
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    // Ophalen van foto's (max 3)
    const photosTaken = JSON.parse(localStorage.getItem("photosTaken")) || [];
    setPhotos(photosTaken.slice(0, 3));
  }, []);

  const savePhotoStrip = async () => {
    if (!stripRef.current) return;

    // html2canvas renderen
    const canvas = await html2canvas(stripRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      width: stripWidth,
      height: stripHeight,
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
        <Link href="/">
          <button
            className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
          >
            LEAVE BOOTH
          </button>
        </Link>
      </div>

      {/* PHOTOSTRIP CONTAINER */}
      <div
        ref={stripRef}
        className="relative mt-7"
        style={{
          width: `${stripWidth}px`,
          height: `${stripHeight}px`,
          backgroundImage: `url(${selectedStrip})`,
          backgroundSize: `${stripWidth}px ${stripHeight}px`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
        }}
      >
        {/* FOTO'S + OVERLAYS */}
        {photos.map((photo, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden"
            style={{
              left: "9px",
              top: `${photoPositions[idx]}px`,
              width: `${photoWidth}px`,
              height: `${photoHeight}px`,
            }}
          >
            {/* Foto */}
            <img
              src={photo}
              alt={`Photo ${idx + 1}`}
              className="w-full h-full"
              style={{ transform: "scaleX(-1)" }}
            />

            {/* Overlay */}
            {selectedStrip &&
              specialOverlays[selectedStrip]?.[idx] && (
                <img
                  src={specialOverlays[selectedStrip][idx]}
                  alt="Overlay"
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              )}
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