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
  const projectCatalog = "/project-catalog";
  const startups = [
    {
      title: "EcoTech Solutions",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
    },
    {
      title: "HealthAI Platform",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop",
    },
    {
      title: "FinTech Revolution",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
    },
    {
      title: "EdTech Innovators",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop",
    },
    {
      title: "Smart Agriculture",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop",
    },
    {
      title: "Quantum Computing Co",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=600&fit=crop",
    },
    {
      title: "Renewable Energy Systems",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=600&fit=crop",
    },
    {
      title: "Space Technology",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=600&fit=crop",
    },
    {
      title: "Blockchain Ventures",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=600&fit=crop",
    },
    {
      title: "VR Entertainment",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=600&fit=crop",
    },
    {
      title: "IoT Solutions",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=600&fit=crop",
    },
    {
      title: "Biotech Ventures",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop",
    },
    {
      title: "Cybersecurity Corp",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=600&fit=crop",
    },
    {
      title: "Clean Water Tech",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=600&fit=crop",
    },
    {
      title: "Mobile Health Apps",
      link: projectCatalog,
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
    },
  ];

  const startupOneDesc =
    "An innovative platform revolutionizing the way we connect and collaborate.";
  const startupTwoDesc =
    "A cutting-edge solution transforming the future of healthcare with AI technology";
  const startupThreeDesc =
    "A sustainable energy startup dedicated to creating eco-friendly solutions for a greener planet.";

  return (
    <div>
      <div className="relative left-1/2 z-10 mb-18 max-h-[40rem] w-dvw -translate-x-1/2 overflow-hidden md:max-h-[100rem] lg:max-h-[140rem]">
        <div className="pointer-events-none absolute bottom-0 z-10 size-6 h-[10rem] w-full bg-gradient-to-t from-white to-transparent lg:bottom-28" />
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
