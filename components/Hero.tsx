"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import React, { useEffect, useState } from 'react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function Hero() {
  const [rotation, setRotation] = useState(0);
  const dogs = [
    '🐕', '🐶', '🦮', '🐕‍🦺', '🐩', '🐺', 
    '🐾', '🦊', '🐕', '🐶', '🦮', '🐕‍🦺',
    '🐩', '🐺', '🐾', '🦊'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev - 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-6 border border-purple-500 rounded-xl shadow-lg">
      <div className="inset-0 bg-gradient-to-r from-purple-900/10 to-blue-500/10 rounded-xl blur-3xl -z-10" />
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="relative flex justify-center items-center" style={{ height: '400px', width: '400px', marginTop: '40px' }}>
            <div
              className="absolute"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.1s linear',
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {dogs.map((dog, index) => (
                <span
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${(index * 22.5)}deg) translate(180px) rotate(-${(index * 22.5)}deg)`,
                    fontSize: '2.5rem',
                  }}
                >
                  {dog}
                </span>
              ))}
            </div>
            <div className="relative z-10 bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-full shadow-md">
              <div className="bg-white dark:bg-slate-950 rounded-full p-1">
                <Image 
                  src="/rug-watch-dog-circle.png"
                  alt="Rug Watch Dog Logo"
                  width={100}
                  height={100}
                  className="rounded-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className={`text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500
                          text-transparent bg-clip-text ${poppins.className}`}>
            RugWatchDog
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Welcome to RugWatchDog, an advanced AI-driven platform that helps investors analyze cryptocurrency tokens, 
            especially meme coins <span className="font-medium">🐕💰</span>, to detect potential "rug pulls" 
            <span className="font-medium">🛑</span>. This project combines cutting-edge machine learning 
            <span className="font-medium">📊</span>, blockchain data analysis <span className="font-medium">🔗</span>, 
            and chatbot integration <span className="font-medium">🤝</span> to enhance security 
            <span className="font-medium">🔒</span> in the crypto ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}
