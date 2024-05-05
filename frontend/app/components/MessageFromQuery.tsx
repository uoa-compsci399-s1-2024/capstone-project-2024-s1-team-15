"use client"

import { useRouter, useSearchParams } from "next/navigation"
import ErrorModal from "@/app/components/modals/ErrorModal";

export default function MessageFromQuery() {
    const searchParams = useSearchParams()
    const router = useRouter()

    const removeMsgFromQuery = () => {
        const url = new URL(window.location.href)
        url.searchParams.delete("msg")
        router.push(url.href)
    }

    let msg = searchParams.get("msg")
    try {
        msg = msg && atob(msg)
    } catch (e) {
        msg = null
    }

    return (
        <ErrorModal msg={msg} onHide={removeMsgFromQuery}/>
    )
}