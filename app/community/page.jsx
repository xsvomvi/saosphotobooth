"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Handjet } from "next/font/google";
import { useRouter } from "next/navigation";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function PhotostripPage() {
  const router = useRouter();

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
        {"PHOTO STRIPS MADE BY... YOU!".split("").map((char, idx) => (
          <span
            key={idx}
            className="pop-letter"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
}