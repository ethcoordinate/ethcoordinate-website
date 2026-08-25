# Concept 03: Retro Terminal

> "root@ethereum:~$ ./coordinate-protocol"

## Visual Philosophy

Channel the **early days of computing and hacker culture**. Protocol Support as the command-line operators keeping Ethereum running. This aesthetic celebrates the technical roots of blockchain while feeling distinctly human and crafted. Think: the people behind the protocol, working late nights, building the future.

## Color Palette

### Variant A: Phosphor Green (Classic Terminal)
```css
--color-bg-deep: #0A0A0A;        /* CRT black */
--color-bg-base: #0D0D0D;        /* Terminal background */
--color-bg-surface: #141414;     /* Elevated surfaces */
--color-bg-elevated: #1A1A1A;    /* Cards */

--color-primary: #33FF33;        /* Phosphor green */
--color-primary-light: #66FF66;  /* Bright green */
--color-primary-muted: #1A661A;  /* Dim green */

--color-accent: #FFFF33;         /* Warning yellow */
--color-accent-secondary: #FF6633; /* Error orange */

--color-text-primary: #33FF33;   /* Green text */
--color-text-secondary: #29CC29; /* Dimmer green */
--color-text-muted: #1F991F;     /* Very dim */

--color-scanline: rgba(0, 0, 0, 0.1); /* CRT scanlines */
```

### Variant B: Amber (Warm Terminal)
```css
--color-primary: #FFB000;        /* Amber */
--color-primary-light: #FFC233;  /* Bright amber */
--color-primary-muted: #664700;  /* Dim amber */
--color-text-primary: #FFB000;
```

## Typography

**Display Font:** VT323 or Share Tech Mono
- Authentic terminal feel
- Pixelated/bitmap aesthetic

**Body Font:** IBM Plex Mono or Fira Mono
- Monospace throughout
- Readable at smaller sizes

**All text is monospace** - this is a key brand differentiator

```css
--font-display: 'VT323', monospace;
--font-body: 'IBM Plex Mono', monospace;
--font-mono: 'IBM Plex Mono', monospace;

/* Alternative for more readability */
--font-display: 'Share Tech Mono', monospace;
```

## Key Visual Elements

### 1. CRT Effects
- Subtle scanlines overlay
- Screen curvature vignette
- Phosphor glow on text
- Occasional "flicker" animations

### 2. Command Line Interface
- Navigation as terminal commands
- Cursor blink animations
- Command prompt prefixes
- ASCII art decorations

### 3. ASCII Art
- Octopus rendered in ASCII
- Box-drawing characters for borders
- Text-based diagrams
- Progress bars with characters

### 4. Boot Sequence
- Page loads simulate system boot
- Status messages appear sequentially
- "Connecting to Ethereum mainnet..."

## Sample Components

### Scanline Overlay
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    var(--color-scanline) 2px,
    var(--color-scanline) 4px
  );
  pointer-events: none;
  z-index: 9999;
}
```

### Terminal Card
```css
.card-terminal {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-primary-muted);
  font-family: var(--font-mono);
  position: relative;
}

.card-terminal::before {
  content: '┌─────────────────────────────────┐';
  position: absolute;
  top: -1.2em;
  left: 0;
  color: var(--color-primary-muted);
  font-size: 0.8em;
}

.card-terminal-header {
  border-bottom: 1px dashed var(--color-primary-muted);
  padding: 0.5rem 1rem;
  color: var(--color-text-muted);
}

.card-terminal-header::before {
  content: '> ';
  color: var(--color-primary);
}
```

### Typing Animation
```css
.typing-text {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid var(--color-primary);
  animation:
    typing 2s steps(40) forwards,
    blink 0.7s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink {
  50% { border-color: transparent; }
}
```

### ASCII Octopus
```
       ___
    .-'   `-.
   /  \   /  \
  |    \ /    |
   \   |||   /
    `-.___.-'
   /||  |  ||\
  / ||  |  || \
    ||  |  ||
    ^^  ^  ^^

  PROTOCOL SUPPORT
  ================
```

## Animation Concepts

- **Boot Sequence**: Site loads with terminal boot messages
- **Typing Effect**: Headlines type out character by character
- **Cursor Blink**: Persistent blinking cursor
- **Glitch Effect**: Occasional subtle screen glitch
- **Matrix Rain**: Optional decorative falling characters

## Mood Board References

- 1980s computer terminals
- Fallout Pip-Boy interface
- Mr. Robot TV show
- Early BBS systems
- Hackers (1995) movie aesthetic

## Strengths

- Extremely anti-AI: deliberately retro
- Strong crypto/hacker culture resonance
- Unique and memorable
- Low resource usage (no heavy images)
- Great for technical audience

## Considerations

- May feel exclusionary to non-technical users
- Limited color palette restricts design options
- Typography readability at small sizes
- Accessibility: green-on-black can be hard for some users
- Consider amber variant for warmth
