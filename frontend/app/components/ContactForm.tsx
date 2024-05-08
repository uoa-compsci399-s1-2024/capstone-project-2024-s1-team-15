"use client"

import { FormEvent, useState } from "react"
import { API_URI } from "../lib/consts"

export default function ContactForm() {
    async function sendEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const contactFormInputs = JSON.stringify({
            name: nameInput,
            email: emailInput,
            message: messageInput,
        })

        return await fetch(`${API_URI}/contact-aapc`, {
            method: "post",
            body: contactFormInputs,
            headers: { "Content-Type": "application/json", Accept: "*/*" },
        })
    }

    const [emailInput, setEmailInput] = useState("")
    const [nameInput, setNameInput] = useState("")
    const [messageInput, setMessageInput] = useState("")

    return (
        <>
            <form onSubmit={sendEmail} className="py-4 my-4 border-t flex flex-col gap-5">
                <div className="flex flex-col gap-2 ">
                    <label htmlFor="fullname" className="font-bold text-gray-800">
                        Full Name
                    </label>
                    <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full focus-within:bg-gradient-to-r focus-within:from-yellow-300 focus-within:to-purple-500 bg-yellow-300 p-[2px] focus-within:p-[2px] focus-within:shadow-md">
                        <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                            <input
                                type="text"
                                id="fullname"
                                minLength={1}
                                maxLength={50}
                                placeholder="Type your full name here..."
                                className="w-full h-6 group outline-none placeholder-gray-500 "
                                defaultValue={nameInput}
                                onChange={({ target }) => setNameInput(target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold text-gray-800">
                        Email
                    </label>
                    <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full focus-within:bg-gradient-to-r focus-within:from-yellow-300 focus-within:to-purple-500 bg-yellow-300 p-[2px] focus-within:p-[2px] focus-within:shadow-md">
                        <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                            <input
                                type="text"
                                id="email"
                                minLength={6}
                                maxLength={50}
                                required
                                placeholder="Type your email here..."
                                className="w-full h-6 group outline-none placeholder-gray-500 "
                                defaultValue={emailInput}
                                onChange={({ target }) => setEmailInput(target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-bold text-gray-800">
                        Your Message
                    </label>
                    <div className="flex items-center justify-center group rounded-lg text-sm font-semibold w-full focus-within:bg-gradient-to-r focus-within:from-yellow-300 focus-within:to-purple-500 bg-yellow-300 p-[2px] focus-within:p-[2px] focus-within:shadow-md">
                        <div className="bg-white w-full py-2 px-3 rounded-lg flex justify-between items-center group">
                            <textarea
                                id="message"
                                minLength={2}
                                maxLength={500}
                                required
                                placeholder="Type your message here..."
                                className="w-full group outline-none placeholder-gray-500 h-32"
                                defaultValue={messageInput}
                                onChange={({ target }) => setMessageInput(target.value)}></textarea>
                        </div>
                    </div>
                </div>

                <button className={"button w-48"} type="submit">
                    Send
                </button>
            </form>
        </>
    )
}
