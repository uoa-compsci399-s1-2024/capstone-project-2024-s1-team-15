import React from "react";
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";
import pollenImg from "@/app/public/homepage/pollenimg.svg";
import { DEFAULT_MAILTO_ADDRESS } from "@/app/lib/consts";

export default function Contact() {
    const showMailtoLink = true;  // Set this to false to remove mailto: link in form body

    return (
        <>
            <h1 className="page-title relative z-10">Contact us</h1>
            <div className="p-8 bg-accent-light rounded-2xl shadow-xl max-w-[720px] relative z-10">
                {showMailtoLink &&
                    <div className="relative z-10 mb-6">
                        <p className="smaller text-gray-500">
                            You can send us a message using the form below, or by&nbsp;
                            <a
                                className="smaller hover:underline"
                                href={`mailto:${DEFAULT_MAILTO_ADDRESS}?subject=Inquiry from AAPC Website`}
                                target="_blank"
                            >
                                emailing us here
                            </a>
                            .
                        </p>
                    </div>
                }
                <ContactForm />
            </div>

            {/* Full-width screen layout */}
            <div className="fixed inset-0 hidden lg:block">
                <div className="relative w-full h-full overflow-hidden">
                    <div className="absolute top-[-80px] right-0 md:w-auto md:h-auto duration-500 hover:translate-y-[-10px] hover:translate-x-[-10px]">
                        <Image src={pollenImg} alt="pollenimg" className="object-cover" />
                    </div>
                </div>
            </div>
            
            {/* Small screen layout */}
            <div className="block lg:hidden relative overflow-hidden">
                {/* No pollen image on small screens */}
            </div>
        </>
    );
}
