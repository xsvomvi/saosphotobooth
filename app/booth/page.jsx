"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function BoothPage() {
  const videoRef = useRef(null);
  const [selectedStrip, setSelectedStrip] = useState(null);
  const [timer, setTimer] = useState(7);
  const [isCounting, setIsCounting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    // Ophalen welke photostrip gekozen is
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    // Start webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Webcam error:", err);
      }
    };

    startWebcam();
  }, []);

  useEffect(() => {
    if (!isCounting) return;

    if (timer === 0) {
      setIsCounting(false);
      setPhotoCount((prev) => prev + 1);
      setTimer(7);

      // Hier zou je de snapshot van de webcam kunnen maken
      /*
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        console.log("Photo taken:", dataUrl);
      */

      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCounting, timer]);

  const handleStart = () => {
    if (photoCount >= 3) {
      alert("You have already taken 3 photos!");
      return;
    }
    setIsCounting(true);
  };

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

      {/* WEBCAM */}
      <div className="relative w-[910px] h-[512px] bg-black border-[3px] border-white flex items-center justify-center mt-[6vh]">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }} // zorgt dat webcam niet gespiegeld is
        ></video>

        {/* Timer overlay */}
        {isCounting && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white`}>
            {timer}
          </span>
        )}

        {/* Placeholder voor overlay (nog niet actief) */}
        {/*
          Als je specials hebt geselecteerd, kun je hier een SVG overlay renderen
          bijv: {selectedStrip === "/jjk_special.png" && <JJKOverlay />}
        */}
      </div>

      {/* INSERT COIN BUTTON */}
      <button
        onClick={handleStart}
        disabled={isCounting || photoCount >= 3}
        className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer mt-[3vh] disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        INSERT COIN
      </button>

      {/* Debug */}
      <p className="mt-6 text-black opacity-50">
        Selected strip: {selectedStrip || "none"}
      </p>
      <p className="text-black opacity-50">
        Photos taken: {photoCount} / 3
      </p>
    </div>
  );
}