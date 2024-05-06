import React from "react"
import ContactForm from "@/app/components/ContactForm"
import AboutPage from "@/app/components/AboutPage"

export default function About() {
    return (
        <div>
            <h1 className="text-3xl text-white font-bold bg-purple-300 p-4 inline-block
            rounded-full w-auto md:text-left">About Us</h1>
            <p className="mt-3">
                Who we are and what we do.
            </p>
            <AboutPage />
        </div>
    )
}
