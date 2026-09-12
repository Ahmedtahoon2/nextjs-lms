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
    <footer className="border-border bg-muted/30 border-t">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-foreground flex items-center gap-2 text-base font-semibold"
            >
              <GraduationCap className="size-5" />
              <span>EduPlatform</span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-[28ch] text-sm leading-relaxed">
              Empowering learners worldwide with expert-led courses and
              career-focused education.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-foreground text-sm font-medium">
                {group.title}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
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

        <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} EduPlatform. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
