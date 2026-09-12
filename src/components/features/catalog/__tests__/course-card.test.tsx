import React from "react";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../course-card";
import { CourseLevel } from "@prisma/client";
import type { CatalogCourseItem } from "@/services/course";

describe("CourseCard Component", () => {
  const mockCourse: CatalogCourseItem = {
    id: "c-1",
    title: "Fullstack Next.js 16",
    slug: "fullstack-nextjs-16",
    description: "Build robust fullstack web applications.",
    thumbnailUrl: "https://example.com/thumb.jpg",
    level: CourseLevel.INTERMEDIATE,
    category: "Web Development",
    instructor: {
      id: "inst-1",
      name: "Sarah Connor",
      image: null,
      avatarUrl: null,
    },
    modulesCount: 5,
    totalLessons: 24,
    enrollmentCount: 150,
    isEnrolled: false,
    progressPercentage: null,
  };

  it("renders course title, description, level badge, and category", () => {
    render(<CourseCard course={mockCourse} />);

    expect(screen.getByText("Fullstack Next.js 16")).toBeInTheDocument();
    expect(
      screen.getByText("Build robust fullstack web applications."),
    ).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("Sarah Connor")).toBeInTheDocument();
    expect(screen.getByText("5 modules")).toBeInTheDocument();
    expect(screen.getByText("24 lessons")).toBeInTheDocument();
    expect(screen.getByText("View Course")).toBeInTheDocument();
  });

  it("renders enrolled badge and Continue button when user is enrolled", () => {
    const enrolledCourse: CatalogCourseItem = {
      ...mockCourse,
      isEnrolled: true,
      progressPercentage: 45,
    };

    render(<CourseCard course={enrolledCourse} />);

    expect(screen.getByText("Enrolled")).toBeInTheDocument();
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("45% Complete")).toBeInTheDocument();
  });
});
