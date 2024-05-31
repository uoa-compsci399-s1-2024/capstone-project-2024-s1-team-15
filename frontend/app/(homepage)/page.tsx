import React from "react";
import Image from "next/image";
import yellowback from "../public/homepageback.svg";
import yellowblob from "../public/yellowblob.svg";
import pollenimg from "../public/pollenimg.svg";
import MessageFromQuery from "@/app/components/MessageFromQuery";

export default function Home() {
    return (
        <div className="relative">
            <MessageFromQuery />
            
            {/* Full-width screen layout */}
            <div className="hidden lg:block">
                <div className="fixed">
                    <Image src={yellowback} alt="backgroundimg" className="pl-40 pt-5" />
                </div>
                <div className="fixed" style={{ width: '800px', height: '400px' }}>
    <Image src={yellowblob} alt="yellowblob" className="ml-[-650px] mt-[200px]" />
</div>


                <div className="fixed inset-0 pl-96 ml-60">
                    <div className="relative w-full h-full overflow-hidden">
                        <div className="-mt-20 ml-20 absolute top-[-80px] right-0 md:w-auto md:h-auto duration-500 hover:translate-y-[-10px] hover:translate-x-[-10px]">
                            <Image src={pollenimg} alt="pollenimg" className="object-cover z-[-1]" />
                        </div>
                    </div>
                </div>
                <div className="relative text-black pl-6 w-fit">
                    <h1 className="text-3xl">Welcome to</h1>
                    <h1 className="text-8xl text-center">Aotearoa Airborne<br />Pollen Collective</h1>
                    <p className="text-2xl ml-30 text-center">Clearing the Air: Your Source for Pollen Awareness</p>  
                </div>
            </div>
            
            {/* Small screen layout */}
            <div className="block lg:hidden relative overflow-hidden">
                <div className="fixed inset-0 flex justify-center items-start">
                    <Image 
                        src={yellowback} 
                        alt="backgroundimg" 
                        className="w-full h-full object-cover" 
                        priority 
                    />
                </div>
                <div className="relative z-10 text-black flex flex-col items-center justify-center mt-[-20px]">
                    <h1 className="text-3xl">Welcome to</h1>
                    <h1 className="sm:text-8xl text-4xl text-center">
                        Aotearoa Airborne
                        <br />
                        Pollen Collective
                    </h1>
                    <p className="text-2xl text-center">Clearing the Air: Your Source for Pollen Awareness</p>
                </div>
            </div>
        </div>
    );
}
