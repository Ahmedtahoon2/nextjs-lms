"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "@/lib/validations/profile";
import { updateProfileAction } from "@/actions/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface ProfileFormProps {
  initialData: {
    name?: string | null;
    headline?: string | null;
    bio?: string | null;
    website?: string | null;
    avatarUrl?: string | null;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: initialData.name ?? "",
      headline: initialData.headline ?? "",
      bio: initialData.bio ?? "",
      website: initialData.website ?? "",
      avatarUrl: initialData.avatarUrl ?? "",
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    setFeedback(null);
    try {
      const result = await updateProfileAction(data);
      if (result.success) {
        setFeedback({
          type: "success",
          message: "Profile updated successfully.",
        });
      } else {
        setFeedback({
          type: "error",
          message: result.error || "Failed to update profile.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {feedback && (
        <div
          role="alert"
          className={`flex items-center gap-2.5 rounded-lg p-3.5 text-sm ${
            feedback.type === "success"
              ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 text-destructive border-destructive/20 border"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Full Name
        </Label>
        <Input
          id="name"
          placeholder="Enter your name"
          aria-invalid={!!errors.name}
          className="min-h-10"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="headline" className="text-sm font-medium">
          Headline
        </Label>
        <Input
          id="headline"
          placeholder="e.g. Senior Software Engineer and Educator"
          aria-invalid={!!errors.headline}
          className="min-h-10"
          {...register("headline")}
        />
        {errors.headline && (
          <p className="text-destructive text-sm">{errors.headline.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium">
          Biography
        </Label>
        <Textarea
          id="bio"
          placeholder="Tell learners about your background and expertise"
          aria-invalid={!!errors.bio}
          className="min-h-25"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-destructive text-sm">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="text-sm font-medium">
          Website
        </Label>
        <Input
          id="website"
          type="url"
          placeholder="https://yourwebsite.com"
          aria-invalid={!!errors.website}
          className="min-h-10"
          {...register("website")}
        />
        {errors.website && (
          <p className="text-destructive text-sm">{errors.website.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatarUrl" className="text-sm font-medium">
          Avatar URL
        </Label>
        <Input
          id="avatarUrl"
          type="url"
          placeholder="https://example.com/avatar.jpg"
          aria-invalid={!!errors.avatarUrl}
          className="min-h-10"
          {...register("avatarUrl")}
        />
        {errors.avatarUrl && (
          <p className="text-destructive text-sm">{errors.avatarUrl.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="min-h-10 px-5 transition-transform active:scale-[0.98]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Saving Profile...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
}
