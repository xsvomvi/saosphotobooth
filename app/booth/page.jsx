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

  useEffect(() => {
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

    if (strip && specialOverlays[strip]) {
      setCurrentOverlayIndex(0);
    }

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
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
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = photoSlotWidth;
        canvas.height = photoSlotHeight;
        const ctx = canvas.getContext("2d");

        const vw = videoRef.current.videoWidth;
        const vh = videoRef.current.videoHeight;

        const scale = Math.max(photoSlotWidth / vw, photoSlotHeight / vh);
        const sw = vw * scale;
        const sh = vh * scale;
        const ox = (photoSlotWidth - sw) / 2;
        const oy = (photoSlotHeight - sh) / 2;

        ctx.drawImage(videoRef.current, 0, 0, vw, vh, ox, oy, sw, sh);

        const dataUrl = canvas.toDataURL("image/png");

        setPhotosTaken((prev) => {
          const updated = [...prev, dataUrl];
          localStorage.setItem("photosTaken", JSON.stringify(updated));
          return updated;
        });

        const cameraSound = new Audio("/camera.mp3");
        cameraSound.volume = 0.05;
        cameraSound.play().catch(() => {});
      }

      setPhotoCount((p) => p + 1);
      setPhotoTakenIndicator(true);
      setIsCounting(false);

      setTimeout(() => {
        setPhotoTakenIndicator(false);

        if (selectedStrip && specialOverlays[selectedStrip]) {
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
      }, 2000);

      return;
    }

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isCounting, timer, photoCount, selectedStrip, router]);

  const handleStart = () => {
    if (photoCount >= 3) return;

    const coinSound = new Audio("/coin.mp3");
    coinSound.volume = 0.03;
    coinSound.play().catch(() => {});

    setIsCounting(true);
    setTimer(7);
  };

  const currentOverlay =
    selectedStrip && specialOverlays[selectedStrip]
      ? specialOverlays[selectedStrip][currentOverlayIndex] || null
      : null;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-4"
      style={{
        backgroundImage: "url('/booth_background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* GO BACK */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/photostrip">
          <button
            className={`font-handjet ${handjet.className}
            bg-[#fffcfa] border-[3px] border-black
            px-6 py-3 text-base
            hover:bg-black hover:text-[#fffcfa]
            transition-all`}
          >
            GO BACK
          </button>
        </Link>
      </div>

      {/* WEBCAM + OVERLAY */}
      <div className="relative w-full max-w-[900px] mt-20" style={{ aspectRatio: "16/9" }}>
        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Overlay SVG */}
        {currentOverlay && (
          <img
            src={currentOverlay}
            alt="Overlay"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
          />
        )}

        {/* Timer */}
        {isCounting && !photoTakenIndicator && (
          <span
            className={`absolute inset-0 flex items-center justify-center
            font-handjet ${handjet.className}
            text-6xl md:text-[6vw] text-white z-30`}
          >
            {timer}
          </span>
        )}
      </div>

      {/* INSERT COIN BUTTON */}
      <button
        onClick={handleStart}
        disabled={isCounting || photoCount >= 3}
        className={`mt-8 font-handjet ${handjet.className}
        bg-[#fffcfa] border-[3px] border-black
        px-8 py-4 text-lg
        hover:bg-black hover:text-[#fffcfa]
        transition-all
        disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        INSERT COIN
      </button>

      <p className="mt-4 text-black opacity-50">
        PHOTOS TAKEN: {photoCount}/3
      </p>
    </div>
  );
}