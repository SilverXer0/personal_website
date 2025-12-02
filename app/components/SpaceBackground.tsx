'use client'

import { useEffect, useState } from 'react'

type Star = { id: number; top: number; left: number; size: number; opacity: number; speed: number }

export default function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Generate stars once
    const newStars: Star[] = []
    for (let i = 0; i < 140; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 120, // vh
        left: Math.random() * 100, // vw
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
      })
    }
    setStars(newStars)

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-neutral-900">
      {/* soft radial glow behind content */}
      <div className="absolute inset-0 opacity-40">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/40 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-80 w-80 -translate-y-1/2 -translate-x-1/3 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      {/* stars */}
      <div className="absolute inset-0">
        {stars.map((star) => {
          const translateY = -(scrollY * star.speed) * 0.03
          return (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${star.top}vh`,
                left: `${star.left}vw`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                transform: `translateY(${translateY}px)`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}