import React from "react"
import ContactForm from "@/app/components/ContactForm"
import Copyright from "@/app/components/Copyright"


export default function Contact() {
    return (
        <>
            <h1 className="page-title">Contact Us</h1>

            <p>Please fill in the form to contact the AAPC team</p>
            <ContactForm />
            <Copyright />
        </>
    )
}
