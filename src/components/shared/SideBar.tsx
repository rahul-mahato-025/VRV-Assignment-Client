import { CircleUserRound, Settings2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Manage Users",
    url: "/",
    icon: CircleUserRound,
  },
  {
    title: "Roles",
    url: "/role-management",
    icon: Settings2,
  },
];

export function SideBar() {
  return (
    <>
      <Sidebar className="bg-card text-white border-none shadow-lg">
        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarHeader className="text-xl text-left font-bold tracking-wider mt-1">
              DASHBOARD
            </SidebarHeader>
            <SidebarGroupContent className="mt-4">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-foreground hover:text-background transition-all."
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span className="font-semibold">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
