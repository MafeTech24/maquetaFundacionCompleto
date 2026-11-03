/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS-variable-based tokens (solid uses)
        background:  'var(--background)',
        foreground:  'var(--foreground)',
        card:        'var(--card)',
        border:      'var(--border)',
        muted:       'var(--muted)',
        accent:      'var(--accent)',
        sand:        'var(--sand)',
        mint:        'var(--mint)',
        navy:        'var(--navy)',

        // Primary — with opacity modifier support (Tailwind v3 pattern)
        primary: {
          DEFAULT: ({ opacityValue }) =>
            opacityValue !== undefined
              ? `oklch(0.56 0.075 190 / ${opacityValue})`
              : 'oklch(0.56 0.075 190)',
          fg: 'oklch(0.99 0.005 180)',
          dark: 'oklch(0.68 0.09 185)',
        },
        secondary: {
          DEFAULT: ({ opacityValue }) =>
            opacityValue !== undefined
              ? `oklch(0.93 0.045 165 / ${opacityValue})`
              : 'oklch(0.93 0.045 165)',
          fg: 'oklch(0.32 0.05 200)',
        },

        // Legado — mantener compatibilidad con clases existentes brand-*
        brand: {
          50:  'oklch(0.97 0.018 175)',
          100: 'oklch(0.93 0.045 165)',
          200: 'oklch(0.87 0.07 160)',
          300: 'oklch(0.78 0.085 175)',
          400: 'oklch(0.68 0.09 185)',
          500: 'oklch(0.56 0.075 190)',
          600: 'oklch(0.48 0.072 195)',
          700: 'oklch(0.4 0.065 200)',
          800: 'oklch(0.34 0.055 205)',
          900: 'oklch(0.28 0.045 210)',
          950: 'oklch(0.18 0.03 220)',
        },
        teal: {
          50:  'oklch(0.97 0.02 180)',
          100: 'oklch(0.93 0.04 175)',
          200: 'oklch(0.87 0.06 170)',
          300: 'oklch(0.78 0.08 175)',
          400: 'oklch(0.68 0.09 183)',
          500: 'oklch(0.58 0.085 188)',
          600: 'oklch(0.5 0.08 192)',
          700: 'oklch(0.42 0.07 195)',
          800: 'oklch(0.34 0.055 200)',
          900: 'oklch(0.26 0.04 205)',
          950: 'oklch(0.16 0.025 215)',
        },
      },

      /* 
       * CONFIGURACIÓN ANTERIOR DE FUENTES (Para revertir si es necesario):
       * - Títulos (Serif): 'Fraunces', Georgia, serif
       * - Cuerpo / UI: 'Nunito Sans', sans-serif
       * - Google Fonts URL:
       *   https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700&family=Nunito+Sans:wght@400;500;600;700&display=swap
       * - En global.css: body { font-family: 'Nunito Sans', sans-serif; }, h1-h6 { font-family: 'Fraunces', Georgia, serif; }
       */
      fontFamily: {
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        heading:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        jakarta:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        fraunces: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sora:     ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        inter:    ['Inter', 'system-ui', 'sans-serif'],
        nunito:   ['Inter', 'system-ui', 'sans-serif'],
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      animation: {
        'fade-in':  'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float':    'float 3s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },

      boxShadow: {
        'soft':    '0 18px 40px -24px oklch(0.4 0.06 210 / 0.35)',
        'card':    '0 2px 4px -2px oklch(0.4 0.06 210 / 0.15), 0 12px 28px -18px oklch(0.4 0.06 210 / 0.3)',
        'primary': '0 8px 24px -8px oklch(0.56 0.075 190 / 0.45)',
      },
    },
  },
  plugins: [],
};
