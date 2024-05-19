import React from "react"
import AboutPage from "@/app/components/AboutPage"

export default function About() {
    return (
        <>
            <h1 className="page-title mb-8">About Us</h1>
            
            <div className="px-12">
            <p className="text-center">
            Aotearoa Airborne Pollen Collaborative (AAPC) is a research collaboration between researchers at
            the University of Auckland Medical School, Victoria University of Wellington, and Massey University.
            AAPC has its beginnings in 2022, when overlapping Research interests brought Associate Professor
            Amy Chan, Associate Professor Stuti Misra, Professor Rewi Newnham and Dr Kat Holt together in a
            Zoom room.
            </p>
            </div>

            <h2 className={"text-center"}>Meet the Researchers!</h2>
            <AboutPage />
        </>
    )
}
