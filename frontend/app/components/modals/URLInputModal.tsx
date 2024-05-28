import Modal from "@/app/components/modals/components/Modal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import React, { Dispatch, forwardRef, SetStateAction } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import { Nullable } from "@/app/lib/types";
import { IoLinkOutline } from "react-icons/io5";

type Props = {
    modalId: string,
    setUrl: Dispatch<SetStateAction<Nullable<string>>>
}

const URLInputModal = forwardRef(
    function URLInputModal({ modalId, setUrl }: Props, ref: React.ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(modalId, ref)

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const form = e.currentTarget
            const formElements = form.elements as typeof form.elements & {
                url: HTMLInputElement
            }
            setUrl(formElements.url.value)
            setHidden(true)
            form.reset()
        }

        return (
            <Modal modalId={modalId} hidden={hidden} innerClassName={`flex flex-row gap-x-4 bg-white`}>
                <form className={"grow default-form h-auto"} onSubmit={handleSubmit}>
                    <div className={"w-full"}>
                        <label className={"form-label"} htmlFor={"url"}>URL</label>
                        <input className={"form-input"}
                            name={'url'}
                            type={"text"}
                            placeholder={"https://..."}
                            id={"url"}
                        />
                    </div>
                    <Button
                        type={"submit"}
                        text={"Turn Into Link"}
                        icon={<IoLinkOutline size={"100%"}/>}
                    />
                </form>
                <Button
                    theme={"secondary"}
                    icon={icons.close}
                    onClick={() => setHidden(true)}
                />
            </Modal>
        )
    }
)

export default URLInputModal
