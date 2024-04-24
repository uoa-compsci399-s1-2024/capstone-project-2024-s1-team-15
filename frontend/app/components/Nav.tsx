import React from "react";
import Link from "next/link";

export default function Nav (): React.JSX.Element {
    return (
        <nav>
            <div className={"h-48 w-full fixed bg-gradient-to-b from-white z-[-1]"}></div>
            <div className={`fixed h-28 w-full bg-gradient-to-b from-green-100 flex justify-center items-center z-50`}>
                <Link href={"/"}>
                    <div className={"py-6 px-12 flex-col flex justify-center items-center"}>
                        <span className={"font-bold text-2xl text-black tracking-tight"}>Aotearoa Airborne Pollen Collective</span>
                        <div className={"space-x-2"}>
                            <span className={"text-secondary text-lg"}>Prototype Website</span>
                            <span className={"text-secondary text-sm"}>Team Bit by Bit</span>
                        </div>
                    </div>
                </Link>
            </div>
            <div className={`h-28`}></div>
        </nav>
    )
}
