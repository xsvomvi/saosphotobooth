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

  // Ophalen gekozen strip + start webcam
  useEffect(() => {
    const strip = localStorage.getItem("selectedStrip");
    setSelectedStrip(strip);

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
      // Foto nemen
      if (videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");

        setPhotosTaken((prev) => {
          const newPhotos = [...prev, dataUrl];
          localStorage.setItem("photosTaken", JSON.stringify(newPhotos));
          return newPhotos;
        });
      }

      setPhotoCount((prev) => prev + 1);

      // Foto genomen indicatie tonen
      setPhotoTakenIndicator(true);

      setTimeout(() => {
        setPhotoTakenIndicator(false);

        // Na 3 foto's direct naar Printer
        if (photoCount + 1 >= 3) {
          router.push("/printer");
        } else {
          // Reset timer voor volgende foto
          setTimer(7);
          setIsCounting(true);
        }
      }, 2000); // 2 seconden pauze
      setIsCounting(false); // pauzeert timer tot indicatie klaar is
      return;
    }

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [isCounting, timer, photoCount, router]);

  const handleStart = () => {
    if (photoCount >= 3) return;
    setIsCounting(true);
    setTimer(7);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen"
      style={{
        backgroundImage: "url('/booth_background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeFat: "no-repeat",
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

        {/* TIMER OVERLAY */}
        {isCounting && !photoTakenIndicator && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white`}>
            {timer}
          </span>
        )}

        {/* FOTO GENOMEN INDICATIE */}
        {photoTakenIndicator && (
          <span className={`absolute font-handjet ${handjet.className} text-[6vw] text-white`}>
            POSE!
          </span>
        )}

        {/* Placeholder voor overlay specials */}
        {/* 
          if (selectedStrip === "/jjk_special.png") { 
            <JJKOverlay /> 
          } 
        */}
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
      <p className="mt-6 text-black opacity-50">PHOTOS TAKEN: {photoCount}/3</p>
    </div>
  );
}