"use client"

import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react"
import Link from "next/link"
import { ModalRef } from "@/app/lib/hooks/useModal";

const MobileNavModal = forwardRef(
    function MobileNavModal(_, ref: ForwardedRef<ModalRef>): React.JSX.Element {
        const [hidden, setHidden] = useState(true)

        const toggleModal = () => setHidden(v => !v)
        const hideModal = () => setHidden(true)
        const showModal = () => setHidden(false)

        useImperativeHandle(ref, () => ({ showModal, toggleModal, hideModal, hidden }))

        useEffect(() => {
            const s = document.getElementById("mobile-nav")
            if (!s) return
            s.addEventListener("click", () => {
                const modal = document.getElementById("inner-mobile-nav")
                if (!modal) return
                if (!modal.matches(":hover")) {
                    setHidden(true)
                }
            }) // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const NavLink = ({ href, title }: { href: string, title: string }): React.JSX.Element => {
            return (
                <Link href={href} className={`block uppercase tracking-[0.12em] text-gray-600 font-light hover:tracking-[0.18em] hover:font-medium transition-all
                    py-2 text-[12px]
                    sm:py-2.5 sm:text-[13.5px]
                    md:py-3.5 md:text-[16px]
                `} onClick={() => setHidden(true)}>
                    {title}
                </Link>
            )
        }

        return (
            <div id={"mobile-nav"} tabIndex={-1} className={`fixed w-screen h-screen z-30 bg-black bg-opacity-40 ${hidden? 'hidden' : ''}`}>
                <div className={"fixed h-header-mobile sm:h-header-tablet md:h-header-desktop w-full shadow-lg bg-white"}/>
                <div id={"inner-mobile-nav"} className={`
                    relative flex flex-col justify-center text-center rounded-b-2xl bg-gray-100 shadow-2xl
                    mt-header-mobile mx-pc 
                    sm:mt-header-tablet sm:mx-pc-sm
                    md:mt-header-desktop md:mx-pc-md
                `}>
                    <NavLink href={"/pollen"} title={"Pollen"}/>
                    <NavLink href={"/health"} title={"Health"}/>
                    <NavLink href={"/research"} title={"Research"}/>
                    <NavLink href={"/news"} title={"News"}/>
                    <NavLink href={"/about"} title={"About"}/>
                    <NavLink href={"/contact"} title={"Contact"}/>
                </div>
            </div>
        )
    }
)

export default MobileNavModal
