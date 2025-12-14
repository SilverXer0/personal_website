'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function SpaceBackground() {
  const [scrollY, setScrollY] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    let ticking = false

    const handleScroll = () => {
      if (ticking) {
        return
      }

      ticking = true
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [reduceMotion])

  // Extremely subtle parallax, Apple-like (nearly imperceptible)
  const y1 = reduceMotion ? 0 : -(scrollY * 0.01)
  const y2 = reduceMotion ? 0 : -(scrollY * 0.015)

  const floatAnim = useMemo(() => {
    if (reduceMotion) {
      return undefined
    }
    return { y: [0, -8, 0] }
  }, [reduceMotion])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base: clean, neutral */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />

      {/* Soft mesh highlights (subtle, not neon) */}
      <motion.div
        className="absolute inset-0 opacity-80 dark:opacity-70"
        style={{ translateY: y1 }}
        animate={floatAnim}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,122,255,0.10),transparent_60%)] dark:bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,122,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_78%_22%,rgba(175,82,222,0.08),transparent_60%)] dark:bg-[radial-gradient(800px_circle_at_78%_22%,rgba(175,82,222,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_55%_85%,rgba(52,199,89,0.06),transparent_65%)] dark:bg-[radial-gradient(900px_circle_at_55%_85%,rgba(52,199,89,0.08),transparent_65%)]" />
      </motion.div>

      {/* Gentle top sheen */}
      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/40 blur-3xl dark:bg-white/10"
        style={{ translateY: y2 }}
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.7, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_35%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_35%,rgba(0,0,0,0.40)_100%)]" />
    </div>
  )
}