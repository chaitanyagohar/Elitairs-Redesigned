import React from "react";

interface ProjectMapProps {
  mapUrl: string | null;
}

export default function ProjectMap({ mapUrl }: ProjectMapProps) {
  if (!mapUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-200 text-sm font-medium">
        Map Not Available
      </div>
    );
  }

  return (
    <iframe
      src={mapUrl}
      className="absolute inset-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Project Location Map"
    />
  );
}