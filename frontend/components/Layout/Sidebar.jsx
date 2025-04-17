import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const currentPath = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      title: "AI Chat",
      icon: MessageSquare,
      path: "/chat",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-row items-center justify-between">
        <h2 className="text-lg font-bold">Sales</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.title}>
              <SidebarMenuItem className="mx-2" key={item.title}>
                <SidebarMenuButton
                  isActive={currentPath === item.path}
                  tooltip={item.title}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;