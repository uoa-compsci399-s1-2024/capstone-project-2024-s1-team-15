import React from "react"
import ContactForm from "@/app/components/ContactForm"

export default function Contact() {
    return (
        <div>
            <div>
                <h1 className="text-3xl font-bold">Contact Us</h1>
            </div>
            <p>Please fill in the form to contact the AAPC team</p>

            <ContactForm />
        </div>
    )
}
