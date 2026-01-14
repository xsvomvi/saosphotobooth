"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handjet } from "next/font/google";
import { useRouter } from "next/navigation";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PhotostripPage() {
  const router = useRouter();

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

  const playButtonSound = () => {
    const audio = new Audio("/button.mp3");
    audio.volume = 0.1;
    audio.play().catch(() => {});
  };

  const handleSelectStrip = (src) => {
    playButtonSound();
    localStorage.setItem("selectedStrip", src);
    localStorage.removeItem("specialOverlays");
    router.push("/booth");
  };

  const handleSelectSpecial = (special) => {
    playButtonSound();

    const sounds = {
      "/jjk_special.png": "/gojo.mp3",
      "/fr_special.png": "/frieren.mp3",
      "/ds_special.png": "/inosuke.mp3",
    };

    if (sounds[special.strip]) {
      const extra = new Audio(sounds[special.strip]);
      extra.volume = 0.03;
      extra.play().catch(() => {});
    }

    localStorage.setItem("selectedStrip", special.strip);
    localStorage.setItem(
      "specialOverlays",
      JSON.stringify(special.overlays)
    );
    router.push("/booth");
  };

  return (
    <div className="relative flex flex-col items-center px-6 md:px-[5vw] py-10">

      {/* GO BACK */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <button
            className={`font-handjet ${handjet.className}
            bg-[#fffcfa] border-[3px] border-black
            px-6 py-3 text-base md:text-[1.5vw]
            hover:bg-black hover:text-[#fffcfa]
            transition-all`}
          >
            GO BACK
          </button>
        </Link>
      </div>

      {/* Titel */}
      <h1
        className={`mt-20 mb-10 font-handjet ${handjet.className}
        text-3xl md:text-[4vw] text-center`}
      >
        {"LET'S CHOOSE YOUR PHOTO STRIP.".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter inline-block"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* SECTION TEMPLATE */}
      {[
        ["[STAR STUDIO SPECIALS]", specialStrips, true],
        ["[JUJUTSU KAISEN INSPIRED]", patternedStripsJJK],
        ["[DEMON SLAYER INSPIRED]", patternedStripsDS],
        ["[FRIEREN INSPIRED]", patternedStripsFR],
        ["[NANA INSPIRED]", patternedStripsN],
      ].map(([title, items, isSpecial], i) => (
        <div key={i} className="w-full mb-20">
          <p
            className={`font-handjet ${handjet.className}
            text-xl md:text-[2vw] mb-6 text-center`}
          >
            {title}
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() =>
                  isSpecial
                    ? handleSelectSpecial(item)
                    : handleSelectStrip(item)
                }
              >
                <Image
                  src={isSpecial ? item.strip : item}
                  alt="Photostrip"
                  width={180}
                  height={540}
                  className="object-contain w-[140px] md:w-[200px]"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}