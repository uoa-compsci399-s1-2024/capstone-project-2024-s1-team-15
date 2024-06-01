import Modal from "@/app/components/modals/components/Modal"
import React, { ForwardedRef, forwardRef, PropsWithChildren } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type DialogModalProps = {
    id: string
    onClose?: () => void
}

const DialogModal = forwardRef(
    function DialogModal({ id, onClose, children }: PropsWithChildren<DialogModalProps>, ref: ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(id + "-dialog-modal", ref, undefined, onClose)
        return (
            <Modal modalId={id + "-dialog-modal"} hidden={hidden} innerClassName={`flex-row flex gap-x-4 bg-green-200`}>
                <div className={"grow"}>
                    {children}
                </div>
                <Button
                    theme={"overlay"}
                    onClick={() => {
                        onClose && onClose()
                        setHidden(true)
                    }}
                    icon={icons.close}
                />
            </Modal>
        )
    }
)

export default DialogModal
