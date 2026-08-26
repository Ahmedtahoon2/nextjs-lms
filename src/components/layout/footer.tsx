import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Courses", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Instructors", href: "#" },
      { label: "Certificates", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-base font-semibold text-foreground"
            >
              <GraduationCap className="size-5" />
              <span>EduPlatform</span>
            </Link>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
              Empowering learners worldwide with expert-led courses and
              career-focused education.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-medium text-foreground">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
