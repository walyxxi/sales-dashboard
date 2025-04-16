import React from "react";
import PropTypes from "prop-types";
import { Toggle } from "@/components/ui/toggle";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = ({ title = "Sales Dashboard" }) => {
  const { theme, setTheme } = useTheme();
  const { open, setOpen } = useSidebar();
  const isMobile = useIsMobile();

  console.log(open, isMobile);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-background border-b">
      <div className="flex items-center space-x-2">
        {!open && !isMobile && 
          <Toggle onClick={() => setOpen(true)} className="p-2" aria-label="Open sidebar">
            <MenuIcon className="h-5 w-5" />
          </Toggle>
        }
        {isMobile && <SidebarTrigger/>}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <Toggle 
        pressed={theme === "dark"} 
        onPressedChange={toggleTheme}
        aria-label="Toggle theme"
        className="rounded-full p-2"
      >
        {theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Toggle>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;