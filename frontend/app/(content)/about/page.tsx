import React from "react"
import AboutPage from "@/app/components/AboutPage"
import Copyright from "@/app/components/Copyright"


export default function About() {
    return (
        <>
            <h1 className="page-title mb-8">About Us</h1>

            <p>
                AAPC stands for the Aotearoa Airborne Pollen Collective. It includes a group of researchers working
                together to understand more about pollen and its impacts on health in New Zealand.
                <br />
                It was founded in 2024 and includes researchers who have spent years working in this area of science and
                health. Researchers are from different parts of New Zealand.
            </p>

            <h2 className={"text-center"}>Meet the Researchers!</h2>
            <AboutPage />
            <Copyright />
        </>
    )
}
