import React from "react";
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";
import pollenImg from "@/app/public/pollenimg.svg";

export default function Contact() {
    return (
        <>
            <h1 className="page-title relative z-20">
                Contact us
            </h1>
            <div className="p-8 bg-accent-light rounded-2xl shadow-xl max-w-[720px] relative z-20">
                <ContactForm />
            </div>
            <div className="fixed inset-0 z-10">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute top-[-80px] right-0 md:w-auto md:h-auto  duration-500 hover:translate-y-[-10px] hover:translate-x-[-10px]">
                        <Image src={pollenImg} alt="pollenimg" className="object-cover" />
                    </div>
                </div>
            </div>
        </>
    );
}
