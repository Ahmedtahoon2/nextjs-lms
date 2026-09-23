import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/features/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create an Account — EduPlatform",
  description:
    "Join EduPlatform to start learning or create and publish courses as an instructor.",
};

export default function SignUpPage() {
  return (
    <Card className="border-border/80 bg-card border shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-foreground text-2xl font-bold tracking-tight text-balance">
          Create an account
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm text-pretty">
          Choose your role and enter your details to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <React.Suspense
          fallback={
            <div className="bg-muted/40 h-64 animate-pulse rounded-lg" />
          }
        >
          <SignUpForm />
        </React.Suspense>
      </CardContent>

      <CardFooter className="border-border/50 text-muted-foreground flex flex-col items-center justify-center border-t py-4 text-xs">
        <p>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-primary cursor-pointer font-medium transition-colors hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
