"use client"

import React from "react"
import Link from "next/link"
import AuthProvider, { useAuth } from "../(auth)/CMSAuthContext"

export default function Nav({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <NavContext>{children}</NavContext>
        </AuthProvider>
    )
}

function NavContext({ children }: { children: React.ReactNode }) {
    const { currentUser, logout} = useAuth();
    return (
        <div>
        <nav>
            <div className={`fixed h-28 w-full flex justify-between items-center z-50`}>
                <div className={"pl-20"}>
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
        </nav>
        {children}
        </div>
    );
}