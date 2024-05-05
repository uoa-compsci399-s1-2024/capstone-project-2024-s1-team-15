import React from "react"
import Link from "next/link"

export default function Nav(): React.JSX.Element {
    return (
        <header>
            <div className={`fixed h-28 w-full flex justify-between items-center z-50`}>
                <div className={"pl-20"}>
                    <span className={"font-bold text-5xl text-black tracking-tight"}>
                        AAPC
                    </span>
                </div>
                <div className={"pr-20"}>
                    <Link href={"/login"}>
                    <button 
                    className="py-2 px-6 rounded-full text-black font-semibold text-xs w-28 transition duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105"
                    style={{ 
                        backgroundColor: '#FFD166',
                    }}
                    >
                        Log in
                    </button>
                    </Link>
                </div>
            </div>
            <div className={`h-28`}></div>
        </header>
    );
}
