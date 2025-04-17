import { Toggle } from "@/components/ui/toggle";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ title = "Sales Dashboard" }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between py-4 px-6 bg-background border-b">
      <div className="flex items-center space-x-2">
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