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
    <Card className="border border-border/80 bg-card shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-pretty">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <React.Suspense
          fallback={
            <div className="h-48 animate-pulse rounded-lg bg-muted/40" />
          }
        >
          <SignInForm />
        </React.Suspense>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center border-border/50 border-t py-4 text-xs text-muted-foreground">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline transition-colors cursor-pointer"
          >
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
