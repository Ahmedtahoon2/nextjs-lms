import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth-helpers";
import * as profileService from "@/services/profile";
import { ProfileForm } from "@/components/features/profile/profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Profile Settings | LMS",
  description:
    "Manage your profile information, bio, and educational credentials.",
};

export default async function ProfileSettingsPage() {
  let session: Awaited<ReturnType<typeof requireAuth>>;
  try {
    session = await requireAuth();
  } catch {
    redirect("/sign-in");
  }

  const profile = await profileService.getUserProfile(session.user.id);

  return (
    <div className="container mx-auto max-w-2xl py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight text-balance">
            Profile Settings
          </CardTitle>
          <CardDescription className="text-muted-foreground text-pretty">
            Update your public profile, bio, and personal details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm initialData={profile} />
        </CardContent>
      </Card>
    </div>
  );
}
