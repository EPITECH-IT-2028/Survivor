import { HeroParallax } from "@/components/ui/hero-parallax";
import { FlipCard } from "@/components/ui/flip-card";
import Image from "next/image";

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
  const startups = [
    {
      title: "EcoTech Solutions",
      link: "/startups/ecotech",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
    },
    {
      title: "HealthAI Platform",
      link: "/startups/healthai",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop",
    },
    {
      title: "FinTech Revolution",
      link: "/startups/fintech",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop",
    },
    {
      title: "EdTech Innovators",
      link: "/startups/edtech",
      thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop",
    },
    {
      title: "Smart Agriculture",
      link: "/startups/smartag",
      thumbnail: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop",
    },
    {
      title: "Quantum Computing Co",
      link: "/startups/quantum",
      thumbnail: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=600&fit=crop",
    },
    {
      title: "Renewable Energy Systems",
      link: "/startups/renewable",
      thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=600&fit=crop",
    },
    {
      title: "Space Technology",
      link: "/startups/spacetech",
      thumbnail: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=600&fit=crop",
    },
    {
      title: "Biotech Ventures",
      link: "/startups/biotech",
      thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=600&fit=crop",
    },
    {
      title: "VR Entertainment",
      link: "/startups/vr",
      thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=600&fit=crop",
    },
    {
      title: "IoT Solutions",
      link: "/startups/iot",
      thumbnail: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=600&fit=crop",
    },
    {
      title: "Blockchain Ventures",
      link: "/startups/blockchain",
      thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=600&fit=crop",
    },
    {
      title: "Cybersecurity Corp",
      link: "/startups/cybersec",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=600&fit=crop",
    },
    {
      title: "Clean Water Tech",
      link: "/startups/watertech",
      thumbnail: "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=600&h=600&fit=crop",
    },
    {
      title: "Mobile Health Apps",
      link: "/startups/mhealth",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
    },
  ];

  return (
    <div className="">
      <div className="max-h-[140rem] overflow-hidden">
        <HeroParallax products={startups} />
      </div>
      <StartupFlipCard />
    </div>
  );
}
