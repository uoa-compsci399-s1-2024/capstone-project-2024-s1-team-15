"use client"

import { useRouter } from "next/navigation"
import ErrorModal from "@/app/components/modals/ErrorModal";
import { useEffect, useState } from "react";
import { Nullable } from "@/app/lib/types";

export default function MessageFromQuery() {
    const router = useRouter()
    const [msg, setMsg] = useState<Nullable<string>>(null)

    const removeMsgFromQuery = () => {
        const url = new URL(window.location.href)
        url.searchParams.delete("msg")
        router.push(url.href)
    }

    useEffect(() => {
        const params = (new URL(window.location.href)).searchParams
        const msgB64 = params.get("msg")
        if (!msgB64) return
        try {
            setMsg(atob(msgB64))
        } catch (e) {
            setMsg(null)
        }  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ErrorModal msg={msg} onHide={removeMsgFromQuery}/>
    )
}