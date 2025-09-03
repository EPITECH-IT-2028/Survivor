import { HeroParallax } from "@/components/ui/hero-parallax";

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
    <div className="min-h-screen">
      <HeroParallax products={startups} />
    </div>
  );
}
