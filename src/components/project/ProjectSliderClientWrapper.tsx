// components/project/ProjectSliderClientWrapper.tsx
"use client";
import React from "react";
import ProjectSlider from "./ProjectSlider";

export default function ProjectSliderClientWrapper({ projects }: { projects: any[] }) {
  return <ProjectSlider projects={projects} />;
}
