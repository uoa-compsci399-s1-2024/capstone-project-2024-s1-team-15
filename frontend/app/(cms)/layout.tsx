import React from "react";

export default function CMSLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div>
            {/*<div className={"absolute right-12 -z-50"}>*/}
            {/*    <p className={"opacity-55 text-sm text-blue-500"}>CMS Layout</p>*/}
            {/*</div>*/}
            {children}
        </div>
    )
}
