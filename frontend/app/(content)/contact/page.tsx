import React from "react"
import ContactForm from "@/app/components/ContactForm"
import PageTemplate from "@/app/components/PageContentTemplate"
import Copyright from "@/app/components/Copyright"

export default function Contact() {
    return (
        <PageTemplate>

            <PageTemplate.PageName><div className="page-title">Contact Us</div></PageTemplate.PageName>

            <PageTemplate.PageExplanation>Please fill in the form to contact the AAPC team</PageTemplate.PageExplanation>
            <PageTemplate.RemainingPageContent>
                <ContactForm />
                <Copyright />
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
