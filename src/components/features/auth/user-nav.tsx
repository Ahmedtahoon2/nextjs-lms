"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { BookOpen, LayoutDashboard, LogOut, Settings } from "lucide-react";

export function UserNav() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (isPending) {
    return (
      <div className="bg-muted ring-border size-8 animate-pulse rounded-full ring-1" />
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      gooeyToast.success("Signed out successfully");
      setIsOpen(false);
      router.push("/sign-in");
      router.refresh();
    } catch {
      gooeyToast.error("Failed to sign out");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-primary/10 text-primary ring-primary/20 hover:ring-primary/40 focus-visible:ring-ring flex size-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold ring-1 transition-all focus-visible:ring-2 focus-visible:outline-none active:scale-[0.96]"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User navigation menu"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User avatar"}
            width={36}
            height={36}
            className="size-full rounded-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="border-border bg-card text-card-foreground animate-in fade-in-50 zoom-in-95 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl border p-1 shadow-lg ring-1 ring-black/5 duration-100"
        >
          {/* User Details */}
          <div className="border-border border-b px-3 py-2.5">
            <p className="text-foreground truncate text-xs font-semibold">
              {user.name || "My Account"}
            </p>
            <p className="text-muted-foreground truncate text-[11px]">
              {user.email}
            </p>
          </div>

          {/* Nav items */}
          <div className="py-1">
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors"
              role="menuitem"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              <span>Browse Courses</span>
            </Link>

            <Link
              href="/instructor/courses"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors"
              role="menuitem"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              <span>Instructor Workspace</span>
            </Link>

            <Link
              href="/settings/profile"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-colors"
              role="menuitem"
            >
              <Settings className="size-4" aria-hidden="true" />
              <span>Profile Settings</span>
            </Link>
          </div>

          <div className="border-border border-t py-1">
            <button
              type="button"
              onClick={handleSignOut}
              className="text-destructive hover:bg-destructive/10 flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs transition-colors"
              role="menuitem"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
