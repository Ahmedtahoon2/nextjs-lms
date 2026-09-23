"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { assignInitialRoleAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import {
  AlertCircle,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Loader2,
} from "lucide-react";

export function SignUpForm() {
  const router = useRouter();

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "student",
    },
  });

  const selectedRole = watch("role") || "student";

  const onSubmit = async (data: SignUpInput) => {
    setServerError(null);

    try {
      const response = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        const errorMsg =
          response.error.message ||
          "Failed to create account. Please try again.";
        setServerError(errorMsg);
        gooeyToast.error(errorMsg);
        return;
      }

      // If instructor role was chosen, assign the instructor role via Server Action
      if (data.role === "instructor") {
        try {
          await assignInitialRoleAction("instructor");
        } catch {
          // Non-blocking: background assignment hook handles fallback
        }
      }

      gooeyToast.success(
        "Account created successfully! Welcome to EduPlatform.",
      );

      const destination =
        data.role === "instructor" ? "/instructor/courses" : "/courses";

      router.push(destination);
      router.refresh();
    } catch {
      const genericError = "An unexpected error occurred. Please try again.";
      setServerError(genericError);
      gooeyToast.error(genericError);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div
          role="alert"
          className="border-destructive/20 bg-destructive/10 text-destructive flex items-center gap-2.5 rounded-lg border p-3.5 text-sm"
        >
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="space-y-1.5">
        <Label className="text-foreground text-sm font-medium">
          I want to join as a
        </Label>
        <div
          className="grid grid-cols-2 gap-3"
          role="radiogroup"
          aria-label="Account Type"
        >
          <label
            className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all active:scale-[0.98] ${
              selectedRole === "student"
                ? "border-primary bg-primary/10 text-primary ring-primary/20 font-medium shadow-xs ring-1"
                : "border-border bg-card/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              value="student"
              {...register("role")}
              className="sr-only"
            />
            <GraduationCap className="size-5" aria-hidden="true" />
            <span className="text-xs font-semibold">Student</span>
            <span className="text-muted-foreground text-[10px]">
              Take courses
            </span>
          </label>

          <label
            className={`flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-all active:scale-[0.98] ${
              selectedRole === "instructor"
                ? "border-primary bg-primary/10 text-primary ring-primary/20 font-medium shadow-xs ring-1"
                : "border-border bg-card/60 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              value="instructor"
              {...register("role")}
              className="sr-only"
            />
            <BookOpen className="size-5" aria-hidden="true" />
            <span className="text-xs font-semibold">Instructor</span>
            <span className="text-muted-foreground text-[10px]">
              Create courses
            </span>
          </label>
        </div>
      </div>

      {/* Name field */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-foreground text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          {...register("name")}
          aria-invalid={Boolean(errors.name)}
          className="h-10"
        />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-foreground text-sm font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          className="h-10"
        />
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-1.5">
        <Label
          htmlFor="password"
          className="text-foreground text-sm font-medium"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            {...register("password")}
            aria-invalid={Boolean(errors.password)}
            className="h-10 pr-10"
          />
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer p-1 transition-colors"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {errors.password ? (
          <p className="text-destructive text-xs">{errors.password.message}</p>
        ) : (
          <p className="text-muted-foreground text-[11px]">
            Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1
            number.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 h-10 w-full cursor-pointer font-semibold transition-transform active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
