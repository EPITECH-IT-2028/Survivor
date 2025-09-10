'use client'

import { sidebarItems } from "@/app/types/sidebarItems";
import Opportunities from "@/components/Opportunities";
import { AppSidebar } from "@/components/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function OpportunitiesPage() {
  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger />
      <Opportunities />
    </SidebarProvider>
  );
}
