import React from "react";
import Link from "next/link";

export default function Nav (): React.JSX.Element {
    return (
        <div>
            <nav className={`fixed h-28 w-full bg-gradient-to-b from-green-100 flex justify-center items-center`}>
                <Link href={"/"}>
                    <div className={"py-6 px-12 flex-col flex justify-center items-center"}>
                        <span className={"font-extrabold text-2xl text-black tracking-tight"}>Aotearoa Airborne Pollen Collective</span>
                        <div className={"space-x-2"}>
                            <span className={"text-gray-500 text-lg"}>Prototype Website</span>
                            <span className={"text-gray-400 text-sm"}>Team Bit by Bit</span>
                        </div>
                    </div>
                </Link>
            </nav>
            <div className={`h-28`}></div>
        </div>
    )
}
