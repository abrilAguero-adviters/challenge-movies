import { ContinueWatching } from "@/components/Movies/ContinueWatching/ContinueWatching";
import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { PopularMovies } from "@/components/Movies/PopularMovies/PopularMovies";
import React from "react";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <main className="max-w-[1400px] mx-auto w-full px-6 md:px-4 sm:px-2">
        <div className="w-full">
          <HeroBanner />
        </div>
        <div className="flex gap-6 min-h-[500px] mt-6 md:flex-col md:gap-4 sm:gap-2">
          <div className="flex-1 flex flex-col">
            <ContinueWatching />
            <PopularMovies />
          </div>
        </div>
      </main>
    </div>
  );
};
