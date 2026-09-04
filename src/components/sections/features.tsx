import {
  BookOpen,
  BarChart3,
  Award,
  Users,
  Smartphone,
  MessageCircle,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description:
      "Engage with hands-on projects, quizzes, and real-world scenarios that reinforce every concept.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics, streaks, and personalized milestones.",
  },
  {
    icon: Award,
    title: "Certificates",
    description:
      "Earn recognized certificates upon completion to showcase your skills to employers.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from industry professionals with years of real-world experience in their fields.",
  },
  {
    icon: MessageCircle,
    title: "Community",
    description:
      "Connect with fellow learners, join study groups, and get support from a global community.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Study anywhere with a fully responsive platform that works seamlessly on any device.",
  },
];

function Features() {
  return (
    <section id="features" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-sm font-medium">Features</p>
          <h2
            className="text-foreground mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ textWrap: "balance" }}
          >
            Everything you need to learn effectively
          </h2>
          <p
            className="text-muted-foreground mt-3 max-w-[60ch] text-base leading-relaxed sm:text-lg"
            style={{ textWrap: "pretty" }}
          >
            A complete learning environment designed to help you stay focused,
            track progress, and achieve your goals.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="bg-primary/10 flex size-9 items-center justify-center rounded-lg">
                  <feature.icon className="text-primary size-4.5" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed sm:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Features };
