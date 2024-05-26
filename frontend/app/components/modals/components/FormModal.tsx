import React, { PropsWithChildren, SetStateAction } from "react"
import Modal from "@/app/components/modals/components/Modal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type FormModalProps = {
    modalId: string,
    hidden: boolean,
    name: string,
    setHidden: React.Dispatch<SetStateAction<boolean>>
}

export default function FormModal({ name, modalId, hidden, setHidden, children }: FormModalProps & PropsWithChildren) {
    return (
        <Modal modalId={modalId} hidden={hidden} innerClassName={`flex flex-col bg-white`}>
            <div className={"flex flex-row mb-3"}>
                <h2 className={`font-bold grow ml-2 mt-1 mb-3`}>{name}</h2>
                <Button
                    theme={"secondary"}
                    icon={icons.close}
                    onClick={() => setHidden(true)}
                />
            </div>
            <div>
                {children}
            </div>
        </Modal>
    )
}
