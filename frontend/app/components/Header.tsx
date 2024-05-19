import React from "react"
import Link from "next/link"
import { AuthDashboard } from "@/app/(auth)/components"
import { FiMenu } from "react-icons/fi"
import { MdOutlineAccountCircle } from "react-icons/md";

export default function Header(): React.JSX.Element {
    return (
        <div className={`fixed top-0 w-full flex items-center z-30 bg-gradient-to-b from-white
            h-header-mobile justify-between
            sm:h-header-tablet sm:px-1.5
            md:h-header-desktop md:pl-3 md:pr-6 md:justify-normal
            lg:pl-12 lg:pr-16
        `}>
            {/* Nav Dropdown - Only shown on mobile, tablet & desktop narrow viewports */}
            <button className={`block lg:hidden
                h-header-mobile w-header-mobile
                sm:h-header-tablet sm:w-header-tablet
                md:w-header-desktop md:h-header-desktop
            `}>
                <div className={"m-1.5 p-2.5 sm:m-2 sm:p-3 md:m-2.5 md:p-4 rounded-xl"}>
                    <FiMenu size={"1x"}/>
                </div>
            </button>

            {/* Main Logo */}
            <div className={"md:flex-grow"}>
                <Link href={"/"} className="text-black p-4">
                    <span className={"font-bold text-2xl sm:text-4xl md:text-5xl text-black tracking-tight select-none"}>
                        AAPC
                    </span>
                </Link>
            </div>

            {/* Auth Dashboard - Only shown on desktop viewports */}
            <div className={"hidden md:block justify-self-end"}>
                <AuthDashboard/>
            </div>

            {/* Auth Dropdown - Only shown on mobile & tablet viewports */}
            <button className={`block md:hidden
                h-header-mobile w-header-mobile
                sm:h-header-tablet sm:w-header-tablet
            `}>
                <div className={"m-1.5 p-2.5 sm:m-2 sm:p-3 md:m-2.5 md:p-4 rounded-xl"}>
                    <MdOutlineAccountCircle size={"1x"}/>
                </div>
            </button>
        </div>
    )
}
