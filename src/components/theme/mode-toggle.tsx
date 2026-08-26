"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// Render the same output on the server and the first client render, then
// switch to theme-dependent content once mounted to avoid hydration mismatch.
function ModeToggle(props: React.ComponentProps<typeof Button>) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Mark component as mounted to avoid hydration mismatch
    // This is a safe pattern for detecting client-side mounting
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // On the server and the first client render `isDark` is unknown, so we use a
  // stable aria-label and the light-mode icon markup. These match exactly
  // between server and client, preventing the hydration error.
  const isDark =
    mounted &&
    (theme === "dark" || (theme === "system" && resolvedTheme === "dark"));
  const label = mounted
    ? isDark
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      {...props}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

export { ModeToggle };
