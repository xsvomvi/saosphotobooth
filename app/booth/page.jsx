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
  const [photosTaken, setPhotosTaken] = useState([]); // hier slaan we de foto's op

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

      // Maak een foto van de webcam
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");

        setPhotosTaken((prev) => [...prev, dataUrl]);
      }

      // Reset timer voor volgende foto (tot max 3)
      if (photoCount + 1 < 3) {
        setTimer(7);
        setIsCounting(true);
      }

      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isCounting, timer, photoCount]);

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
          style={{ transform: "scaleX(-1)" }} // webcam niet gespiegeld
        ></video>

        {/* Timer overlay */}
        {isCounting && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white`}>
            {timer}
          </span>
        )}

        {/* Placeholder voor overlay */}
        {/*
          Hier kan je later de anime SVG overlay toevoegen
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

      {/* Debug info */}
      <p className="mt-6 text-black opacity-50">
        Selected strip: {selectedStrip || "none"}
      </p>
      <p className="text-black opacity-50">
        Photos taken: {photoCount} / 3
      </p>

      {/* Placeholder voor previews van foto's (nog uitgeschakeld) */}
      {/*
        {photosTaken.map((photo, idx) => (
          <img key={idx} src={photo} alt={`Photo ${idx + 1}`} className="mt-4 w-40 border-2 border-white" />
        ))}
      */}
    </div>
  );
}