"use client"

import { FormEvent, useState } from "react"
import { API_URI } from "../lib/consts"
import ReCAPTCHA from "react-google-recaptcha"
import Button from "@/app/components/Button";
import icons from "@/app/lib/icons";

export default function ContactForm() {
    async function sendEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setPending(true)

        const contactFormInputs = JSON.stringify({
            name: nameInput,
            email: emailInput,
            message: messageInput,
            recaptchaToken,
        })

        const contactAttemptResponse = await fetch(`${API_URI}/contact-aapc`, {
            method: "post",
            body: contactFormInputs,
            headers: { "Content-Type": "application/json", Accept: "*/*" },
        })

        if (contactAttemptResponse.status === 200) {
            setMessageSentSuccess("Message has been sent successfully ✅");
            (document.getElementById("contact-form") as HTMLFormElement).reset()
            setMessageSentError(null)
        } else {
            setMessageSentSuccess(null)
            setMessageSentError((await contactAttemptResponse.json()).message)
        }

        setPending(false)
    }

    const [emailInput, setEmailInput] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const [messageSentError, setMessageSentError] = useState<null | string>(null)
    const [messageSentSuccess, setMessageSentSuccess] = useState<null | string>(null)
    const [pending, setPending] = useState(false)

    return (
        <>
            <form onSubmit={sendEmail} className="space-y-6" id={"contact-form"}>
                <div>
                    <label htmlFor="fullname" className="sr-only">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        minLength={1}
                        maxLength={50}
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        onChange={({ target }) => setNameInput(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="sr-only">
                        Reply-to Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        minLength={1}
                        maxLength={50}
                        required
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        onChange={({ target }) => setEmailInput(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="sr-only">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        minLength={1}
                        maxLength={3500}
                        required
                        placeholder="Hi there! Please write your message to us here, and we will get back to you soon."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 h-32"
                        onChange={({ target }) => setMessageInput(target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-between md:items-center gap-x-4 gap-y-2 flex-col md:flex-row">
                    <ReCAPTCHA
                        sitekey="6LdQe94pAAAAAAtYGxiatB310mro7rNvoElcP8-T"
                        onChange={(successToken: null | string) => setRecaptchaToken(successToken)}
                    />
                    <Button
                        type={"submit"}
                        disabled={!recaptchaToken || pending}
                        text={pending ? "Sending..." : "Send to AAPC"}
                        title={!recaptchaToken ? "You must complete the ReCAPTCHA first." : undefined}
                        icon={icons.send}
                    />
                </div>

                {messageSentError && <p className="text-red-500">{messageSentError}</p>}
                {messageSentSuccess && <p className="text-green-500">{messageSentSuccess}</p>}
            </form>
        </>
    )
}
