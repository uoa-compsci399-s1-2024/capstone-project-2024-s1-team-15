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
            <ContactForm />
        </div>
        <div className="fixed inset-0 z-[-1] pl-96 ml-60">
            <Image src={pollenimg} alt="pollenimg"
                className="-mt-20 ml-20" />
        </div>
        </>
    )
}
