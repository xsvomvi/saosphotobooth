import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fugaz_One, Homemade_Apple } from "next/font/google";

// Fonts
const fugazOne = Fugaz_One({ subsets: ["latin"], weight: "400" });
const homemadeApple = Homemade_Apple({ subsets: ["latin"], weight: "400" });

// Knoppen + skills
const skillButtons = [
  { name: "photography & video editing", link: "/skill1" },
  { name: "web design & ui/ux design", link: "/skill2" },
  { name: "content creation & content strategy", link: "/skill3" },
];

const playSound = () => {
  const audio = new Audio("/paper_fold.mp3"); 
  audio.play();
};

export default function Skills() {
  const skillsRef = useRef(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  const text = "i've already experimented with:";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={skillsRef}
      className="w-full flex flex-col items-center min-h-[100vh] px-[5vw] overflow-x-hidden"
    >
      {/* Beschrijving */}
      <h1
        className={`font-homemadeApple ${homemadeApple.className} text-[2vw] flex flex-wrap justify-start cursor-default`}
      >
        {text.split("").map((char, idx) => (
          <span
            key={idx}
            className={`inline-block ${animateSkills ? "pop-letter" : "opacity-0"}`}
            style={{ animationDelay: animateSkills ? `${idx * 0.12}s` : "0s" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* Sectie met knoppen + afbeelding */}
      <div className="mt-[4vh] flex flex-col w-full gap-[4vw] items-center justify-center">
        {/* Knoppen */}
        <div className="flex gap-[1.5vh]">
          {skillButtons.map((btn) => (
            <Link
              key={btn.name}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                onClick={playSound}
                className="flex flex-wrap justify-center items-center gap-[1vw] lg:gap-[1.5vw] px-[1.5rem] py-[0.75rem] w-[12rem] block w-[8rem] text-center border border-black py-[0.5rem] px-[0.75rem] rounded-md transition-transform duration-500 transform hover:scale-105 cursor-pointer bg-[#f5f5f5]"
              >
                {btn.name}
              </button>
            </Link>
          ))}
        </div>

        {/* Sticker met hover */}
        <div
          className={`absolute right-[62%] w-[9vw] min-w-[50px] max-w-[12rem] overflow-hidden
                      ${animateSkills ? "pop-logo" : "opacity-0"}
                      transition-transform duration-300 transform hover:scale-105 cursor-default`}
          style={{ animationDelay: "0.2s" }}
        >
          <Image
            src="/sparkles_sticker.svg"
            alt="Sparkles Sticker"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Afbeelding */}
        <div className="w-[40vw]">
          <Image
            src="/me_sticker.svg"
            alt="Me"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Animatie */}
      <style jsx>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        .pop-letter {
          display: inline-block;
          animation: popIn 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}