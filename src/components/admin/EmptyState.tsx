// src/components/admin/EmptyState.tsx
export default function EmptyState({ title = "Nothing here", subtitle = "" }: any) {
  return (
    <div className="bg-white/3 p-6 rounded text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
}
