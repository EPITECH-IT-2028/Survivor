"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { FlipCard } from "@/components/ui/flip-card";
import Image from "next/image";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { useState, useEffect } from "react";
import Link from "next/link";

function Front(props: { title?: string; thumbnail?: string }) {
  return (
    <div className="relative flex size-full items-center justify-center">
      <Image
        src={props.thumbnail || "/unsplash.jpg"}
        width={100}
        height={100}
        alt="front image"
        className="absolute inset-0 size-full object-cover"
      />
      <h3 className="relative text-center font-mono text-2xl font-semibold text-white uppercase">
        {props.title || "Startup Name"}
      </h3>
    </div>
  );
}

function Back(props: { description?: string; link?: string }) {
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-3 bg-zinc-950 p-4 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
      <h3 className="text-xl font-bold tracking-widest uppercase">
        Explore More
      </h3>
      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        {props.description || "No description available."}
      </p>
      <Link href={props.link || "#"} target="_blank" rel="noopener noreferrer">
        <button className="mt-2 cursor-pointer rounded-full bg-zinc-50 px-4 py-1.5 text-sm font-medium text-zinc-900 transition hover:opacity-90 dark:bg-zinc-950 dark:text-zinc-50">
          Learn More
        </button>
      </Link>
    </div>
  );
}

interface StartupFlipCardProps {
  title?: string;
  description?: string;
  link?: string;
  thumbnail?: string;
}

function StartupFlipCard(props: StartupFlipCardProps) {
  return (
    <FlipCard
      front={<Front title={props.title} thumbnail={props.thumbnail} />}
      back={<Back description={props.description} link={props.link} />}
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

  const startupOneDesc =
    "An innovative platform revolutionizing the way we connect and collaborate.";
  const startupTwoDesc =
    "A cutting-edge solution transforming the future of healthcare with AI technology";
  const startupThreeDesc =
    "A sustainable energy startup dedicated to creating eco-friendly solutions for a greener planet.";

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
          <StartupFlipCard
            title="EcoLoop"
            description={startupOneDesc}
            link="/project-catalog"
            thumbnail="https://images.unsplash.com/photo-1658242106760-7a5c8f177180?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <StartupFlipCard
            title="HealthBridge"
            description={startupTwoDesc}
            link="/project-catalog"
            thumbnail="https://images.unsplash.com/photo-1727060592889-0bde29c57213?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <StartupFlipCard
            title="GreenFleet"
            description={startupThreeDesc}
            link="/project-catalog"
            thumbnail="https://images.unsplash.com/photo-1585871746932-e133d3fedf4d?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
      </div>
    </div>
  );
}
