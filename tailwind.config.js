/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      animation: {
        'floating-point': 'floating-point 2s ease-in-out infinite',
        'dasharray': 'dasharray 1s linear forwards',
        'filled': 'filled 0.1s linear forwards 0.95s',
        "in": "in 0.2s ease-out",
        "out": "out 0.2s ease-in",
        "fade-in": "fade-in 0.2s ease-in",
        "fade-out": "fade-out 0.2s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-in",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "scale-up": "scaleUp 0.5s ease-out forwards",
        "slide-in-down": "slideInDown 0.5s ease-out forwards",
        "slide-down-fade": "slideDownAndFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-fade": "slideUpAndFade 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        "checkbox-pop": "checkbox-pop 0.3s ease-in-out",
        "checkmark": "checkmark 0.2s ease-in-out forwards",
        "radio-dot": "radio-dot 0.2s ease-in-out forwards",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 2s ease-in-out infinite",
        'star-movement-top': 'star-movement-top 6s linear infinite alternate',
        'star-movement-bottom': 'star-movement-bottom 6s linear infinite alternate',
        "scroll": "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        scroll: 'scroll var(--scroll-duration) linear infinite',
        'scroll-reverse': 'scroll-reverse var(--scroll-duration) linear infinite'
      },
      keyframes: {
        "in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "zoom-in": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "zoom-out": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.95)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        scaleUp: {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" }
        },
        slideInDown: {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" }
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-4px) scale(0.95)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        slideUpAndFade: {
          from: { opacity: "1", transform: "translateY(0) scale(1)" },
          to: { opacity: "0", transform: "translateY(-4px) scale(0.95)" }
        },
        "checkbox-pop": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" }
        },
        checkmark: {
          "0%": { opacity: "0", transform: "rotate(45deg) scale(0.8)" },
          "100%": { opacity: "1", transform: "rotate(45deg) scale(1)" }
        },
        "radio-dot": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        },
        "floating-point": {
          "0%": { transform: "translateY(0)" },
          "85%": { opacity: "0" },
          "100%": { transform: "translateY(-55px)", opacity: "0" }
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(var(--theme-color-rgb), 0.4), 0 0 20px rgba(var(--theme-color-rgb), 0.3), 0 0 30px rgba(var(--theme-color-rgb), 0.2)"
          },
          "50%": {
            boxShadow: "0 0 15px rgba(var(--theme-color-rgb), 0.6), 0 0 30px rgba(var(--theme-color-rgb), 0.4), 0 0 45px rgba(var(--theme-color-rgb), 0.3)"
          }
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
          "100%": { transform: "translateY(0px)" }
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        "scroll": {
          to: {
            transform: "translateY(calc(-50% - 0.5rem))",
          },
        },
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(var(--scroll-height))' }
        },
        'scroll-reverse': {
          '0%': { transform: 'translateY(var(--scroll-height))' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(255, 215, 0, 0.4)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.animation-play-state-paused': {
          'animation-play-state': 'paused',
        },
        '.animation-play-state-running': {
          'animation-play-state': 'running',
        },
      });
    },
  ],
} 