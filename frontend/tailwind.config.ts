import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite-react/lib/**/*.js"
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
                primary: "#FFD166",
                "primary-light": "#fff0ce",
                secondary: "#9CA3AF",
                admin: "#f35d5d",
                maintainer: "#37a0ec",
                premium: "#ffcc6d",
                user: "#c9c9c9"
            },
            transitionTimingFunction: {
                // https://forum.figma.com/t/recreating-gentle-easing-using-bezier-curves/55312/3
                "figma-gentle": "cubic-bezier(.47,0,.23,1.38)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography")
    ],
    darkMode: "selector",
}
export default config
