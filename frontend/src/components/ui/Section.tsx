import { type ReactNode } from "react"
import { cn } from "../../lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: "default" | "muted" | "dark" | "pattern"
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  const bgStyles = {
    default: "bg-background",
    muted: "bg-muted/30",
    dark: "bg-secondary text-secondary-foreground",
    pattern: "bg-neutral-900 text-white bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" // Placeholder pattern
  }

  return (
    <section 
      id={id}
      className={cn(
        "py-16 md:py-24",
        bgStyles[background],
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        {children}
      </div>
    </section>
  )
}
