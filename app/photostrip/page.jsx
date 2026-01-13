"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handjet } from "next/font/google";
import { useRouter } from "next/navigation";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PhotostripPage() {
  const router = useRouter();

  // Patterned strips
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

  // Star Studio Specials: strip + 3 overlays
  const specialStrips = [
    {
      strip: "/jjk_special.png",
      overlays: [
        "/jjk_overlay1.svg",
        "/jjk_overlay2.svg",
        "/jjk_overlay3.svg",
      ],
    },
    {
      strip: "/ds_special.png",
      overlays: [
        "/ds_overlay1.svg",
        "/ds_overlay2.svg",
        "/ds_overlay3.svg",
      ],
    },
    {
      strip: "/fr_special.png",
      overlays: [
        "/fr_overlay1.svg",
        "/fr_overlay2.svg",
        "/fr_overlay3.svg",
      ],
    },
  ];

  // Gewone strip selectie
  const handleSelectStrip = (src) => {
    localStorage.setItem("selectedStrip", src);
    localStorage.removeItem("specialOverlays"); // Clear specials
    router.push("/booth");
  };

  // Special strip selectie
  const handleSelectSpecial = (special) => {
    localStorage.setItem("selectedStrip", special.strip);
    localStorage.setItem("specialOverlays", JSON.stringify(special.overlays));
    router.push("/booth");
  };

  return (
    <div className="relative flex flex-col items-center px-[5vw] py-[5vh]">

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

      {/* Titel */}
      <h1
        className={`mt-16 mb-8 font-handjet ${handjet.className} text-[4vw] text-center cursor-default`}
      >
        {"LET'S CHOOSE YOUR PHOTO STRIP.".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* SPECIAL STRIPS */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-6`}>
        [STAR STUDIO SPECIALS]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-20">
        {specialStrips.map((special, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectSpecial(special)}
          >
            <Image
              src={special.strip}
              alt={`Star Studio Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Patterned: JJK */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-6`}>
        [JUJUTSU KAISEN INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-20">
        {patternedStripsJJK.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectStrip(src)}
          >
            <Image
              src={src}
              alt={`JJK Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Patterned: Demon Slayer */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-6`}>
        [DEMON SLAYER INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-20">
        {patternedStripsDS.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectStrip(src)}
          >
            <Image
              src={src}
              alt={`Demon Slayer Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Patterned: Frieren */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-6`}>
        [SOUSOU NO FRIEREN INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-20">
        {patternedStripsFR.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectStrip(src)}
          >
            <Image
              src={src}
              alt={`Frieren Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>

      {/* Patterned: Nana */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-6`}>
        [REQUESTED: NANA INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-20">
        {patternedStripsN.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectStrip(src)}
          >
            <Image
              src={src}
              alt={`Nana Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}