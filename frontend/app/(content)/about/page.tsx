import React from "react"
import AboutPage from "@/app/components/AboutPage"

export default function About() {
    return (
        <>
            <h1 className="page-title mb-8">About Us</h1>

            <p>
            Aotearoa Airborne Pollen Collaborative (AAPC) is a research collaboration between researchers at
            the University of Auckland Medical School, Victoria University of Wellington, and Massey University.
            </p>

            <h2 className={"text-center"}>Meet the Researchers!</h2>
            <AboutPage />
        </>
    )
}
