import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "BUTTON" || (e.target as HTMLElement).tagName === "A") {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input { cursor: none; }
      `}</style>
      
      {/* Main Cursor (Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Follower (Ring) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary rounded-full pointer-events-none z-[9998] opacity-50"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24, scale: isHovering ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
      />

      {/* Smoke Clearing Effect (Mask) */}
      {/* This is a visual trick using a radial gradient mask that follows the cursor to 'clear' a fog layer if we had one. 
          For now, it adds a glowing atmosphere around the cursor. */}
      {/* <motion.div 
        className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"
        animate={{ x: mousePosition.x - 192, y: mousePosition.y - 192 }}
        transition={{ type: "tween", ease: "linear", duration: 0.2 }}
      /> */}
    </>
  )
}
