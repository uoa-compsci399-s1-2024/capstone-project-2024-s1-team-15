import React from "react"
import ContactForm from "@/app/components/ContactForm"

export default function Contact() {
    return (
        <div>
            <div>
                <h1 className="text-3xl text-white font-bold bg-purple-300 p-4 inline-block rounded-full w-auto md:text-left">Contact
                    Us</h1>
            </div>
            <p>Please fill in the form to contact the AAPC team</p>

            <ContactForm />
        </div>
    )
}
