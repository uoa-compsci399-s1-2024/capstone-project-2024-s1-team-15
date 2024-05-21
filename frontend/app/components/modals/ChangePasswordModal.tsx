import { ChangePasswordForm } from "@/app/(auth)/components"
import { ForwardedRef, forwardRef } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal";
import FormModal from "@/app/components/modals/components/FormModal";

type ChangePasswordModalProps = {
    modalId: string
}

const ChangePasswordModal = forwardRef(
    function ChangePasswordModal({ modalId }: ChangePasswordModalProps, ref: ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(modalId, ref)

        return (
            <FormModal modalId={modalId} hidden={hidden} name={"Change Password"} setHidden={setHidden}>
                <ChangePasswordForm id={modalId}/>
            </FormModal>
        )
    }
)

export default ChangePasswordModal
