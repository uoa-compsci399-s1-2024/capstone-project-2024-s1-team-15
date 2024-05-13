import React from "react";
import Image from "next/image";
import yellowback from "./homepageback.svg";
import pollenimg from "./pollenimg.svg";
import Copyright from "@/app/components/Copyright"

export default function Home() {
    return (
        <div className="relative">
            <div className="fixed inset-0 z-[-1] pl-11 pt-20 ml-4 mt-10">
                <Image src={yellowback} alt="backgroundimg" className="pl-40 pt-5" />
            </div>
            <div className="fixed inset-0 z-[-1] pl-96 ml-60">
                <Image src={pollenimg} alt="pollenimg"
                       className="-mt-20 ml-20 transition-transform duration-1000 transform hover:-translate-y-5" />
            </div>
            <div className="fixed text-black pl-8">
                <h1 className="text-3xl">Welcome to</h1>
                <h1 className="text-8xl ml-30 text-center">Aotearoa Airborne<br />Pollen Collective</h1>
                <p className="text-2xl ml-30 text-center">Clearing the Air: Your Source for Pollen Awareness</p>
                <div className="bottom-0">
                    <Copyright />
                </div>
            </div>
        </div>
    );
}
