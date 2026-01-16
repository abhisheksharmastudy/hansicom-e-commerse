import { cn } from "../../lib/utils"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export function GlassCard({ children, className, hoverEffect = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden",
        hoverEffect && "hover:border-primary/50 hover:bg-white/10 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
