import React, { PropsWithChildren } from "react";

type ModalProps = {
    modalId: string,
    hidden: boolean,
    outerClassName?: string
    innerClassName?: string
}

export default function Modal (
    { modalId, hidden, outerClassName, innerClassName, children }: ModalProps & PropsWithChildren
): React.JSX.Element {
    return (
        <div id={modalId} tabIndex={-1} className={`${hidden? 'hidden' : ''} ${outerClassName}
            fixed top-0 bottom-0 left-0 h-screen w-screen z-40 bg-black bg-opacity-40
            px-pc sm:px-pc-sm md:px-pc-md
        `}>
            <div id={`inner-${modalId}`} className={`
                relative drop-shadow-2xl mx-auto mt-36 w-full max-w-[540px] max-h-[calc(100vh-12rem)]
                overflow-y-scroll overflow-x-hidden rounded-xl z-50 
            `}>
                <div className={`p-4 sm:p-5 md:p-6 ${innerClassName}`}>
                    {children}
                </div>
            </div>
        </div>
    )
}