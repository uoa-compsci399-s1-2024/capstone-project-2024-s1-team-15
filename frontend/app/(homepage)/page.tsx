import React from "react"
import Image from "next/image"
import yellowback from "../public/homepageback.svg"
import pollenimg from "../public/pollenimg.svg"
import MessageFromQuery from "@/app/components/MessageFromQuery"
import Button from "@/app/components/Button"
import {
    IoAddCircleOutline,
    IoClose,
    IoInformationCircleOutline,
    IoLogInOutline,
    IoLogOutOutline
} from "react-icons/io5"

export default function Home() {
    return (
        <div className="relative">
            <MessageFromQuery/>
            <div className="fixed inset-0 z-[-1] pl-11 pt-20 ml-4 mt-10">
                <Image src={yellowback} alt="backgroundimg" className="pl-40 pt-5" />
            </div>
            <div className="fixed inset-0 z-[-1] pl-96 ml-60">
                <Image src={pollenimg} alt="pollenimg"
                       className="-mt-20 ml-20 transition-transform duration-1000 transform hover:-translate-y-5" />
            </div>
            <div className="text-black pl-8 w-fit">
                <h1 className="text-3xl">Welcome to</h1>
                <h1 className="text-8xl text-center">Aotearoa Airborne<br />Pollen Collective</h1>
                <p className="text-2xl ml-30 text-center">Clearing the Air: Your Source for Pollen Awareness</p>  
            </div>
            <div className={"space-y-4 mt-8"}>
                <Button text={"Log in"} icon={<IoLogInOutline size={"100%"}/>} className={"min-w-32"}/>
                <Button text={"Log out"} theme={"secondary"} icon={<IoLogOutOutline size={"100%"}/>} className={"min-w-32"}/>
                <Button text={"Add Image"} theme={"green"} icon={<IoAddCircleOutline size={"100%"}/>}/>
                <Button text={"Very Wide Button"} theme={"secondary"} className={"min-w-72"}/>
                <Button text={"Red Button"} theme={"red"}/>
                <Button theme={"green"} icon={<IoInformationCircleOutline size={"100%"}/>}/>
                <Button theme={"red"} icon={<IoClose size={"100%"}/>}/>
                <Button theme={"cms"} text={"Edit Article"}/>
            </div>
        </div>
    )
}
