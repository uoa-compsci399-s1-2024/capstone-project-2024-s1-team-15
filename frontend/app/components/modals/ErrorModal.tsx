"use client"

import { Nullable } from "@/app/lib/types";
import { useEffect, useState } from "react";

type ErrorModalProps = {
    msg?: Nullable<string>,
    onHide?: () => void
}

export default function ErrorModal({ msg, onHide }: ErrorModalProps) {
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        if (msg === undefined) {
            msg = "An error has occurred."
        }
        if (msg) setHidden(false)
    }, [])

    useEffect(() => {
        const s = document.getElementById("outer-error-modal")
        if (!s) return
        s.addEventListener("click", () => {
            const modal = document.getElementById("inner-error-modal")
            if (!modal) return
            if (!modal.matches(":hover")) {
                hideModal()
            }
        })
    }, [])

    const hideModal = () => {
        setHidden(true)
        onHide && onHide()
    }

    return (
        <div id={"outer-error-modal"} className={`${hidden? "hidden" : ""} outer-modal`}>
            <div id={"inner-error-modal"} className={"inner-modal flex flex-row justify-between bg-red-500 rounded-2xl"}>
                <div className={"py-4 px-6"}>
                    <span className={"text-white"}>{msg}</span>
                </div>
                <button onClick={hideModal}
                    className={"w-10 h-10 flex justify-center items-center rounded-full bg-black bg-opacity-0 hover:bg-opacity-20 transition-all m-2 shrink-0"}>
                    <svg className={"w-3 h-3 text-white"} aria-hidden={"true"} xmlns={"http://www.w3.org/2000/svg"}
                         fill={"none"} viewBox={"0 0 14 14"}>
                        <path stroke="currentColor" strokeLinecap={"round"} strokeLinejoin={"round"}
                              strokeWidth={"2"} d={"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"}/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
