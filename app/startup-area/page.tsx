import { AppSidebar } from "@/components/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Users, Inbox, Search, CircleGauge } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: CircleGauge,
  },
  {
    title: "My profile",
    url: "#",
    icon: Users,
  },
  {
    title: "Messages",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Opportunities",
    url: "#",
    icon: Search,
  },
]

export default function StartupArea() {
  return (
    <SidebarProvider>
      <AppSidebar items={items} />
      <SidebarTrigger />
    </SidebarProvider >
  )
}
