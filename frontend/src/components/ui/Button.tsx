import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { motion } from "framer-motion"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wider font-heading",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-orange-600 shadow-[0_0_20px_-5px_rgba(236,76,19,0.5)] hover:shadow-[0_0_30px_-5px_rgba(236,76,19,0.7)] border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/5 hover:border-primary/50 text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-white/5",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-orange-600 to-red-600 text-white border-none shadow-[0_0_25px_-5px_rgba(236,76,19,0.6)] hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-14 rounded-sm px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Wrapped with Framer Motion for that "dynamic" feel
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, we should probably stick to Slot or just render children.
    // For now, let's keep it simple. If we need motion on Slot, it's trickier.
    // We'll prioritize the motion button if it's not a Slot.
    
    // NOTE: Radix Slot doesn't play nice with motion.div refs out of the box without composition.
    // For this V1, I'll avoid Slot + Motion complexity and just use a span wrapper or standard button if not asChild.
    
    const Comp = asChild ? Slot : "button"
    
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as any}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.2 }}
        {...(props as any)}
      >
        {props.children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
