"use client";

import * as React from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/mode-toggle";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Courses", href: "#features" },
  { label: "About", href: "#stats" },
  { label: "Contact", href: "#cta" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-foreground flex items-center gap-2 text-base font-semibold"
        >
          <GraduationCap className="size-5" />
          <span>EduPlatform</span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle className="hidden md:inline-flex" />

          <Button
            variant="ghost"
            size="sm"
            className="hidden md:inline-flex"
            nativeButton={false}
            render={<a href="#" />}
          >
            Sign In
          </Button>

          <Button
            size="sm"
            className="hidden md:inline-flex"
            nativeButton={false}
            render={<a href="#" />}
          >
            Get Started
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-border bg-background border-t px-4 pt-2 pb-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <ModeToggle className="w-full" />
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              nativeButton={false}
              render={<a href="#" />}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="w-full"
              nativeButton={false}
              render={<a href="#" />}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
