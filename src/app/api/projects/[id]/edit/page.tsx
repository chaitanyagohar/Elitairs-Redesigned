import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"; // Verify this path matches your project structure
import AdminProjectForm from "@/components/admin/AdminProjectForm"; // Verify this path matches your project structure

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({ params }: EditPageProps) {
  const { id } = params;

  // Fetch the project with related data
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      gallery: true,
      floorplans: true,
    },
  });

  // Handle 404 if project doesn't exist
  if (!project) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      {/* Pass the fetched data to your client-side form component */}
<AdminProjectForm initialData={project} />
    </main>
  );
}