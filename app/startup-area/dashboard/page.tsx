"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sideBar";
import { DashboardStartup } from "@/components/dashboardStartup";
import { sidebarItems } from "@/app/types/sidebarItems";

export default function StartupAreaDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar items={sidebarItems} />
      <SidebarTrigger />
      <DashboardStartup />
    </SidebarProvider >
  )
}
