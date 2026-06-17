# 🚀 Mushfiq's Portfolio — Next.js 15

A modern, highly animated personal portfolio website built with **Next.js 15 App Router**, featuring premium animations with **Framer Motion** and **GSAP**, buttery smooth scrolling via **Lenis**, live GitHub activity, and a dark glassmorphism design system.

[![Live Demo](https://img.shields.io/badge/Live-Demo-7C3AED?style=for-the-badge&logo=vercel)](https://mushfiq-portfolio.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-06B6D4?style=for-the-badge&logo=github)](https://github.com/Mushfiq599/mushfiq-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)

---

## ✨ Features

- **Premium Animations** — GSAP scroll-triggered animations, 3D card tilt, parallax image scroll, word-by-word heading stagger, elastic spring effects
- **Framer Motion** — Page transitions, hover effects, stagger containers, AnimatePresence modals
- **Lenis Smooth Scroll** — Buttery smooth scrolling synced with GSAP ScrollTrigger
- **Custom Cursor** — Trailing ring with magnetic expand on interactive elements
- **Loading Screen** — Animated progress bar with ghost background headline
- **GitHub Activity** — Live profile card, contribution heatmap (52 weeks), streak stats, recent repos
- **Project Modal** — Rich detail view with tech stack, challenges, and future roadmap
- **Glassmorphism Navbar** — Sticky with active section highlighting and mobile hamburger
- **Fully Responsive** — Mobile-first, works on all screen sizes
- **Dark Theme** — Deep-space palette with purple/cyan accent system

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion + GSAP + Lenis |
| Auth (projects) | Firebase Auth |
| Icons | React Icons |
| Fonts | Inter + Space Grotesk (Google Fonts) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
mushfiq-portfolio/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, Lenis
│   ├── page.tsx                # Home page — assembles all sections
│   ├── globals.css             # Design tokens + base styles
│   └── api/
│       └── github/
│           ├── user/route.ts
│           ├── repos/route.ts
│           └── contributions/route.ts
│
├── components/
│   ├── Navbar.tsx              # Sticky glassmorphism navbar
│   ├── Hero.tsx                # Hero with GSAP orbs + resume download
│   ├── About.tsx               # About with quick facts grid
│   ├── Skills.tsx              # Animated skill bars + ticker
│   ├── Education.tsx           # Timeline layout
│   ├── Experience.tsx          # Experience cards
│   ├── Projects.tsx            # GSAP-animated project cards
│   ├── GitHub.tsx              # Live GitHub activity + heatmap
│   ├── Contact.tsx             # Contact form + direct details
│   ├── Footer.tsx              # Footer with social links
│   └── ui/
│       ├── LoadingScreen.tsx   # Animated loading screen
│       ├── ProjectModal.tsx    # Project detail modal
│       ├── SmoothScroll.tsx    # Lenis wrapper
│       └── CustomCursor.tsx    # Magnetic custom cursor
│
├── lib/
│   └── animations.ts           # Reusable Framer Motion variants
│
├── types/
│   └── index.ts                # Shared TypeScript types
│
└── public/
    ├── resume.pdf              # Your resume
    └── images/
        └── hero-photo.jpeg     # Your profile photo
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Mushfiq599/mushfiq-portfolio.git
cd mushfiq-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional — increases GitHub API rate limit from 60 to 5000 requests/hour
GITHUB_TOKEN=your_github_personal_access_token_here
```

### How to get a GitHub token

1. Go to **github.com → Settings → Developer settings**
2. Click **Personal access tokens → Fine-grained tokens**
3. Click **Generate new token**
4. Set expiration and select **Public Repositories (read-only)**
5. Copy the token into `.env.local`

> Without the token the GitHub section still works — it just uses the 60 requests/hour public limit.

---

## 🎨 Design System

### Color Palette

```css
--bg-primary:          #0A0A0F   /* Near-black background */
--bg-secondary:        #111118   /* Section alternating bg */
--bg-card:             #16161f   /* Card backgrounds */
--accent-purple:       #7C3AED   /* Primary accent */
--accent-purple-light: #9F6EFF   /* Hover/highlight purple */
--accent-cyan:         #06B6D4   /* Secondary accent */
--accent-magenta:      #EC4899   /* Tertiary accent */
--text-primary:        #F8FAFC   /* Main text */
--text-muted:          #94A3B8   /* Secondary text */
```

### Fonts

- **Inter** — Body text, UI elements
- **Space Grotesk** — Headings, logo, numbers

---

## 📦 Key Dependencies

```json
{
  "framer-motion": "^11.x",
  "gsap": "^3.x",
  "@gsap/react": "^2.x",
  "lenis": "^1.x",
  "react-icons": "^5.x"
}
```

---

## 🔧 Customization

### Updating your information

| File | What to update |
|---|---|
| `components/Hero.tsx` | Name, title, social links, stats, photo |
| `components/About.tsx` | Bio paragraphs, quick facts, current project |
| `components/Education.tsx` | Degrees, institutions, GPA, years |
| `components/Experience.tsx` | Job titles, companies, bullet points |
| `components/Projects.tsx` | Project data, GitHub/live links, images |
| `components/Contact.tsx` | Email, phone, WhatsApp, social links |
| `components/GitHub.tsx` | Line 3 — `GITHUB_USERNAME` constant |
| `app/layout.tsx` | Site title, meta description, keywords |
| `public/resume.pdf` | Your resume PDF |
| `public/images/hero-photo.jpeg` | Your profile photo |

### Changing the color palette

All colors are CSS custom properties in `app/globals.css`. Update the `:root` block to switch themes globally — every component inherits from these variables.

---

## 🚢 Deployment

See the deployment section below for step-by-step Vercel instructions.

---

## 📄 License

MIT License — feel free to use this as a template for your own portfolio.

---

## 🙏 Acknowledgements

- [GSAP](https://gsap.com) — Animation library
- [Framer Motion](https://www.framer.com/motion/) — React animation library
- [Lenis](https://lenis.darkroom.engineering/) — Smooth scroll
- [React Icons](https://react-icons.github.io/react-icons/) — Icon library
- [Vercel](https://vercel.com) — Deployment platform