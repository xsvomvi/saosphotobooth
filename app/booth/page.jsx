"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Handjet } from "next/font/google";

const handjet = Handjet({ subsets: ["latin"], weight: "600" });

export default function BoothPage() {
  const videoRef = useRef(null);
  const router = useRouter();

  const [selectedStrip, setSelectedStrip] = useState(null);
  const [timer, setTimer] = useState(7);
  const [isCounting, setIsCounting] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const [photosTaken, setPhotosTaken] = useState([]);
  const [photoTakenIndicator, setPhotoTakenIndicator] = useState(false);
  const [currentOverlayIndex, setCurrentOverlayIndex] = useState(0);

  const photoSlotWidth = 187;
  const photoSlotHeight = 105.21;

  // Overlays voor speciale strips
  const specialOverlays = {
    "/jjk_special.png": [
      "/overlays/jjk_overlay1.svg",
      "/overlays/jjk_overlay2.svg",
      "/overlays/jjk_overlay3.svg",
    ],
    "/ds_special.png": [
      "/overlays/ds_overlay1.svg",
      "/overlays/ds_overlay2.svg",
      "/overlays/ds_overlay3.svg",
    ],
    "/fr_special.png": [
      "/overlays/fr_overlay1.svg",
      "/overlays/fr_overlay2.svg",
      "/overlays/fr_overlay3.svg",
    ],
  };

  // Ophalen gekozen strip + start webcam
  useEffect(() => {
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    // Start eerste overlay meteen
    if (strip && specialOverlays[strip]) {
      setCurrentOverlayIndex(0);
    }

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

  // Timer + foto nemen
  useEffect(() => {
    if (!isCounting) return;

    if (timer === 0) {
      // Neem foto
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = photoSlotWidth;
        canvas.height = photoSlotHeight;
        const ctx = canvas.getContext("2d");

        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        const scale = Math.max(photoSlotWidth / videoWidth, photoSlotHeight / videoHeight);
        const scaledWidth = videoWidth * scale;
        const scaledHeight = videoHeight * scale;
        const offsetX = (photoSlotWidth - scaledWidth) / 2;
        const offsetY = (photoSlotHeight - scaledHeight) / 2;

        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight, offsetX, offsetY, scaledWidth, scaledHeight);

        const dataUrl = canvas.toDataURL("image/png");

        setPhotosTaken((prev) => {
          const newPhotos = [...prev, dataUrl];
          localStorage.setItem("photosTaken", JSON.stringify(newPhotos));
          return newPhotos;
        });
      }

      setPhotoCount((prev) => prev + 1);
      setPhotoTakenIndicator(true);
      setIsCounting(false);

      // Na foto: Pose-indicatie + overlay switchen voor volgende foto
      setTimeout(() => {
        setPhotoTakenIndicator(false);

        if (selectedStrip && specialOverlays[selectedStrip]) {
          // Switch overlay voor volgende foto (alleen als er nog één is)
          if (photoCount + 1 < specialOverlays[selectedStrip].length) {
            setCurrentOverlayIndex(photoCount + 1);
          }
        }

        if (photoCount + 1 >= 3) {
          router.push("/printer");
        } else {
          setTimer(7);
          setIsCounting(true);
        }
      }, 2000); // 2 seconden pose-indicatie
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isCounting, timer, photoCount, router, selectedStrip]);

  const handleStart = () => {
    if (photoCount >= 3) return;

    const coinSound = new Audio("/coin.mp3");
    coinSound.volume = 0.1;
    coinSound.play().catch((err) => console.error("Audio play error:", err));

    setIsCounting(true);
    setTimer(7);
  };

  // Huidige overlay
  const currentOverlay =
    selectedStrip && specialOverlays[selectedStrip]
      ? specialOverlays[selectedStrip][currentOverlayIndex] || null
      : null;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen"
      style={{
        backgroundImage: "url('/booth_background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <div className="relative w-[910px] h-[512px] bg-black border-[4px] border-black flex items-center justify-center mt-16">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        ></video>

        {/* Overlay SVG */}
        {currentOverlay && (
          <img
            src={currentOverlay}
            alt="Overlay"
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
          />
        )}

        {/* TIMER OVERLAY */}
        {isCounting && !photoTakenIndicator && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white z-30`}>
            {timer}
          </span>
        )}

        {/* FOTO GENOMEN INDICATIE */}
        {photoTakenIndicator && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white z-30`}>
            POSE!
          </span>
        )}
      </div>

      {/* INSERT COIN BUTTON */}
      <button
        onClick={handleStart}
        disabled={isCounting || photoCount >= 3}
        className={`font-handjet ${handjet.className} bg-[#fffcfa] border-[3px] border-black px-[2.5vw] py-[1.2vh] text-[1.5vw] hover:bg-black hover:text-[#fffcfa] transition-all duration-300 cursor-pointer mt-8 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        INSERT COIN
      </button>

      {/* DEBUG */}
      <p className="mt-6 text-black opacity-50">
        PHOTOS TAKEN: {photoCount}/3
      </p>
    </div>
  );
}