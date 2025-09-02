import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="relative mx-6 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary"
    >
      <TextRipple className="absolute left-6 pt-2 text-4xl">JEB Incubator.</TextRipple>
      <div className="mx-auto flex">
        <Link
          href="#"
          className="group mx-6 font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
        >
          Discover Startups
          <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
        </Link>
        <Link
          href="#"
          className="group mx-6 font-sf-pro text-lg font-medium text-secondary transition-all duration-100 hover:text-zinc-300"
        >
          See Events
          <span className="block h-0.5 max-w-0 bg-zinc-300 transition-all duration-100 group-hover:max-w-full"></span>
        </Link>
      </div>
      <Link
        href="#"
        className="group relative right-0 mr-6 px-6 py-3"
      >
        <span className="absolute inset-0 rounded-sm border transition-all duration-100 group-hover:scale-x-110 group-hover:scale-y-95 group-hover:bg-secondary"></span>
        <span className="relative text-secondary group-hover:text-primary">Login</span>
      </Link>
    </nav>
  );
}
