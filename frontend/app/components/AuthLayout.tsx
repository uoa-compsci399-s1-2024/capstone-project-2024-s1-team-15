"use client"

import AuthProvider, { useAuth } from "../(auth)/CMSAuthContext"

// this component provides auth context to all child components
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AuthLayoutWithContext>{children}</AuthLayoutWithContext>
        </AuthProvider>
    )
}

// this component has access to all auth context (current signed in user, login method etc.)
function AuthLayoutWithContext({ children }: { children: React.ReactNode }) {
    const { currentUser, logout } = useAuth()

    return (
        <div>
            {currentUser && (
                <>
                    <p>Logged in as Admin</p>
                    <button className="button" onClick={logout}>
                        Logout
                    </button>
                </>
            )}

            {children}
        </div>
    )
}
