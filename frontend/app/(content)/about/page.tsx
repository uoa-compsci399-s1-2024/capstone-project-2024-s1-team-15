import React from "react"
import ContactForm from "@/app/components/ContactForm"
import AboutPage from "@/app/components/AboutPage"

export default function About() {
    return (
        <div>
            <h1
                className="page-title">
                About Us
            </h1>
            <p>
                AAPC stands for the Aotearoa Airborne Pollen Collective. It includes a group of researchers working
                together to understand more about pollen and its impacts on health in New Zealand.<br/>It was founded in
                2024 and includes researchers who have spent years working in this area of science and health.
                Researchers are from different parts of New Zealand.
            </p>

            <h2>Meet the Researchers!</h2>

            <h2>Academic Organisations</h2>

            <p>
                These organisations are backing the AAPC and providing the tools, technologies and support to continue
                research into various pollen-related topics.
            </p>
            <AboutPage />
        </div>
    )
}
