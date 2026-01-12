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
      className="flex flex-col w-full h-screen overflow-x-hidden px-[5vw] items-center"
    >
      {/* Titel */}
      <h1
        className={`mt-[10vh] font-handjet ${handjet.className} text-[4vw] text-center cursor-default`}
      >
        {"CHOOSE YOUR PHOTO STRIP:".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Star Studio Specials */}
      <p
        className={`mt-12 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [STAR STUDIO SPECIALS]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {starStudioStrips.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Photostrip ${idx + 1}`}
            width={200.15}
            height={600}
            className="object-contain"
          />
        ))}
      </div>

      {/* Patterned: Jujutsu Kaisen Inspired */}
      <p
        className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [PATTERNED: JUJUTSU KAISEN INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsJJK.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Patterned Photostrip ${idx + 1}`}
            width={200.15}
            height={600}
            className="object-contain"
          />
        ))}
      </div>

      {/* Patterned: Demon Slayer Inspired */}
      <p
        className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [PATTERNED: DEMON SLAYER INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsDS.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Patterned Photostrip ${idx + 1}`}
            width={200.15}
            height={600}
            className="object-contain"
          />
        ))}
      </div>

      {/* Patterned: Frieren Inspired */}
      <p
        className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [PATTERNED: FRIEREN INSPIRED]
      </p>

      <div className="mt-6 flex justify-center gap-8 flex-wrap">
        {patternedStripsFR.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Patterned Photostrip ${idx + 1}`}
            width={200.15}
            height={600}
            className="object-contain"
          />
        ))}
      </div>

      {/* Patterned: Nana Inspired */}
      <p
        className={`mt-24 font-handjet ${handjet.className} text-[2vw] text-center`}
      >
        [PATTERNED: NANA INSPIRED]
      </p>

      <div className="mt-6 mb-24 flex justify-center gap-8 flex-wrap">
        {patternedStripsN.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Patterned Photostrip ${idx + 1}`}
            width={200.15}
            height={600}
            className="object-contain"
          />
        ))}
      </div>

    </div>
  );
}