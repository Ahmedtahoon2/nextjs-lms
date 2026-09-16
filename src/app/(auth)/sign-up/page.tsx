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
    <Card className="border border-border/80 bg-card shadow-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground text-pretty">
          Choose your role and enter your details to get started
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <React.Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-lg bg-muted/40" />
          }
        >
          <SignUpForm />
        </React.Suspense>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center border-border/50 border-t py-4 text-xs text-muted-foreground">
        <p>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:underline transition-colors cursor-pointer"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
