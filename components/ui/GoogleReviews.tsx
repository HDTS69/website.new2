'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function GoogleReviews() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>
        <a
          href="https://www.google.com/maps/place/HD+Trade+Services/@-27.5589,153.0543,17z/data=!4m8!3m7!1s0x6b915f67b764bb01:0x965c76ba03d3f96f!8m2!3d-27.5589!4d153.0543!9m1!1b1!16s%2Fg%2F11h_2xtc4h?entry=ttu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white text-sm font-medium"
        >
          <span className="text-white font-semibold">5.0</span> from 36+ Google Reviews
        </a>
      </div>
    </div>
  );
} 