import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      // fontFamily: {
      //   mochiyPopOne: ["Mochiy Pop One", "sans-serif"],
      //   montserratAlt: ["Montserrat Alternates", "Inter"],
      //   poppins: ["Poppins", "roboto"],
      //   satisfy: ["Satisfy", "sans-serif"],
      // },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },

  plugins: [], //require("tailwindcss-animate")
} satisfies Config;
