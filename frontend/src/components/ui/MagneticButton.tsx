import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

interface MagneticButtonProps extends React.PropsWithChildren {
  className?: string
  onClick?: () => void
  variant?: "primary" | "outline" | "ghost"
}

export function MagneticButton({ children, className, onClick, variant = "primary" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 }
    
    // Calculate distance from center
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    setPosition({ x: x * 0.2, y: y * 0.2 }) // Adjust multiplier for strength
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const baseStyles = "relative px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-colors duration-300 overflow-hidden group"
  
  const variants = {
    primary: "bg-primary text-white hover:bg-orange-500",
    outline: "border border-white/20 text-white hover:border-primary hover:text-primary",
    ghost: "text-neutral-400 hover:text-white"
  }

  const { x, y } = position

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn("inline-block", className)}
      onClick={onClick}
    >
      <button className={cn(baseStyles, variants[variant])}>
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {/* Glow effect on hover */}
        {variant === 'primary' && (
           <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </button>
    </motion.div>
  )
}
