# Sharan's Portfolio Website

Personal portfolio site for Sharan Krishna — Software Engineer at Plaid, CS graduate from Cal Poly SLO.
Live at **[skrsh.dev](https://skrsh.dev)**.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Features

- **Welcome screen** — click-to-enter gate with background music; scrolling is locked until entry
- **Background music** — auto-plays on entry with an in-app mute toggle in the navbar
- **Pixel-reveal animation** — mosaic tile animation that clears to reveal the hero section
- **YouTube embed integration** — music pauses when a YouTube video plays, resumes on pause/end
- **Touch-first card hover states** — on mobile/touchscreen devices, cards auto-activate as they scroll into view using `IntersectionObserver`, with exclusive single-card activation per section
- **Animated GIF OG embed** — the link preview image is an animated GIF (works on Discord; first frame shown elsewhere)
- **Dark mode** — forced dark theme with glassmorphism card styling
- **Sections** — About, Experience (scrollable carousel), Projects, Papers, Hobbies, Awards, Contact

---

## Project Structure

```
app/
  layout.tsx      # Root layout, metadata, OG tags
  page.tsx        # All page sections and components (single-page)
  globals.css     # Global styles
public/
  music/          # Background audio file
  photos/         # Project, hobby, and background images
  papers/         # PDF papers
  resume/         # Résumé PDF
  og.gif          # Animated Open Graph embed image
```

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Deployment

Deployed automatically to Vercel on push to `main`. The custom domain `skrsh.dev` is configured in the Vercel dashboard.