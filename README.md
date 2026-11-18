# 🎮 Curiosity Arcade — Personal Portfolio

> **"An ongoing work in curiosity."**  
> Personal portfolio website of **Jasmitha Kancharlapalli**, exploring the intersection of data analytics, business strategy, AI/ML research, and product thinking.

---

## 🌟 Overview & Identity

**Curiosity Arcade** is a creative maximalist, retro editorial personal portfolio. It marries crisp pixel-art illustrations and arcade-inspired interactions with rigorous, methodologically honest case studies for recruiters, collaborators, and researchers.

### Key Highlights:
- **Custom Pixel-Art Character**: Authentic sprite animation representing Jasmitha (dark hazel-brown eyes, long hair, pink shirt, wide-leg jeans, sneakers, and purple star backpack) with interactive idle, walking, jumping, celebration, and laptop-working states.
- **Main Quests**: In-depth, honest case studies of 4 featured technical projects with verified GitHub repositories.
- **Side Quests**: Leadership and competition logs covering Ramanujan Society of Research (RaSoR, IIT Madras), Paradox 2026, Curry in a Hurry (international case competition), and Hack4Nature.
- **Interactive Toolbox**: Editorial 6-crate skill constellation featuring real project backings (`✦`), face reactions, and complete skill visibility without arbitrary percentage bars.
- **Dual-Degree Education**: Two degrees pursued concurrently (NGIT B.Tech CSE AI&ML + IIT Madras BS Data Science) grounded in a personal note on lifelong curiosity.
- **Direct Transmission Terminal**: Zero non-functional contact form friction—direct links to email, resume on Google Drive, LinkedIn, and GitHub.
- **Retro Audio Feedback**: Opt-in 8-bit web audio blips and fanfares (`Web Audio API` oscillator synthesis).

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Sprite Animation**: Native CSS `steps()` strip playback with crisp `image-rendering: pixelated`

---

## 📂 Project Structure

```
Curiosity-Arcade/
├── public/
│   └── assets/
│       ├── images/
│       │   └── image.png                # Master pixel sprite sheet
│       └── sprites/
│           ├── faces/                   # 11 individual pixel face expressions
│           ├── frames/                  # Individual cropped frames per animation
│           ├── props/                   # Pixel props (laptop, backpack, cat, books, etc.)
│           ├── strips/                  # Multi-frame horizontal strips (idle, walk, run, work, jump, celebrate)
│           └── manifest.json            # Frame counts, canvas dimensions, and speeds
├── src/
│   ├── components/
│   │   ├── About.tsx                    # Bio, core philosophy, and direct contact buttons
│   │   ├── CharacterSheet.tsx           # Character wrapper & hero interaction button
│   │   ├── Education.tsx                # Dual-degree presentation & personal dharma reflection
│   │   ├── Footer.tsx                   # Arcade footer with scroll-to-top & social links
│   │   ├── Hero.tsx                     # Press-start banner, headline, & pixel character stage
│   │   ├── Nav.tsx                      # Header, scroll progress bar, active indicator & mobile drawer
│   │   ├── Notes.tsx                    # Field Notes (drafts) & Currently Curious boards
│   │   ├── PixelCharacter.tsx           # Core pixel sprite strip player & expression renderer
│   │   ├── Quests.tsx                   # Main Quests (case studies + modals) & Side Quests
│   │   ├── Toolbox.tsx                  # 6-crate interactive skills constellation
│   │   └── ui.tsx                       # Shared headings, stickers, reveals, and pixel objects
│   ├── content/
│   │   └── site.ts                      # Central typed data file for all projects, skills & bio
│   ├── lib/
│   │   ├── color.ts                     # WCAG luminance-based readable text contrast calculator
│   │   ├── exploration.tsx              # Quest/exploration tracker utilities
│   │   └── sound.tsx                    # Web Audio API synthesiser for retro sound effects
│   ├── pixel/
│   │   ├── PixelScenes.tsx              # Landscape ground strip, clouds, flag, and scenery
│   │   ├── PixelSprite.tsx              # Raw SVG grid renderer
│   │   ├── spriteManifest.ts            # Animation metadata & frame coordinates
│   │   └── sprites.ts                   # Scenery sprite definitions
│   ├── App.tsx                          # App root combining all sections
│   ├── index.css                        # Global typography, pixel rules & sprite keyframes
│   └── main.tsx                         # React 18 DOM mount
├── tools/
│   └── sprites/                         # Python scripts to slice master sheet into transparent strips
├── vercel.json                          # Vercel SPA routing & cache headers
└── package.json                         # Scripts & dependencies
```

---

## 🚀 Local Development Quickstart

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup & Installation
```bash
# 1. Clone the repository
git clone https://github.com/jas127/Curiosity-Arcade.git
cd Curiosity-Arcade

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
The application will be live at `http://localhost:5173/`.

### Quality & Build Commands
```bash
# Run TypeScript typechecker
npm run typecheck

# Run ESLint validation
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📝 Updating Portfolio Content

All copy, project data, education, and skills are decoupled into a single type-safe configuration file:  
`src/content/site.ts`

- **Adding / Updating Projects**: Edit `siteContent.projects`. Each project supports `title`, `description`, `objective`, `whyItMatters`, `contribution`, `data`, `tools`, `approach`, `implementation`, `results`, `limitations`, `learned`, and `github`.
- **Updating Skills**: Edit `siteContent.skills`. Skills support linking to real projects via the `story: { where, note }` property.
- **Updating Contact Links**: Modify `siteContent.owner` (`email`, `linkedin`, `github`, `resume`).

---

## 🎨 Sprite Generation Pipeline

If the master character sprite sheet (`public/assets/images/image.png`) is ever modified, transparent sprite strips and assets can be re-sliced automatically using the included Python scripts:

```bash
# In an environment with Pillow, numpy, and scipy installed:
python tools/sprites/extract.py public/assets/images/image.png /tmp/extracted_sprites
python tools/sprites/build_sprites.py /tmp/extracted_sprites/_cleaned_sheet.png /tmp/extracted_sprites/_report.json public/assets/sprites
```

---

## ☁️ Free Deployment on Vercel

The project is pre-configured for zero-friction free deployment on Vercel:

1. **Push to GitHub**: Ensure the repository is pushed to your GitHub account (`jas127`).
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in with GitHub.
   - Click **Add New Project** and select your repository.
3. **Project Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Environment Variables**: None required! (Supabase dependency removed; all assets are self-contained).
4. **Deploy**:
   - Click **Deploy**. Vercel will build and publish the site in ~30 seconds with a free `.vercel.app` domain and global CDN caching.

---

## 📄 License

MIT License. Designed and developed with care by Jasmitha Kancharlapalli.
