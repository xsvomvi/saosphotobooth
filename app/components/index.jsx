import React from "react";
import Image from "next/image";
import { Spectral, Handjet, Roboto_Condensed } from "next/font/google";

// Fonts
const spectral = Spectral({ subsets: ["latin"], weight: "400" });
const handjet = Handjet({ subsets: ["latin"], weight: "600" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function Index() {
  return (
    <div
      id="index"
      className="w-1/2 flex flex-col justify-center items-center h-screen overflow-x-hidden px-[5vw]"
    >
      {/* Logo */}
      <div
        className="pop-logo"
        style={{
          animationDelay: `0.2s`,
          width: "40vw",
        }}
      >
        <Image
          src="/starstudio_logo.svg"
          alt="Logo"
          width={850}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* Functie */}
      <h1
        className={`mt-[1vh] font-handjet ${handjet.className} text-[4vw] text-center cursor-default`}
      >
        {"A PHOTOBOOTH, MADE BY SAO.".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Knoppen */}
      <div className="mt-[3vh] flex gap-[2vw]">
        <button
          className={`font-handjet ${handjet.className} bg-[#fffcfa] border-3 border-black px-[2.5vw] py-[1.2vh] text-[2vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
        >
          ENTER PHOTOBOOTH
        </button>

        <button
          className={`font-handjet ${handjet.className} bg-[#fffcfa] border-3 border-black px-[2.5vw] py-[1.2vh] text-[2vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
        >
          VIEW GALLERY
        </button>
      </div>
    </div>
  );
}