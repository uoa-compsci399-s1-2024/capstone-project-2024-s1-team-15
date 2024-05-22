import React from "react"
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm"
import pollenImg from "@/app/public/pollenimg.svg"

export default function Contact() {
    return (
        <>
            <h1 className="page-title">
                Contact us
            </h1>
            <div className="p-8 bg-accent-light rounded-2xl shadow-xl max-w-[720px]">
                <ContactForm/>
            </div>
            <div className="fixed inset-0 z-[-1] pl-96 ml-60">
                <Image src={pollenImg} alt="pollenimg"
                    className="-mt-20 ml-20" />
            </div>
        </>
    )
}
