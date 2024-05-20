import React from "react"
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm"
import pollenimg from "@/app/(homepage)/pollenimg.svg"

export default function Contact() {
    return (
        <>
        <div className="w-full max-w-3xl p-8 bg-purpleone rounded-2xl shadow-xl ml-32">
            <h3 className="text-xl font-bold bg-purpletwo text-white py-2 px-4 rounded-full inline-block mb-4">
                Contact us
            </h3>
            <p className="text-gray-700 bg-gray-200 p-4 rounded-xl border border-yellow-400 mb-6">
                Hi there, write your message here and we will get back to you via the Reply-to email
            </p>
            <ContactForm />
        </div>
        <div className="fixed inset-0 z-[-1] pl-96 ml-60">
            <Image src={pollenimg} alt="pollenimg"
                className="-mt-20 ml-20" />
        </div>
        </>
    )
}
