'use client'

import { useEffect, useState } from 'react'
import { MapPin, Github, Linkedin } from 'lucide-react'

export default function ActivityCard() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30)
    return () => clearInterval(id)
  }, [])

  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="pointer-events-auto fixed bottom-6 right-4 sm:right-8 z-40">
      <div className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-xs sm:text-sm text-neutral-100 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-emerald-300/80">Now</div>
            <div className="font-medium text-sm">Sharan is Working</div>
          </div>
          <div className="text-right text-[11px] text-neutral-300">
            <div className="flex items-center gap-1 justify-end">
              <MapPin className="h-3 w-3" /> Bay Area, CA
            </div>
            <div className="mt-0.5 font-mono">{timeString}</div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Working on: Reading Papers</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <a
            href="https://github.com/SilverXer0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-neutral-200 hover:text-white"
          >
            <Github className="h-3 w-3" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sharankrishna14/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-neutral-200 hover:text-white"
          >
            <Linkedin className="h-3 w-3" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}