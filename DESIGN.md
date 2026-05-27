---
name: Electric Indigo
colors:
  surface: '#10131c'
  surface-dim: '#10131c'
  surface-bright: '#363943'
  surface-container-lowest: '#0b0e16'
  surface-container-low: '#191b24'
  surface-container: '#1d1f28'
  surface-container-high: '#272a33'
  surface-container-highest: '#32343e'
  on-surface: '#e1e2ee'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#e1e2ee'
  inverse-on-surface: '#2e303a'
  outline: '#8c90a1'
  outline-variant: '#424656'
  surface-tint: '#b3c5ff'
  primary: '#b3c5ff'
  on-primary: '#002b75'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#0054d6'
  secondary: '#c3c6d7'
  on-secondary: '#2c303d'
  secondary-container: '#454957'
  on-secondary-container: '#b5b8c9'
  tertiary: '#00dbe9'
  on-tertiary: '#00363a'
  tertiary-container: '#007e86'
  on-tertiary-container: '#e3fdff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#dfe2f3'
  secondary-fixed-dim: '#c3c6d7'
  on-secondary-fixed: '#171b28'
  on-secondary-fixed-variant: '#434654'
  tertiary-fixed: '#7df4ff'
  tertiary-fixed-dim: '#00dbe9'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#10131c'
  on-background: '#e1e2ee'
  surface-variant: '#32343e'
  deep-navy: '#05070A'
  electric-blue: '#0066FF'
  cyan-glow: '#00F0FF'
  glass-stroke: rgba(255, 255, 255, 0.12)
  surface-card: rgba(16, 22, 36, 0.8)
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-margin: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for a high-tech, digital-first loyalty experience. It targets tech-savvy consumers who value efficiency and a premium feel. The brand personality is professional yet energetic, utilizing deep spatial depth to create a sense of a sophisticated digital wallet.

The visual style leverages **Glassmorphism** and **High-Contrast Modernism**. Surfaces are treated as semi-translucent layers floating over deep navy voids, punctuated by electric blue accents that signify value and progress. The interface avoids flat, "paper-like" metaphors in favor of luminous, reactive elements that feel like a high-end automotive dashboard or a futuristic financial terminal.

## Colors

The palette is anchored in a multi-layered dark mode. The primary background uses `deep-navy` to provide infinite depth. The `electric-blue` acts as the functional primary color for interactive states and primary buttons. 

Gradients are central to the identity:
- **Background Gradient:** A radial gradient from `#0F172A` at the top right to `#05070A` at the bottom left.
- **Card Gradient:** A linear 45-degree gradient using `surface-card` with a subtle 1px `glass-stroke` border.
- **Active Stamp Gradient:** A vibrant mix of `electric-blue` and `cyan-glow`.

Subtle glow effects (Box Shadows with high blur and low spread) should be applied to active loyalty stamps to simulate an illuminated physical LED.

## Typography

Typography is used to reinforce the high-tech aesthetic. **Sora** is utilized for headlines to provide a modern, geometric character with high legibility. **Inter** handles the heavy lifting of body text, ensuring a clean and neutral tone that doesn't compete with the vibrant UI elements.

For technical data, such as "Stamps remaining" or "Serial Numbers," **JetBrains Mono** is used in all-caps labels. This monospaced touch adds a "developer-tool" precision to the loyalty mechanics. All labels should use a slightly wider letter spacing to maintain clarity against dark backgrounds.

## Layout & Spacing

This design system uses a **Fluid Grid** model centered around an 8px base unit. 

- **Mobile (Default):** 4-column layout with 20px side margins. Cards usually span the full width of the container.
- **Tablet/Desktop:** 12-column layout with a max-width of 1200px. Loyalty cards are arranged in a responsive grid.

Spacing between stamp slots on a card should be strictly uniform (e.g., 12px or 16px) to maintain the "grid" feel of a physical stamp card. Vertical rhythm is maintained through `stack` variables, ensuring that logical groups of information are clearly separated.

## Elevation & Depth

Depth is communicated through **Backdrop Blurs** and **Inner Glows** rather than traditional drop shadows.

- **Level 0 (Background):** Solid `deep-navy`.
- **Level 1 (Cards):** Semi-transparent `surface-card` with a `blur(12px)` backdrop filter. A 1px top-weighted border creates a "light catch" on the top edge.
- **Level 2 (Active Elements/Modals):** Increased transparency and a subtle outer glow using `electric-blue` at 20% opacity.

Active stamps must use an `inner-shadow` combined with an `outer-glow` to appear as if they are recessed, light-emitting diodes.

## Shapes

The shape language is consistently **Rounded** (0.5rem base) to balance the technical "coldness" of the dark theme with a friendly, touch-optimized feel. 

- **Cards:** Use `rounded-xl` (1.5rem) to emphasize their role as the primary container.
- **Stamp Slots:** Perfectly circular (50% radius) to mimic the traditional physical stamp.
- **Input Fields:** `rounded-lg` (1rem) for a modern, approachable look.
- **Buttons:** Fully pill-shaped for high-priority actions like "Redeem."

## Components

### Buttons
Primary buttons use a linear gradient from `electric-blue` to a slightly darker indigo. They feature a subtle "shimmer" animation on hover. Secondary buttons are "Ghost" style with the `glass-stroke` border.

### Loyalty Stamps
- **Inactive:** A circular outline with a dashed border and 10% opacity white fill.
- **Active:** Filled with a `cyan-glow` gradient, featuring a center icon (e.g., a checkmark or brand logo) and a soft 15px blur outer glow.

### Cards
Loyalty "Digital Wallet" cards should use a 2:3 aspect ratio. They must feature a backdrop-blur effect so that the background gradient of the app subtly peeks through.

### Chips & Badges
Small, high-contrast badges used for "New Offer" or "Expiring Soon." Use `tertiary_color` (Cyan) with black text for maximum urgency and legibility.

### Progress Bars
Thin, 4px height bars with a `cyan-glow` filled state. The background of the bar should be the base `deep-navy` to show a "hollow" track.