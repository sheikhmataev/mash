# SM
Our main website.

You are an expert Senior Frontend Developer and UI/UX Designer specializing in high-end, award-winning "Awwwards" style websites.

I need you to build a complete, production-ready landing page for a Norwegian tech consultancy called **MASH PARTNERS AS**.

**Company Context:**
* **Name:** Mash Partners AS
* **Domain:** mashpartners.no
* **Core Business:** Digitalization, Artificial Intelligence (AI), Generative AI, and Automation services.
* **Vibe:** Exclusive, futuristic, luxurious, authoritative.
* **Founders/Team:** Bilal Rasulovich Mataev, Abdulsamad Sheikh, Abdul-Malik Rustamovisj Dagijev.
* **Location:** Lillehammer, Norway.

**Tech Stack Requirements:**
* **Framework:** Next.js 14 (App Router).
* **Styling:** Tailwind CSS.
* **Animations:** Framer Motion (CRITICAL: Heavy use of scroll reveals, text staggers, and smooth transitions).
* **Icons:** Lucide React.
* **Language:** TypeScript.

**Design System & Aesthetic:**
* **Mode:** DARK MODE ONLY. The site should not have a light mode.
* **Color Palette:**
    * Background: Deep matte black (`#050505` to `#0a0a0a`).
    * Accents: Metallic Gold / Champagne Gold gradients (for text and borders) to signify luxury.
    * Secondary Accents: Subtle deep purple or abstract AI-glows to signify technology.
* **Typography:** Modern Sans-Serif (e.g., Inter or Geist Sans). Clean, readable, spacious.
* **Visual Style:** "Glassmorphism" (frosted dark glass cards), thin elegant borders (1px border-white/10), glowing effects behind elements.

**Page Structure & Content:**

1.  **Navbar:**
    * Floating glass navbar.
    * Logo: "MASH PARTNERS" (Minimalist typography).
    * Links: Tjenester, Om oss, Team, Kontakt.
    * CTA Button: "Start Prosjektet" (Gold outline/gradient).

2.  **Hero Section:**
    * Full screen height (`h-screen`).
    * **Headline:** "Fremtidens Teknologi. I Dag." (or similar strong AI-focused hook).
    * **Sub-headline:** "Vi leverer skreddersydde løsninger innen digitalisering, generativ AI og automatisering for moderne bedrifter."
    * **Background:** An animated abstract background (e.g., subtle moving particles, a digital mesh, or a slow-moving gradient fog) to represent AI.
    * **Animation:** Text should stagger in slowly.

3.  **Services Section (Tjenester):**
    * Grid layout using cards.
    * Cards should have a hover effect (glow or lift).
    * **Service 1:** Generativ AI & LLM Utvikling.
    * **Service 2:** Prosessautomatisering & Digitalisering.
    * **Service 3:** Skreddersydd Programvareutvikling.

4.  **About/Stats Section:**
    * Use the "glass" effect.
    * Mention they are based in Lillehammer.
    * Focus on quality and modern tech.

5.  **The Team (Styret/Nøkkelpersoner):**
    * Elegant cards for the founders:
        * Bilal Rasulovich Mataev
        * Abdulsamad Sheikh
        * Abdul-Malik Rustamovisj Dagijev
    * Design: Minimalist, professional.

6.  **Footer:**
    * Company info based on registry data:
    * Mash Partners AS | Org.nr: 936 620 566.
    * Address: Storgata 144, 2615 Lillehammer.
    * Email: abdulsamad@sheikh.as | Tlf: +47 469 61 676.
    * Copyright 2025/2026.

**Implementation Plan:**
1.  Initialize the Next.js project layout and global CSS (set black background).
2.  Create a `components` folder with reusable UI elements (Button, Card, Section).
3.  Implement the animated Hero section using Framer Motion.
4.  Build the Services and Team sections with responsive grids.
5.  Ensure the site is fully responsive (hamburger menu for mobile, proper padding).
