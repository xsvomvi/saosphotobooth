"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Spectral, Handjet, Roboto_Condensed } from "next/font/google";

// Fonts
const spectral = Spectral({ subsets: ["latin"], weight: "400" });
const handjet = Handjet({ subsets: ["latin"], weight: "600" });
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "400" });

export default function BoothPage() {
    const [timer, setTimer] = useState(7);
    const [isCounting, setIsCounting] = useState(false);
    const [selectedStrip, setSelectedStrip] = useState(null);

    useEffect(() => {
        // Ophalen welke photostrip gekozen is
        const storedStrip = localStorage.getItem("selectedStrip");
        setSelectedStrip(storedStrip);

        /*
          Later:
          - gebruik selectedStrip om anime overlay te tonen
          - bv: if (selectedStrip === "jjk-special") → JJK svg
        */
    }, []);

    useEffect(() => {
        if (!isCounting) return;

        if (timer === 0) {
            setIsCounting(false);

            /*
              Later:
              - snapshot maken van webcam
              - timer resetten naar 7
              - volgende foto starten (max 3)
            */
            return;
        }

        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isCounting, timer]);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-screen">

            {/* GO BACK BUTTON */}
            <div className="absolute top-[3vh] left-[2vw] z-50">
                <Link href="/photostrip">
                    <button
                        className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer`}
                    >
                        GO BACK
                    </button>
                </Link>
            </div>

            {/* WEBCAM PLACEHOLDER */}
            <div className="relative w-[910px] h-[512px] bg-neutral-900 border-[3px] border-black flex items-center justify-center mt-[6vh]">

                {/* Timer overlay */}
                <span className={`font-handjet ${handjet.className} text-[6vw]`}>
                    {isCounting ? timer : ""}
                </span>

                {/* 
          Later:
          - hier komt <video> webcam feed
          - hier komt anime SVG overlay (absolute positioned)
        */}
            </div>

            {/* BUTTON */}
            <button
                onClick={() => {
                    setTimer(7);
                    setIsCounting(true);

                    /*
                      Later:
                      - foto teller starten (1/3)
                      - disable button tijdens countdown
                    */
                }}
                className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer mt-[3vh]`}
            >
                INSERT COIN
            </button>

            {/* DEBUG (mag later weg) */}
            <p className="mt-6 opacity-40 text-sm">
                Selected strip: {selectedStrip || "none"}
            </p>
        </div>
    );
}