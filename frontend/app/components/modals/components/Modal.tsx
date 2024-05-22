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
            fixed top-0 left-0 h-screen w-screen z-40 bg-black bg-opacity-40
            px-pc
            sm:px-pc-sm
            md:px-pc-md
        `}>
            <div id={`inner-${modalId}`} className={`${innerClassName}
                relative drop-shadow-2xl mx-auto mt-48 w-full max-w-[540px] max-h-full rounded-xl z-50 
            `}>
                {children}
            </div>
        </div>
    )
}