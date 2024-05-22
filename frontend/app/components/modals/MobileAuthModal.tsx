"use client"

import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { AuthDashboard } from "@/app/(auth)/components";
import { ModalRef } from "@/app/lib/hooks/useModal";

const MobileAuthModal = forwardRef(
    function MobileAuthModal(_, ref: ForwardedRef<ModalRef>): React.JSX.Element {
        const [hidden, setHidden] = useState(true)

        const toggleModal = () => setHidden(v => !v)
        const hideModal = () => setHidden(true)
        const showModal = () => setHidden(false)

        useImperativeHandle(ref, () => ({ showModal, toggleModal, hideModal, hidden }))

        useEffect(() => {
            const s = document.getElementById("mobile-auth")
            if (!s) return
            s.addEventListener("click", () => {
                const modal = document.getElementById("inner-mobile-auth")
                if (!modal) return
                if (!modal.matches(":hover") && !modal.matches(":active")) {
                    setHidden(true)
                }
            }) // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <div id={"mobile-auth"} tabIndex={-1} className={`fixed w-screen h-screen z-20 bg-black bg-opacity-40 ${hidden ? 'hidden' : ''}`}>
                <div className={"fixed h-header-mobile sm:h-header-tablet md:h-header-desktop w-full shadow-lg bg-white z-30"}/>
                <div id={"inner-mobile-auth"} className={`
                    relative flex flex-col justify-center rounded-b-2xl bg-gray-100 shadow-2xl p-6
                    mt-header-mobile mx-pc 
                    sm:mt-header-tablet sm:mx-pc-sm
                    md:mt-header-desktop md:mx-pc-md
                `}>
                    <AuthDashboard dashboardLocation={"mobile-nav"}/>
                </div>
            </div>
        )
    }
)

export default MobileAuthModal
