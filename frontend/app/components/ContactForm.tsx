"use client"

import { FormEvent, useState } from "react"
import { API_URI } from "../lib/consts"
import ReCAPTCHA from "react-google-recaptcha"

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
            setMessageSentSuccess("Message has been sent successfully ✅")
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
            <form onSubmit={sendEmail} className="space-y-6">
                <div>
                    <label htmlFor="fullname" className="sr-only">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullname"
                        minLength={1}
                        maxLength={50}
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        defaultValue={nameInput}
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
                        placeholder="Reply-to email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        defaultValue={emailInput}
                        onChange={({ target }) => setEmailInput(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="sr-only">
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        minLength={2}
                        maxLength={500}
                        required
                        placeholder="Hi there, write your message here and we will get back to you via the Reply-to email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 h-32"
                        defaultValue={messageInput}
                        onChange={({ target }) => setMessageInput(target.value)}
                    ></textarea>
                </div>

                <div className="flex justify-between items-center">
                    <ReCAPTCHA
                        sitekey="6LdQe94pAAAAAAtYGxiatB310mro7rNvoElcP8-T"
                        onChange={(successToken: null | string) => setRecaptchaToken(successToken)}
                    />
                    <button
                        disabled={!recaptchaToken || pending}
                        className="hoverable w-40 bg-yellow-300 hover:bg-yellow-400 text-black hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {pending ? "Sending..." : "Send"}
                    </button>
                </div>

                {messageSentError && <p className="text-red-500">{messageSentError}</p>}
                {messageSentSuccess && <p className="text-green-500">{messageSentSuccess}</p>}
            </form>
        </>
    )
}
