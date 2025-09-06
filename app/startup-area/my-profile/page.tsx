"use client";
import { sidebarItems } from "@/app/types/sidebarItems";
import { AppSidebar } from "@/components/sideBar";
import { UpdateStartup } from "@/components/startupProfilePage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function startupProfilePage() {
  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger />
      <UpdateStartup />
    </SidebarProvider>
  );
}