import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  variant?: "glass" | "solid" | "outline"
  hoverEffect?: boolean
}

export function Card({ className, children, variant = "glass", hoverEffect = true, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Mouse tilt logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })
  
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })

  const variants = {
    glass: "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl",
    solid: "bg-neutral-900 border border-neutral-800",
    outline: "bg-transparent border border-neutral-700",
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={hoverEffect ? handleMouseMove : undefined}
      onMouseLeave={hoverEffect ? handleMouseLeave : undefined}
      className={cn(
        "rounded-2xl overflow-hidden relative transition-all duration-300 group",
        variants[variant],
        hoverEffect && "hover:border-primary/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]",
        className
      )}
      {...props}
    >
      {/* Glare Effect */}
      {hoverEffect && (
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 80%)`
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-0" style={{ transform: "translateZ(20px)" }}>
         {children}
      </div>
    </motion.div>
  )
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-2", className)} {...props}>{children}</div>
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-bold text-xl font-heading text-foreground", className)} {...props}>{children}</h3>
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props}>{children}</p>
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-2 h-full", className)} {...props}>{children}</div>
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>{children}</div>
}
