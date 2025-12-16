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
      <div className="absolute inset-0 bg-white dark:bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-black dark:to-neutral-950" />

      <motion.div
        className="absolute inset-0 opacity-80 dark:opacity-75"
        style={{ translateY: y1 }}
        animate={floatAnim}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,122,255,0.10),transparent_60%)] dark:bg-[radial-gradient(900px_circle_at_18%_12%,rgba(0,122,255,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_78%_22%,rgba(175,82,222,0.08),transparent_60%)] dark:bg-[radial-gradient(800px_circle_at_78%_22%,rgba(175,82,222,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_55%_85%,rgba(52,199,89,0.06),transparent_65%)] dark:bg-[radial-gradient(900px_circle_at_55%_85%,rgba(52,199,89,0.06),transparent_65%)]" />
      </motion.div>

      <motion.div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-white/40 blur-3xl dark:bg-white/6"
        style={{ translateY: y2 }}
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.7, 0.55] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_35%,rgba(0,0,0,0.06)_100%)] dark:bg-[radial-gradient(1200px_circle_at_50%_40%,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}