## Add Newsvala Welcome Screen

Add an onboarding/welcome screen as the first-time entry point.

### Routing
- New `src/routes/welcome.tsx` → `/welcome` with route-specific head meta.
- Update `src/routes/index.tsx`: on mount, if `localStorage["newsvala:welcomed"]` is missing, `navigate({ to: "/welcome", replace: true })`; otherwise render `<NewsFeed />`. Render a blank surface during the check to avoid flash. SSR-safe (effect-only).
- "Let's read" button sets the flag and navigates to `/`.

### Welcome screen layout (matches reference)
Reuse the phone-shaped frame (`max-w-[480px]` centered on dark gutter).
- Top block, centered:
  - 112×112 rounded red tile (`bg-primary rounded-[28px]`) containing an inline SVG of 3 stacked white bars with a small dot at the right end of the bottom bar.
  - Wordmark `NEWSVALA` in Chivo black uppercase.
  - Tagline "Your daily news, condensed and curated." in `text-text-muted`.
  - Three pill chips: FAST · RELIABLE · BITE-SIZED (`bg-surface-container-high`, Inter bold, tracking-wider).
- Flex spacer.
- Bottom block:
  - Full-width primary CTA `Let's read →` (h-14, `bg-primary text-on-primary`, rounded-2xl, subtle red shadow, Material `arrow_forward` icon).
  - 3 page-indicator dots (first wider/red, others muted) — decorative.

### Files
- New: `src/components/welcome/WelcomeScreen.tsx`
- New: `src/routes/welcome.tsx`
- Edit: `src/routes/index.tsx` — add the localStorage gate.

No new dependencies; uses existing design tokens (`primary`, `on-primary`, `surface`, `on-surface`, `text-muted`, `surface-container-high/highest`) and Material Symbols already loaded.
