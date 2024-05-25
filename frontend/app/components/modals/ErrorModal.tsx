"use client"

import { Nullable } from "@/app/lib/types";
import React, { ForwardedRef, forwardRef, useEffect } from "react"
import Modal from "@/app/components/modals/components/Modal"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type ErrorModalProps = {
    msg?: Nullable<string>,
    onHide?: () => void
}

const ErrorModal = forwardRef(
    function ErrorModal({ msg = "An error has occurred.", onHide }: ErrorModalProps, ref: ForwardedRef<ModalRef>) {
        const id = "error"
        const [hidden, setHidden] = useModal(id, ref, true, onHide)

        useEffect(() => {
            setHidden(msg === null)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [msg]);

        return (
            <Modal modalId={id} hidden={hidden} innerClassName={"flex-row flex bg-red-500 p-4 sm:p-5 md:p-6"}>
                <p className={"text-white grow"}>{msg}</p>
                <Button
                    theme={"overlay"}
                    onClick={() => { setHidden(true); onHide && onHide() }}
                    icon={icons.close}
                />
            </Modal>
        )
    }
)

export default ErrorModal
