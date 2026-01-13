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

  // Specials (nog niet actief, voor toekomstige overlay functionaliteit)
  /*
  const starStudioStrips = [
    "/jjk_special.png",
    "/ds_special.png",
    "/fr_special.png",
  ];
  */

  const handleSelectStrip = (src) => {
    // Opslaan in localStorage zodat Booth weet welke photostrip gekozen is
    localStorage.setItem("selectedStrip", src);

    // Doorsturen naar booth pagina
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
      <h1 className={`text-[4vw] font-handjet ${handjet.className} mb-8`}>
        CHOOSE YOUR PHOTO STRIP:
      </h1>

      {/* Optional: specials zouden hier kunnen komen */}
      {/*
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-4`}>
        [STAR STUDIO SPECIALS]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-12">
        {starStudioStrips.map((src, idx) => (
          <div
            key={idx}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleSelectStrip(src)}
          >
            <Image
              src={src}
              alt={`Star Studio Photostrip ${idx + 1}`}
              width={200}
              height={600}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      */}

      {/* Patterned: JJK */}
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-4`}>
        [PATTERNED: JUJUTSU KAISEN INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-12">
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
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-4`}>
        [PATTERNED: DEMON SLAYER INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-12">
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
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-4`}>
        [PATTERNED: FRIEREN INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-12">
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
      <p className={`font-handjet ${handjet.className} text-[2vw] mb-4`}>
        [PATTERNED: NANA INSPIRED]
      </p>
      <div className="flex justify-center gap-8 flex-wrap mb-12">
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