"use client"

import { TStartups } from "@/app/types/startup";

export default function StartupCard({ startup, image }: { startup: TStartups; image: string }) {
  return (
      <div
        className="transform rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 hover:scale-105 group-hover:shadow-2xl"
      >
        <h2 className="mb-3 font-bold text-black text-xl">{startup.name}</h2>
        <h3 className="mb-3 text-black text-xl">{startup.sector}</h3>
        <h3 className="mb-3 text-black text-xl">{startup.maturity}</h3>
        <h3 className="mb-3 text-black text-xl">{startup.address}</h3>
        <div className="mt-4 flex items-center text-sm text-white/80">
          <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
  )
}
