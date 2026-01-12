import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Spectral, Handjet, Roboto_Condensed } from "next/font/google";

// Fonts
const spectral = Spectral({ subsets: ["latin"], weight: "400" });
const handjet = Handjet({ subsets: ["latin"], weight: "600" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function PhotostripPage() {
  const starStudioStrips = [
    "/jjk_special.png",
    "/ds_special.png",
    "/fr_special.png",
  ];

  const patternedStripsJJK = [
    "/jjk_strip_1.png",
    "/jjk_strip_2.png",
    "/jjk_strip_3.png",
    "/jjk_strip_4.png",
    "/jjk_strip_5.png",
  ];

  const patternedStripsDS = [
    "/ds_strip_1.png",
    "/ds_strip_2.png",
    "/ds_strip_3.png",
    "/ds_strip_4.png",
    "/ds_strip_5.png",
  ];

  const patternedStripsFR = [
    "/fr_strip_1.png",
    "/fr_strip_2.png",
    "/fr_strip_3.png",
    "/fr_strip_4.png",
    "/fr_strip_5.png",
  ];

  const patternedStripsN = [
    "/n_strip_1.png",
    "/n_strip_2.png",
    "/n_strip_3.png",
    "/n_strip_4.png",
    "/n_strip_5.png",
  ];

  return (
    <div
      id="index"
      className="relative flex flex-col w-full h-screen overflow-x-hidden px-[5vw] items-center"
    >
      {/* GO BACK BUTTON */}
      <div className="absolute top-[3vh] left-[2vw] z-50">
        <Link href="/">
          <button
            className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
          >
            GO BACK
          </button>
        </Link>
      </div>

      {/* TITEL */}
      <h1
        className={`mt-[10vh] font-handjet ${handjet.className} text-[4vw] text-center cursor-default`}
      >
        {"CHOOSE YOUR STRIP TO CONTINUE:".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* STAR STUDIO SPECIALS */}
      <p className={`mt-12 font-handjet ${handjet.className} text-[2vw] text-center`}>
        [STAR STUDIO SPECIALS]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {starStudioStrips.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Image
              src={src}
              alt={`Star Studio Photostrip ${idx + 1}`}
              width={200.15}
              height={600}
              className="object-contain"
            />

            {/*
              Later:
              - onClick → photostrip selecteren
              - opslaan in state / context
              - doorgaan naar webcam pagina
            */}
          </div>
        ))}
      </div>

      {/* PATTERNED: JUJUTSU KAISEN */}
      <p className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}>
        [PATTERNED: JUJUTSU KAISEN INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsJJK.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Image
              src={src}
              alt={`JJK Photostrip ${idx + 1}`}
              width={200.15}
              height={600}
              className="object-contain"
            />

            {/*
              Later:
              - JJK character SVG overlay
              - links/rechts positioneren in webcam preview
            */}
          </div>
        ))}
      </div>

      {/* PATTERNED: DEMON SLAYER */}
      <p className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}>
        [PATTERNED: DEMON SLAYER INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsDS.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Image
              src={src}
              alt={`Demon Slayer Photostrip ${idx + 1}`}
              width={200.15}
              height={600}
              className="object-contain"
            />

            {/*
              Later:
              - Demon Slayer overlay
              - andere pose / framing
            */}
          </div>
        ))}
      </div>

      {/* PATTERNED: FRIEREN */}
      <p className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}>
        [PATTERNED: FRIEREN INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsFR.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Image
              src={src}
              alt={`Frieren Photostrip ${idx + 1}`}
              width={200.15}
              height={600}
              className="object-contain"
            />

            {/*
              Later:
              - Frieren themed SVG overlay
            */}
          </div>
        ))}
      </div>

      {/* PATTERNED: NANA */}
      <p className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}>
        [PATTERNED: NANA INSPIRED]
      </p>

      <div className="mt-6 mb-24 flex justify-center gap-8 flex-wrap">
        {patternedStripsN.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Image
              src={src}
              alt={`Nana Photostrip ${idx + 1}`}
              width={200.15}
              height={600}
              className="object-contain"
            />

            {/*
              Later:
              - Nana aesthetic overlay
              - aangepaste compositie
            */}
          </div>
        ))}
      </div>
    </div>
  );
}