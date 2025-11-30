// src/lib/metadata.ts
export function buildMeta({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return {
    title: title ? `${title} | Elitairs` : "Elitairs - Luxury Real Estate",
    description: description || "Elitairs — premium real estate developments.",
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
    },
  };
}
