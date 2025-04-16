import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, MessageSquare, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import { useIsMobile } from "@/hooks/use-mobile";

const AppSidebar = () => {
  const currentPath = usePathname();
  const { setOpen } = useSidebar();

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
        {useIsMobile() ? <SidebarProvider /> : <Toggle
          onClick={() => setOpen(false)}
          className="rounded-full p-2"
          aria-label="Close sidebar"
        >
          <XIcon onClick={() => setOpen(false)} className="h-5 w-5" />
        </Toggle>}
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