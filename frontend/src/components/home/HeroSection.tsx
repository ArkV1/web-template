import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <Image
          src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hero+Background"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
          Stay Anywhere. Live Everywhere.
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
          Experience coliving and coworking in the world's most inspiring locations
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              placeholder="Where to?"
              className="flex-1 p-4 text-black rounded focus:outline-none"
            />
            <button className="bg-neutral-900 text-white px-8 py-4 rounded hover:bg-black transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
