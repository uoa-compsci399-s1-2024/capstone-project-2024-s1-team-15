import { LoginForm } from "@/app/(auth)/components"
import React, { ForwardedRef, forwardRef } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import FormModal from "@/app/components/modals/components/FormModal"

type LoginModalProps = {
    modalId: string
}

const LoginModal = forwardRef(
    function LoginModal({ modalId }: LoginModalProps, ref: ForwardedRef<ModalRef>) {
        const [ hidden, setHidden ] = useModal(modalId, ref)

        return (
            <FormModal name={`Log in`} modalId={modalId} hidden={hidden} setHidden={setHidden}>
                <LoginForm onSuccess={() => setHidden(true)} id={modalId}/>
            </FormModal>
        )
    }
)

export default LoginModal
