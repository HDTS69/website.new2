"use client";

import { WavyBackground } from "./ui/wavy-background";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToElement } from "@/lib/utils";

export const BannerCTA = () => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      scrollToElement('book');
    } else {
      window.location.href = '/book';
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <WavyBackground
        className="w-full px-4 py-8"
        containerClassName="h-auto min-h-[200px] relative w-full overflow-hidden"
        colors={["#00E6CA", "#1CD4A7", "#14B8A6"]}
        waveWidth={200}
        backgroundFill="#000000"
        blur={2}
        waveOpacity={0.3}
        speed="slow"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl">
            Book your appointment today and let us help you achieve your goals
          </p>
          <Link
            href="/book"
            onClick={handleClick}
            className="inline-flex items-center px-6 py-3 text-base font-semibold text-white bg-[#00E6CA] hover:bg-[#1CD4A7] rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Book Online Now
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400 max-w-4xl mx-auto">
          Transforming experiences, one appointment at a time
        </div>
      </WavyBackground>
    </div>
  );
}; 