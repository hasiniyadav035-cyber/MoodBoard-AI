# MoodBoard AI – Emotion-Based Content Organizer

MoodBoard AI is a digital mood board that prioritizes emotional resonance over standard productivity hierarchies. It allows users to save images, notes, and links, automatically organizing and styling the interface based on the user's current emotional "vibe."

## 🌟 The Vision
Traditional note-taking and bookmarking apps focus on utility. MoodBoard AI focuses on **state of mind**. By categorizing content by emotion, users can curate environments that support their mental well-being—whether they need to find calm, get motivated, stay focused, or embrace a rainy day.

## ✨ Core Features

- **Emotion-Aware UI**: Switch between moods (🎧 Calm, 🔥 Motivated, 🌧 Sad, ⚡ Focus) to see the entire application's theme, spacing, and colors transform instantly.
- **Content Versatility**: Save various types of inspiration:
  - 📝 **Notes**: Quick thoughts or deep reflections.
  - 🖼 **Images**: Visual inspiration with full-card previews.
  - 🔗 **Links**: Direct access to external resources that spark joy or productivity.
- **Smart AI Insights**: Leveraging the **Google Gemini API**, the app analyzes the distribution and types of content across your boards to provide creative suggestions and "vibe checks."
- **Fluid Animations**: Built with **Framer Motion**, every transition and card entry feels organic and responsive.

## 🛠 Tech Stack

- **Frontend**: React (ES6 Modules)
- **Styling**: Tailwind CSS (Utility-first CSS)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Engine**: Google Gemini 3 (Flash Preview)
- **Language**: TypeScript (with Emotion Enums & Custom Interfaces)

## 🎨 Emotion Themes

| Emotion | Visual Vibe | Logic |
| :--- | :--- | :--- |
| **Calm** | Soft blues & wide spacing | Minimalist, airy, and low-pressure. |
| **Motivated** | Vibrant oranges & standard grid | Energetic, punchy, and ready for action. |
| **Sad** | Muted slates & cozy density | Reflective, quiet, and safe. |
| **Focus** | Clean greens & tight alignment | Structured, high-density, and disciplined. |

## 🚀 Getting Started

1. Ensure your Gemini API Key is available in the environment as `process.env.API_KEY`.
2. The application uses ESM imports directly via `esm.sh` for easy deployment without complex build steps.
3. Open `index.html` to launch the application.

---

*“Most tools are productivity-based. This is emotion-aware UX.”*