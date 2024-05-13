import React from "react"
import AboutPage from "@/app/components/AboutPage"
import PageTemplate from "@/app/components/PageContentTemplate"
import Copyright from "@/app/components/Copyright"

export default function About() {
    return (
        <PageTemplate>
            <PageTemplate.PageName><div className="page-title">About Us</div></PageTemplate.PageName>

            <PageTemplate.PageExplanation>
                AAPC stands for the Aotearoa Airborne Pollen Collective. It includes a group of researchers working
                together to understand more about pollen and its impacts on health in New Zealand.<br/>It was founded in
                2024 and includes researchers who have spent years working in this area of science and health.
                Researchers are from different parts of New Zealand.
            </PageTemplate.PageExplanation>

            <PageTemplate.HighlightSection>
                <h2 className={"text-center"}>Meet the Researchers!</h2>
            </PageTemplate.HighlightSection>

            <PageTemplate.RemainingPageContent>
                <AboutPage />
                <Copyright />
            </PageTemplate.RemainingPageContent>

        </PageTemplate>
    )
}
