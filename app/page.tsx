"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { FlipCard } from "@/components/ui/flip-card";
import Image from "next/image";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { useState, useEffect } from "react";

function Front() {
  return (
    <div className="relative flex size-full items-center justify-center">
      <Image
        src="/unsplash.jpg"
        width={100}
        height={100}
        alt="front image"
        className="absolute inset-0 size-full"
      />
      <h3 className="relative font-mono text-5xl font-semibold text-white uppercase">
        BLOOM
      </h3>
    </div>
  );
}

function Back() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-3 bg-zinc-950 p-4 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
      <h3 className="text-xl font-bold tracking-widest uppercase">
        Explore More
      </h3>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        Dive into our exclusive collection of hand-crafted visuals.
      </p>
      <button className="mt-2 cursor-pointer rounded-full bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-900 transition hover:opacity-90 dark:bg-zinc-950 dark:text-zinc-50">
        Browse Now
      </button>
    </div>
  );
}

function StartupFlipCard() {
  return (
    <FlipCard
      front={<Front />}
      back={<Back />}
      flipDirection="horizontal"
      flipRotation="forward"
    />
  );
}

export default function Home() {
  const [startups, setStartups] = useState<
    { title: string; link: string; thumbnail: string }[]
  >([]);
  useEffect(() => {
    const fetchStartups = async () => {
      const startupData = await getStartups();
      const parsedStartups = startupData.map((startup) => ({
        title: startup.name,
        link: "#",
        thumbnail:
          "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
      }));
      setStartups(parsedStartups);
    };
    fetchStartups();
  }, []);

  return (
    <div className="">
      <div className="relative left-1/2 z-10 mb-18 max-h-[140rem] w-dvw -translate-x-1/2 overflow-hidden">
        <div className="pointer-events-none absolute bottom-28 z-10 size-6 h-[10rem] w-full bg-gradient-to-t from-white to-transparent" />
        <HeroParallax products={startups} />
      </div>
      <div className="rounded-lg bg-muted p-6 shadow-md">
        <p className="mt-16 mb-24 flex justify-center font-canela-black text-6xl underline decoration-wavy decoration-3 underline-offset-[1rem]">
          Featured Projects
        </p>
        <div className="flex justify-around">
          <StartupFlipCard />
          <StartupFlipCard />
          <StartupFlipCard />
        </div>
      </div>
    </div>
  );
}
