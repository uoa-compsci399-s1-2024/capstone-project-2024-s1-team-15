import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite-react/lib/**/*.js"
    ],
    theme: {
        screens: {
            // Below 540: Display content in mobile style
            // Expand content div
            'sm': "540px", // Above 540: Display content in tablet style
            // Expand content div
            'md': "832px", // Above 832: Display content in desktop style
            // Expand content div
            'lg': "1120px", // Above 1120 (content-min + nav): Display flower nav
            // Expand content div
            'xl': "1368px", // Above 1368 (content-max + nav)
            // Expand left margin
            '2xl': "1656px" // Above 1656 (content-max + nav + nav)
            // Expand both margins
        },
        extend: {
            spacing: {
                "content-max": "1080px",
                "content-min-desktop": "832px",
                "content-min-tablet": "540px",
                "nav": "288px",

                "header-desktop": "96px",
                "header-tablet": "72px",
                "header-mobile": "56px",
                "footer": "48px"
            },
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
                third: "#FFE9B6",

                admin: "#f35d5d",
                maintainer: "#37a0ec",
                premium: "#ffcc6d",
                user: "#c9c9c9",

                backgroundcolor: "#fafafa",
                purpleone: "#F5EDFF",
                purpletwo: "#E6CFFF",
            },
            borderWidth: {
                DEFAULT: "1px",
                "0": "0",
                "20": "20px",
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
