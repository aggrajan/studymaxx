import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "blob-1": {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          },
          "15%": {
            transform: "translate(15px, -10px) scale(1.05) rotate(3deg)"
          },
          "30%": {
            transform: "translate(-20px, 20px) scale(1.1) rotate(-3deg)"
          },
          "45%": {
            transform: "translate(20px, 15px) scale(1.07) rotate(2deg)"
          },
          "60%": {
            transform: "translate(-15px, -25px) scale(0.98) rotate(-2deg)"
          },
          "75%": {
            transform: "translate(10px, 25px) scale(1.03) rotate(1deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          }
        },
        "blob-2": {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          },
          "20%": {
            transform: "translate(-15px, 20px) scale(1.08) rotate(-2deg)"
          },
          "40%": {
            transform: "translate(30px, -25px) scale(1.05) rotate(4deg)"
          },
          "60%": {
            transform: "translate(-25px, 30px) scale(1) rotate(-1deg)"
          },
          "80%": {
            transform: "translate(20px, -20px) scale(0.95) rotate(3deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          }
        },
        "blob-3": {
          "0%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          },
          "10%": {
            transform: "translate(10px, -5px) scale(1.02) rotate(2deg)"
          },
          "25%": {
            transform: "translate(-25px, 15px) scale(1.07) rotate(-1deg)"
          },
          "50%": {
            transform: "translate(30px, -10px) scale(1.04) rotate(3deg)"
          },
          "75%": {
            transform: "translate(-10px, 25px) scale(0.96) rotate(-3deg)"
          },
          "90%": {
            transform: "translate(15px, -20px) scale(1.03) rotate(1deg)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1) rotate(0deg)"
          }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "blob-1": "blob-1 12s infinite ease-in-out",
        "blob-2": "blob-2 15s infinite ease-in-out",
        "blob-3": "blob-3 16s infinite ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
