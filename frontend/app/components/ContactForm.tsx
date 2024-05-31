"use client"

import { FormEvent, useState } from "react"
import { DEFAULT_FORM_DIALOG_DURATION } from "../lib/consts"
import ReCAPTCHA from "react-google-recaptcha"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import { contact, ContactPayload } from "@/app/services/lib/contact";
import { Nullable } from "@/app/lib/types";

export default function ContactForm() {
    async function sendEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSuccess(false)
        if (nameInput.trim() === "" || !nameInput) {
            setError("You must enter your name.")
            return
        }
        if (emailInput.trim() === "" || !emailInput) {
            setError("You must enter an email.")
            return
        }
        if (messageInput.trim() === "" || !messageInput) {
            setError("Message must not be blank.")
            return
        }
        setPending(true)
        const contactFormInputs: ContactPayload = {
            name: nameInput,
            email: emailInput,
            message: messageInput,
            recaptchaToken,
        }
        const r = await contact(contactFormInputs)
        if (r.success) {
            setError(null)
            setSuccess(true)
            setCurrentTimeout(c => {
                if (c) clearTimeout(c)
                return setTimeout(() => {
                    setSuccess(false)
                }, DEFAULT_FORM_DIALOG_DURATION)
            })
            const form = document.getElementById("contact-form") as HTMLFormElement
            form.reset()
        } else {
            setError(r.message)
        }
        setPending(false)
    }

    const [emailInput, setEmailInput] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [success, setSuccess] = useState(false)
    const [pending, setPending] = useState(false)
    const [_, setCurrentTimeout] = useState<Nullable<NodeJS.Timeout>>(null)

    return (
        <>
            <form onSubmit={sendEmail} className="space-y-4" id={"contact-form"}>
                <div>
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        minLength={1}
                        maxLength={50}
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:border-purple-100"
                        onChange={({ target }) => setNameInput(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        minLength={1}
                        maxLength={50}
                        required
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:border-purple-100"
                        onChange={({ target }) => setEmailInput(target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                        id="message"
                        minLength={1}
                        maxLength={3500}
                        required
                        placeholder="Hi there! Please write your message to us here, and we will get back to you soon."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 hover:border-purple-100 h-32"
                        onChange={({ target }) => setMessageInput(target.value)}></textarea>
                </div>

                <div className="flex justify-between md:items-center gap-x-4 gap-y-2 flex-col md:flex-row">
                    <div className="origin-left scale-75 sm:scale-100">
                        <ReCAPTCHA
                            sitekey="6LdQe94pAAAAAAtYGxiatB310mro7rNvoElcP8-T"
                            onChange={(successToken: null | string) => setRecaptchaToken(successToken)}
                        />
                    </div>
                    <Button
                        type={"submit"}
                        disabled={!recaptchaToken || pending}
                        text={pending ? "Sending..." : "Send to AAPC"}
                        title={!recaptchaToken ? "You must complete the ReCAPTCHA first." : undefined}
                        icon={icons.send}
                    />
                </div>

                {error &&
                    <p className="form-error">{error}</p>
                }
                {success &&
                    <p className="form-success">Your message has been sent successfully.</p>
                }
            </form>
        </>
    )
}
