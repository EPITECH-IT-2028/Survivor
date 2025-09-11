"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

const teamMembers = {
  managers: [
    { name: "Elena Enka", email: "elena.enka@jeb-incubator.com" },
    { name: "Bylel Jourdin", email: "bylel.jourdin@jeb-incubator.com" },
    { name: "Javier Barrera", email: "javier.barrera@jeb-incubator.com" },
  ],
  developers: [
    { name: "Nolann Dubos", email: "nolann.dubos@epitech.eu" },
    { name: "Quentin Lapierre", email: "quentin.lapierre@epitech.eu" },
    { name: "Etienne Labarbe", email: "etienne.labarbe@epitech.eu" },
    { name: "Arthur Guerinault", email: "arthur.guerinault@epitech.eu" },
  ],
};

const TeamMember = ({
  name,
  email,
  background,
}: {
  name: string;
  email: string;
  background: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer p-4 text-center"
    >
      <span
        className={`absolute inset-0 rounded-sm ${background} pointer-events-none transition-all duration-100 group-hover:scale-x-105 group-hover:scale-y-95`}
      />
      <p
        className={`z-20 font-medium ${isHovered ? "font-bold text-blue-400 underline underline-offset-4 select-text" : ""}`}
      >
        {isHovered && <Mail className="mr-1 inline" size={12} />}
        {isHovered ? email : name}
      </p>
    </div>
  );
};

export default function About() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 md:max-w-4xl lg:max-w-6xl">
      <h1 className="mb-6 text-start text-6xl font-bold">
        Our Vision and Mission
      </h1>
      <p className="text-justify text-lg leading-relaxed text-gray-700">
        This web platform is dedicated to showcasing the projects that emerge
        from the incubator, acting as a window into the creativity and
        entrepreneurial spirit of its startups. <br />
        <br />
        Its primary goal is to provide greater visibility to project leaders and
        their ventures, helping them reach a broader audience and strengthen
        their market presence. <br />
        Beyond visibility, the platform serves as a bridge between startups and
        key stakeholders such as investors, strategic partners, and potential
        clients, fostering opportunities for growth and collaboration. <br />
        <br />
        It also aims to promote a culture of innovation by highlighting
        cutting-edge ideas and success stories, inspiring both the
        entrepreneurial community and external supporters. <br />
        To remain engaging and relevant, the platform ensures dynamic and
        regular updates on projects, highlighting milestones, achievements, and
        ongoing progress, thereby creating a living showcase of innovation in
        action.
      </p>
      <h1 className="mt-24 mb-12 text-start text-5xl font-bold">Our Team</h1>
      <h2 className="mb-4 border-b-2 border-primary pb-2 text-2xl font-semibold text-primary">
        Managers
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {teamMembers.managers.map((member) => (
          <TeamMember
            key={member.name}
            {...member}
            background="bg-primary/20"
          />
        ))}
      </div>
      <h2 className="mt-20 mb-4 border-b-2 border-accent-foreground pb-2 text-2xl font-semibold text-accent-foreground">
        Developers
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.developers.map((member) => (
          <TeamMember
            key={member.name}
            {...member}
            background="bg-accent-foreground/20"
          />
        ))}
      </div>
    </div>
  );
}
