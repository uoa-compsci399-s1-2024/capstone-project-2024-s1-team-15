import React from "react"
import { API_URI } from "@/app/consts"

export default async function Footer(): Promise<React.JSX.Element> {
    let backendEnv: string
    if (process.env.ENV === "PROD") {
        backendEnv = "prod"
    } else {
        try {
            const req = await fetch(API_URI + "/", { method: "get" })
            backendEnv = (await req.json()).environment ?? "unknown"
        } catch (e) {
            backendEnv = "offline"
        }
    }

    return (
        <footer>
            <div className={"h-32 w-full fixed bottom-0 bg-gradient-to-t from-white z-40"}></div>
            <div
                className={`fixed bottom-0 h-16 w-full bg-gradient-to-t from-green-100 flex justify-center items-center z-50`}>
                <div className={"py-6 px-12 flex-col flex justify-center items-center"}>
                    <span className={"font-bold text-xl text-black tracking-tight"}>aapc-nz.org</span>
                    <span
                        className={"text-secondary text-xs space-x-4" + (process.env.ENV !== "PROD" ? "" : " hidden")}>
                        <span>
                            frontend env: <b className={"font-mono"}>{(process.env.ENV ?? "local").toLowerCase()}</b>
                        </span>
                        <span>
                            backend env:{" "}
                            <b className={"font-mono" + (backendEnv === "offline" ? " text-red-500" : "")}>
                                {backendEnv.toLowerCase()}
                            </b>
                        </span>
                    </span>
                </div>
            </div>
            <div className={`h-16`}></div>
        </footer>
    )
}
