import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Fonts
import { Homemade_Apple } from "next/font/google";
const homemadeApple = Homemade_Apple({ subsets: ["latin"], weight: "400" });

// Knoppen
const contactButtons = [
  { name: "instagram", url: "https://instagram.com/svospo" },
  { name: "tiktok", url: "https://tiktok.com/@soeemiee" },
  { name: "email", url: "mailto:bapsao@hotmail.com" },
  { name: "linkedin", url: "https://www.linkedin.com/in/saomai-ngo-539822383/" }
];

const playSound = () => {
  const audio = new Audio("/paper_fold.mp3"); 
  audio.play();
};

export default function Contact() {
  const contactRef = useRef(null);
  const [animateContact, setAnimateContact] = useState(false);

  // IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimateContact(true);
      },
      {
        root: null,
        threshold: 0.6,
        rootMargin: "0px 0px -2% 0px"
      }
    );

    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  return (
    <div
      id="contact"
      ref={contactRef}
      className="w-full flex flex-col justify-center items-center overflow-x-hidden px-[5vw] pb-[4vh]"
    >
      {/* Sticker met hover */}
      <div
        className={`w-[18vw] overflow-hidden ${animateContact ? "pop-logo" : "opacity-0"} 
                    transition-transform duration-300 transform hover:scale-105 cursor-default`}
        style={{ animationDelay: "0.2s" }}
      >
        <Image
          src="/contact_sticker.svg"
          alt="Contact Sticker"
          width={500} 
          height={500}
          className="w-full h-auto"
        />
      </div>

      {/* Tekst */}
      <h1
        className={`mt-[1vh] font-homemadeApple ${homemadeApple.className} text-[2vw] text-center cursor-default`}
      >
        {"let's create & connect".split("").map((char, idx) => (
          <span
            key={idx}
            className={`inline-block ${animateContact ? "pop-letter" : "opacity-0"}`}
            style={{ animationDelay: animateContact ? `${idx * 0.12}s` : "0s" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Knoppen */}
      <div className="flex justify-between w-full px-[10vw] mt-[4vh]">
        <div className="flex flex-col gap-[2vh]">
          {contactButtons.slice(0, 2).map((btn) => (
            <a
              onClick={playSound}
              key={btn.name}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap justify-center items-center gap-[1vw] lg:gap-[1.5vw] rounded-full px-[1.5rem] py-[0.75rem] w-[12rem] block w-[8rem] text-center border border-black py-[0.5rem] px-[0.75rem] rounded-md transition-transform duration-500 transform hover:scale-105 cursor-pointer bg-[#f5f5f5]"
            >
              {btn.name}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-[2vh]">
          {contactButtons.slice(2, 4).map((btn) => (
            <a
              onClick={playSound}
              key={btn.name}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap justify-center items-center gap-[1vw] lg:gap-[1.5vw] rounded-full px-[1.5rem] py-[0.75rem] w-[12rem] block w-[8rem] text-center border border-black py-[0.5rem] px-[0.75rem] rounded-md transition-transform duration-500 transform hover:scale-105 cursor-pointer bg-[#f5f5f5]"
            >
              {btn.name}
            </a>
          ))}
        </div>
      </div>

      {/* Animatie */}
      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        .pop-letter, .pop-logo {
          animation: popIn 0.5s ease forwards;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}