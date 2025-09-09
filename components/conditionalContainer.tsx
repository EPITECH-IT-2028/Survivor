"use client";

import { usePathname } from "next/navigation";

interface ConditionalContainerProps {
  children: React.ReactNode;
}

export default function ConditionalContainer({ children }: ConditionalContainerProps) {
  const pathname = usePathname();
  const isStartupArea = pathname.startsWith('/startup-area');

  if (isStartupArea) {
    return <div className="h-screen w-full">{children}</div>;
  }

  return <div className="mx-auto max-w-6xl">{children}</div>;
}
