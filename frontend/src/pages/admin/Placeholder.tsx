import { Construction } from "lucide-react"

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <Construction className="h-16 w-16 text-primary/50 mb-4" />
      <h1 className="text-3xl font-heading font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground max-w-md">
        This section is under development. The full functionality will be available in future updates.
      </p>
    </div>
  )
}
