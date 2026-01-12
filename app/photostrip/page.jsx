import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Spectral, Handjet, Roboto_Condensed } from "next/font/google";

// Fonts
const spectral = Spectral({ subsets: ["latin"], weight: "400" });
const handjet = Handjet({ subsets: ["latin"], weight: "600" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function PhotostripPage() {
  const photostrips = [
    "/jjk_strip_special.png",
    "/ds_strip_special.png",
    "/f_strip_special.png",
  ];

  return (
    <div
      id="index"
      className="flex flex-col w-full h-screen overflow-x-hidden px-[5vw] items-center"
    >
      {/* Titel */}
      <h1
        className={`mt-[10vh] font-handjet ${handjet.className} text-[4vw] text-center cursor-default`}
      >
        {"CHOOSE YOUR PHOTO STRIP".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Opties */}
      <p
        className={`mt-4 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [STAR STUDIO SPECIALS]
      </p>

      <div className="mt-10 flex justify-center gap-8">
        {photostrips.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Photostrip ${idx + 1}`}
            width={205} 
            height={614}
            className="object-contain"
          />
        ))}
      </div>
    </div>
  );
}