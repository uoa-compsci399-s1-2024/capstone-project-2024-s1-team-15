import React, { ForwardedRef, SetStateAction, useEffect, useImperativeHandle, useState } from "react";

export type ModalRef = {
    hideModal: () => void
    showModal: () => void
    toggleModal: () => void
}

export default function useModal(
    modalId: string,
    ref: ForwardedRef<ModalRef>,
    initiallyHidden: boolean = true,
    onHide? : () => void
):
    [ boolean, React.Dispatch<SetStateAction<boolean>>]
{
    const [hidden, setHidden] = useState(initiallyHidden)
    const showModal = () => setHidden(false)
    const hideModal = () => {
        setHidden(true)
        onHide && onHide()
    }
    const toggleModal = () => setHidden(e => !e)

    useImperativeHandle(ref, () => ({ hideModal, showModal, toggleModal }))

    useEffect(() => {
        // Close modal on click outside innerModal
        const outerModal = document.getElementById(modalId)
        const innerModal = document.getElementById(`inner-${modalId}`)

        if (!outerModal || !innerModal) return

        outerModal.addEventListener("click", () => {
            const modal = document.getElementById(`inner-${modalId}`)
            if (!modal) return
            if (!modal.matches(":hover") && !modal.classList.contains("touch-hover")) {
                hideModal()
            }
        })

        // Add touch-hover effect on inner modal to prevent closing outer modal on touch
        innerModal.addEventListener("touchstart", () => {
            innerModal.classList.add("touch-hover")
        })
        innerModal.addEventListener("touchend", () => {
            setTimeout(() => innerModal.classList.remove("touch-hover"), 150)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [ hidden, setHidden ]
}
