import Modal from "@/app/components/modals/components/Modal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import React, { Dispatch, forwardRef, SetStateAction, useState } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import { Nullable } from "@/app/lib/types";
import {
    IoCloudDoneOutline,
    IoCloudUploadOutline,
    IoImageOutline
} from "react-icons/io5"
import ImageInput from "@/app/components/modals/components/ImageInput"

type Props = {
    modalId: string,
    setSrc: Dispatch<SetStateAction<Nullable<string>>>
    setAlt: Dispatch<SetStateAction<Nullable<string>>>
}

const URLInputModal = forwardRef(
    function URLInputModal({ modalId, setSrc, setAlt }: Props, ref: React.ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(modalId, ref)
        const [image, setImage] = useState<Nullable<File>>(null)
        const [uploading, setUploading] = useState<boolean>(false)

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const form = e.currentTarget
            const formElements = form.elements as typeof form.elements & {
                src: HTMLInputElement
                alt: HTMLInputElement
            }
            setSrc(formElements.src.value)
            setAlt(formElements.alt.value)
            setHidden(true)
            form.reset()
        }

        return (
            <Modal modalId={modalId} hidden={hidden} innerClassName={`flex flex-row bg-white`}>
                <form className={"grow pr-6 default-form"}>
                    <div className={"w-full"}>
                        <label className={"form-label"} htmlFor={"image"}>
                            Choose Image
                        </label>
                        <div className={"space-y-4"}>
                            <ImageInput onImageReceived={f => setImage(f)} type={"browse"} id={modalId + "image-browse"}/>
                            <ImageInput onImageReceived={f => setImage(f)} type={"dragdrop"}/>
                        </div>
                    </div>
                    {image &&
                        <div className={"w-full"}>
                            <label className={"form-label"} htmlFor={"image"}>
                                Image Preview
                            </label>
                            <div className={"form-field p-2 space-y-2"}>
                                <div className={"flex flex-row text-slate-600 ml-1 space-x-1 items-center"}>
                                    <IoImageOutline/>
                                    <p className={'text-xs overflow-hidden overflow-ellipsis whitespace-nowrap max-w-96'}>
                                        {image.name}
                                    </p>
                                </div>
                                <img src={URL.createObjectURL(image)} alt={image.name} className={"rounded-xl max-w-full"}/>
                            </div>
                        </div>
                    }
                    <div className={"w-full"}>
                        <label htmlFor={"alt"} className={"form-label"}>
                            Alt Text
                        </label>
                        <input
                            className={"form-input"}
                            type={"text"}
                            placeholder={"A short description of the image... (Optional)"}
                        />
                    </div>
                    {image === null
                        ? <Button
                            type={"submit"}
                            text={"Add Image"}
                            icon={<IoImageOutline size={"100%"}/>}
                            title={"You must upload an image first."}
                            disabled
                        />
                        : uploading
                        ? <Button
                            type={"submit"}
                            text={"Uploading..."}
                            icon={<IoCloudUploadOutline size={"100%"}/>}
                            disabled
                        />
                        : <Button
                            type={"submit"}
                            text={"Add Image"}
                            icon={<IoCloudDoneOutline size={"100%"}/>}
                        />
                    }
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
