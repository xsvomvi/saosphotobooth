"use client";

import React from "react";
import Link from "next/link";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PhotostripPage() {
  return (
    <div
      className="relative flex flex-col items-center px-6 py-6 md:px-[5vw] md:py-[5vh] min-h-screen"
    >
      {/* GO BACK BUTTON */}
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
        className={`mt-20 mb-8 font-handjet ${handjet.className} text-3xl md:text-[4vw] text-center leading-tight cursor-default`}
      >
        {"PHOTO STRIPS MADE BY... YOU!".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter inline-block"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}