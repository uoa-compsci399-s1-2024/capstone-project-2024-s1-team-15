"use client"

import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react"
import Modal from "@/app/components/modals/components/Modal"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type ConfirmModalProps = {
    id: string,
    onConfirm: () => void
    buttonText?: string
    buttonIcon?: React.JSX.Element
}

const ConfirmModal = forwardRef(
    function ConfirmModal({ id, onConfirm, buttonText, buttonIcon, children }: PropsWithChildren<ConfirmModalProps>, ref: ForwardedRef<ModalRef>) {
        id = id + "-confirm-modal"
        const [hidden, setHidden] = useModal(id, ref)

        return (
            <Modal modalId={id} hidden={hidden} innerClassName={"flex-row flex gap-x-4 bg-red-400"}>
                <div className={"grow"}>
                    {children}
                    <div className={"flex flex-row gap-x-4 mt-4"}>
                        <Button
                            text={"Back"} theme={"secondary"} className={"text-black"} icon={icons.back} leftIcon
                            onClick={() => {
                                setHidden(true)
                            }}
                        />
                        <Button
                            text={buttonText || "Confirm"}
                            theme={"red"}
                            className={"text-black"}
                            icon={buttonIcon || icons.image}
                            onClick={() => {
                                setHidden(true)
                                onConfirm()
                            }}
                        />
                    </div>
                </div>
                <Button
                    theme={"overlay"}
                    onClick={() => { setHidden(true) }}
                    icon={icons.close}
                />
            </Modal>
        )
    }
)

export default ConfirmModal