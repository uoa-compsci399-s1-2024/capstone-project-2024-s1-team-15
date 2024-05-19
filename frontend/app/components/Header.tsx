import React from "react"
import Link from "next/link"
import { AuthDashboard } from "@/app/(auth)/components"
import { FiMenu } from "react-icons/fi"
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Header(): React.JSX.Element {
    return (
        <div className={`fixed h-header-mobile sm:h-header-tablet sm:px-1.5 md:h-header-desktop md:px-20 w-full flex justify-between items-center z-30 bg-gradient-to-b from-white`}>
            <button className={"block md:hidden h-header-mobile w-header-mobile"}>
                <div className={"m-1.5 p-2.5 rounded-xl"}>
                    <FiMenu size={"1x"}/>
                </div>
            </button>
            <div>
                <Link href={"/"} className="text-black p-4">
                    <span className={"font-bold text-2xl sm:text-4xl md:text-5xl text-black tracking-tight"}>
                            AAPC
                    </span>
                </Link>
            </div>
            <div className={"hidden md:block"}>
                <AuthDashboard/>
            </div>
            <button className={"block md:hidden h-header-mobile w-header-mobile"}>
                <div className={"m-1.5 p-2.5 rounded-xl"}>
                    <MdOutlineAccountCircle size={"1x"}/>
                </div>
            </button>
        </div>
    )
}
