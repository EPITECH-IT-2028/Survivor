import { TextRipple } from "@/components/ui/text-ripple";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      aria-label="Navigation principale"
      className="relative mx-6 mt-5 flex h-24 items-center justify-between rounded-xl bg-primary font-canela-black text-secondary"
    >
      <TextRipple className="absolute left-6 pt-2 text-4xl">JEB Incubator.</TextRipple>
      <div className="mx-auto">
        <Link
          href="#"
          className="mx-6 font-sf-pro text-lg font-medium text-secondary underline decoration-wavy decoration-1 underline-offset-4 transition-all duration-100 hover:scale-x-110 hover:scale-y-95 hover:text-zinc-400 hover:decoration-zinc-400"
        >
          Discover Startups
        </Link>
        <Link
          href="#"
          className="mx-6 font-sf-pro text-lg font-medium text-secondary underline decoration-wavy decoration-1 underline-offset-4 transition-all duration-100 hover:scale-x-110 hover:scale-y-95 hover:text-zinc-400 hover:decoration-zinc-400"
        >
          See Events
        </Link>
      </div>
      <Link
        href="#"
        className="absolute right-0 mr-6 rounded-lg border border-secondary bg-secondary px-6 py-2 text-lg font-medium text-primary transition-transform duration-100 hover:scale-x-110 hover:scale-y-95 hover:bg-primary hover:text-secondary"
      >
        Login
      </Link>
    </nav>
  );
}
