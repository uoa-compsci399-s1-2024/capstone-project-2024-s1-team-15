import React from "react"
import Image from "next/image"
import yellowback from "../public/homepageback.svg"
import pollenimg from "../public/pollenimg.svg"
import MessageFromQuery from "@/app/components/MessageFromQuery"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

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
                <div className={"flex flex-row gap-x-4"}>
                    <Button text={"Sign up"} icon={icons.signup}/>
                    <Button text={"Log in"} theme={"secondary"} icon={icons.login}/>
                    <Button text={"My Account"} icon={icons.user}/>
                    <Button text={"Log out"} theme={"secondary"} icon={icons.logout}/>
                </div>
                <div className={"flex flex-row gap-x-4"}>
                    <Button text={"Add"} theme={"green"} icon={icons.add}/>
                    <Button text={"Delete"} theme={"red"} icon={icons.trash}/>
                    <Button text={"Previous"} theme={"secondary"} icon={icons.back} leftIcon/>
                    <Button text={"Next"} theme={"secondary"} icon={icons.forward}/>
                </div>
                <div className={"flex flex-row gap-x-4"}>
                    <Button text={"Very Wide Button"} theme={"secondary"} className={"min-w-96"}/>
                    <Button text={"small"} theme={"secondary"}/>
                    <Button theme={"green"} icon={icons.information}/>
                    <Button theme={"red"} icon={icons.close}/>
                </div>
                <div className={"flex flex-row gap-x-4"}>
                    <Button theme={"cms"} text={"Add Article"} icon={icons.add}/>
                    <Button theme={"cms"} text={"Edit Article"} icon={icons.edit}/>
                    <Button theme={"cms"} text={"Delete Article"} icon={icons.trash}/>
                </div>
                <div className={"flex flex-row gap-x-4"}>
                    <Button disabled text={"Disabled Button"}/>
                    <Button theme={"secondary"} disabled text={"Disabled Button"}/>
                    <Button theme={"red"} disabled text={"Disabled Button"}/>
                    <Button theme={"green"} disabled text={"Disabled Button"}/>
                </div>
            </div>
        </div>
    )
}
