"use client";

import * as React from "react";
import {
  GraduationCap,
  Menu,
  X,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { UserNav } from "@/components/features/auth/user-nav";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/global/theme/mode-toggle";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Instructor", href: "/instructor/courses" },
  { label: "About", href: "/#stats" },
  { label: "Contact", href: "/#cta" },
];

function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session, isPending } = authClient.useSession();

  const handleMobileSignOut = async () => {
    try {
      await authClient.signOut();
      gooeyToast.success("Signed out successfully");
      setMobileOpen(false);
      router.push("/sign-in");
      router.refresh();
    } catch {
      gooeyToast.error("Failed to sign out");
    }
  };

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
            <Link
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle className="hidden md:inline-flex" />

          {isPending ? (
            <div className="hidden h-8 w-16 animate-pulse rounded-md bg-muted md:inline-flex" />
          ) : session?.user ? (
            <div className="hidden md:inline-flex">
              <UserNav />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex"
                nativeButton={false}
                render={<Link href="/sign-in" />}
              >
                Sign In
              </Button>

              <Button
                size="sm"
                className="hidden md:inline-flex"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                Get Started
              </Button>
            </>
          )}

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
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <ModeToggle className="w-full" />
            {session?.user ? (
              <div className="flex flex-col gap-1 border-t border-border pt-2">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-semibold text-foreground">
                    {session.user.name || "My Account"}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
                <Link
                  href="/settings/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Settings className="size-3.5" />
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/instructor/courses"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <LayoutDashboard className="size-3.5" />
                  <span>Instructor Workspace</span>
                </Link>
                <button
                  type="button"
                  onClick={handleMobileSignOut}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  nativeButton={false}
                  render={
                    <Link
                      href="/sign-in"
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="w-full"
                  nativeButton={false}
                  render={
                    <Link
                      href="/sign-up"
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export { Header };
