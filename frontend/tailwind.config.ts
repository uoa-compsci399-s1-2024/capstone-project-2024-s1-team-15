import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
                roboto: ["'Roboto' sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            typography: {
                DEFAULT: {
                    css: {
                        fontSize: "1.1rem",
                        lineHeight: "1.65rem",
                    },
                },
            },
            colors: {
                primary: "#059669",
                secondary: "#9CA3AF",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
    darkMode: "selector",
}
export default config
