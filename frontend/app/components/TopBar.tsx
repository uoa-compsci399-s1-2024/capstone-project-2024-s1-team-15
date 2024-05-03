"use client"

import React from "react"
import Link from "next/link"
import AuthProvider, { useAuth } from "../(auth)/CMSAuthContext"

export default function TopBar({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <TopBarContext>{children}</TopBarContext>
        </AuthProvider>
    )
}

function TopBarContext({ children }: { children: React.ReactNode }) {
    const { currentUser, logout} = useAuth();
    return (
        <div>
            <div className={`fixed h-28 w-full flex justify-between items-center z-50 bg-gradient-to-b from-white`}>
                <div className={"pl-20"}>
                <div className= {"bg-gradient-to-b from-white"}></div>
                    <span className={"font-bold text-5xl text-black tracking-tight"}>
                    <Link href={"/"} className="text-black">
                        AAPC
                    </Link>
                    </span>
                </div>
                <div className={"pr-20"}>
                    {!currentUser ? ( // Render if no user is logged in
                        <Link href={"/login"}>
                            <button 
                                className="py-2 px-6 rounded-full text-black font-semibold text-xs w-28 hoverable"
                                style={{ 
                                    backgroundColor: '#FFD166',
                                }}>
                                Log in
                            </button>
                        </Link>
                    ) : null}
                    {currentUser ? ( // Render if a user is logged in
                        <div className="flex items-center">
                            <p className="text-black text-sm mr-8">Logged in as <strong>Admin</strong></p>
                        <Link href={"/"}>
                            <button 
                                className="py-2 px-6 rounded-full text-black font-semibold text-xs w-28 hoverable"
                                style={{ 
                                    backgroundColor: '#FFD166',
                                }}
                                onClick={logout}>
                                Log out
                            </button>
                        </Link>
                        </div>
                    ) : null}
                </div>
            </div>
            <div className={`h-28`}></div>
        {children}
        </div>
    );
}