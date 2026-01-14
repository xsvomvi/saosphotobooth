import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Spectral, Handjet, Roboto_Condensed } from "next/font/google";

// Fonts
const spectral = Spectral({ subsets: ["latin"], weight: "400" });
const handjet = Handjet({ subsets: ["latin"], weight: "600" });
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: "400",
});

export default function Index() {
  // Functie om audio af te spelen
  const playButtonSound = () => {
    const audio = new Audio("/button.mp3");
    audio.volume = 0.1;
    audio.play().catch((err) => console.error("Audio play error:", err));
  };

  return (
    <div
      id="index"
      className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden px-6 md:px-[5vw]"
    >
      {/* Linkerkant */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
        {/* Logo */}
        <div
          className="pop-logo w-[80vw] md:w-[40vw]"
          style={{ animationDelay: "0.2s" }}
        >
          <Image
            src="/starstudio_logo.svg"
            alt="Logo"
            width={850}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Functie */}
        <h1
          className={`mt-4 font-handjet ${handjet.className} text-4xl md:text-[4vw] leading-tight cursor-default`}
        >
          {"A PHOTOBOOTH, MADE BY SAO.".split("").map((char, idx) => (
            <span
              key={idx}
              className="pop-letter inline-block"
              style={{ animationDelay: `${idx * 0.12}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Knoppen */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <Link href="/photostrip" className="w-full sm:w-auto">
            <button
              onClick={playButtonSound}
              className={`w-full font-handjet ${handjet.className}
                bg-[#fffcfa] border-[3px] border-black
                px-8 py-4 text-lg md:text-[1.5vw]
                hover:bg-black hover:text-[#fffcfa]
                transition-all duration-300`}
            >
              ENTER BOOTH
            </button>
          </Link>

          <Link href="/community" className="w-full sm:w-auto">
            <button
              onClick={playButtonSound}
              className={`w-full font-handjet ${handjet.className}
                bg-[#fffcfa] border-[3px] border-black
                px-8 py-4 text-lg md:text-[1.5vw]
                hover:bg-black hover:text-[#fffcfa]
                transition-all duration-300`}
            >
              COMMUNITY
            </button>
          </Link>
        </div>
      </div>

      {/* Rechterkant */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <Image
          src="/photobooth_full.svg"
          alt="Photobooth Full"
          width={350}
          height={600}
          className="h-[50vh] md:h-[65%] w-auto"
        />
      </div>
    </div>
  );
}