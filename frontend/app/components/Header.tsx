"use client"

import React, { useRef, useState } from "react"
import Link from "next/link"
import icons from "@/app/lib/icons"
import { ModalRef } from "@/app/lib/hooks/useModal"
import { AuthDashboard } from "@/app/(auth)/components"
import { MobileNavModal, MobileAuthModal } from "@/app/components/modals"

export default function Header(): React.JSX.Element {
    const mobileNavModalRef = useRef<ModalRef>(null)
    const mobileAuthModalRef = useRef<ModalRef>(null)

    const defaultNavIcon = icons.burger
    const defaultAuthIcon = icons.user
    const defaultCloseIcon = icons.close

    const [navIcon, setNavIcon] = useState<React.JSX.Element>(defaultNavIcon)
    const [authIcon, setAuthIcon] = useState<React.JSX.Element>(defaultAuthIcon)

    const toggleMobileNavModal = () => {
        if (mobileNavModalRef.current) {
            setNavIcon(mobileNavModalRef.current.hidden ? defaultCloseIcon : defaultNavIcon)
            mobileNavModalRef.current.toggleModal()
        }
    }

    const hideMobileNavModal = () => {
        if (mobileNavModalRef.current) {
            mobileNavModalRef.current.hideModal()
            setNavIcon(defaultNavIcon)
        }
    }

    const toggleMobileAuthModal = () => {
        if (mobileAuthModalRef.current) {
            setAuthIcon(mobileAuthModalRef.current.hidden ? defaultCloseIcon : defaultAuthIcon)
            mobileAuthModalRef.current.toggleModal()
        }
    }

    const hideMobileAuthModal = () => {
        if (mobileAuthModalRef.current) {
            mobileAuthModalRef.current.hideModal()
            setAuthIcon(defaultAuthIcon)
        }
    }

    return (
        <>
            <div className={"lg:hidden"}>
                <MobileNavModal onClose={() => setNavIcon(defaultNavIcon)} ref={mobileNavModalRef}/>
            </div>
            <div className={'md:hidden'}>
                <MobileAuthModal onClose={() => setAuthIcon(defaultAuthIcon)} ref={mobileAuthModalRef}/>
            </div>
            <div
                className={`fixed top-0 w-full flex items-center z-20 bg-gradient-to-b from-background to-background-light
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
                `} onClick={() => {
                    toggleMobileNavModal()
                    hideMobileAuthModal()
                }}>
                    <div className={"m-1.5 p-2.5 sm:m-2 sm:p-3 md:m-2.5 md:p-4 rounded-xl"}>
                        {navIcon}
                    </div>
                </button>

                {/* Main Logo */}
                <div className={"md:flex-grow"}>
                    <Link href={"/"} className="text-black p-4">
                    <span
                        className={"font-bold text-2xl sm:text-4xl md:text-5xl text-black tracking-tight select-none"}>
                        AAPC
                    </span>
                    </Link>
                </div>

                {/* Auth Dashboard - Only shown on desktop viewports */}
                <div className={"hidden md:block justify-self-end"}>
                    <AuthDashboard dashboardLocation={"desktop-nav"}/>
                </div>

                {/* Auth Dropdown - Only shown on mobile & tablet viewports */}
                <button className={`block md:hidden
                    h-header-mobile w-header-mobile
                    sm:h-header-tablet sm:w-header-tablet
                `} onClick={() => {
                    toggleMobileAuthModal()
                    hideMobileNavModal()
                }}>
                    <div className={"m-1.5 p-2.5 sm:m-2 sm:p-3 md:m-2.5 md:p-4 rounded-xl"}>
                        {authIcon}
                    </div>
                </button>
            </div>
        </>
    )
}
