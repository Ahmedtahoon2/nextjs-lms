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
import { SignInForm } from "@/components/features/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In — EduPlatform",
  description:
    "Sign in to your EduPlatform account to access your courses and workspace.",
};

export default function SignInPage() {
  return (
    <Card className="border-border/80 bg-card border shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-foreground text-2xl font-bold tracking-tight text-balance">
          Welcome back
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm text-pretty">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <React.Suspense
          fallback={
            <div className="bg-muted/40 h-48 animate-pulse rounded-lg" />
          }
        >
          <SignInForm />
        </React.Suspense>
      </CardContent>

      <CardFooter className="border-border/50 text-muted-foreground flex flex-col items-center justify-center border-t py-4 text-xs">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary cursor-pointer font-medium transition-colors hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
