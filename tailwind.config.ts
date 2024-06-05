import { nextui } from "@nextui-org/theme/plugin"
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            maxHeight: "70%",
          }
        }
      }
      ,
      backgroundImage: {
        fondo: "url('/dashboard/fondo1.png')",
      },
      colors: {
        'almond': {
          '50': '#fcf6f0',
          '100': '#f4e2d0',
          '200': '#eed2ba',
          '300': '#e3b38e',
          '400': '#d78d60',
          '500': '#ce7141',
          '600': '#c05b36',
          '700': '#9f472f',
          '800': '#803b2c',
          '900': '#683226',
          '950': '#381712',
        },
        'library': {
          '50': '#fbf6f5',
          '100': '#f7ebe9',
          '200': '#f0dbd8',
          '300': '#e4beb9',
          '400': '#d49c95',
          '500': '#c27a71',
          '600': '#ac6056',
          '700': '#904e45',
          '800': '#78433c',
          '900': '#653c37',
          '950': '#351d1a',
        },
        'custom-gray': '#494A4A',
        "dark": '#232A3C',
        "medium": '#293245',
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        }
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui(),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config