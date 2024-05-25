import Modal from "@/app/components/modals/components/Modal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useState } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import { Nullable } from "@/app/lib/types";
import {
    IoCloudDone,
    IoCloudDoneOutline, IoCloudUpload,
    IoCloudUploadOutline,
    IoImageOutline
} from "react-icons/io5"
import ImageInput from "@/app/components/modals/components/ImageInput"
import { filesize } from "filesize"
import { useAuth } from "@/app/lib/hooks"
import { uploadImage } from "@/app/services/image"

export type ImageAttribute = {
    src: Nullable<string>,
    alt: Nullable<string>
}

type Props = {
    modalId: string,
    setImageAttribute: Dispatch<SetStateAction<Nullable<ImageAttribute>>>
}

const URLInputModal = forwardRef(
    function URLInputModal({ modalId, setImageAttribute }: Props, ref: React.ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(modalId, ref)
        const [image, setImage] = useState<Nullable<File>>(null)
        const [uploading, setUploading] = useState<boolean>(false)
        const [uploadedImgSrc, setUploadedImgSrc] = useState<Nullable<string>>(null)
        const { token } = useAuth()

        useEffect(() => {
            setUploadedImgSrc(null)
            if (!image) return
            setUploading(true)
            uploadImage(image, { token }).then(r => {
                if (!r.success) {
                    console.error(r.message)
                } else {
                    console.log(r.result)
                    setUploadedImgSrc(r.result.src)
                }
            })
            setUploading(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [image])

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const form = e.currentTarget
            const formElements = form.elements as typeof form.elements & {
                alt: HTMLInputElement
            }
            setImageAttribute({
                src: uploadedImgSrc,
                alt: formElements.alt.value
            })
            setHidden(true)
            setImage(null)
            setUploadedImgSrc(null)
            form.reset()
        }

        return (
            <Modal modalId={modalId} hidden={hidden} innerClassName={`flex flex-row bg-white`}>
                <form className={"grow pr-6 default-form"} onSubmit={handleSubmit}>
                    <div className={"w-full"}>
                        <label className={"form-label"} htmlFor={"image"}>
                            Choose Image
                        </label>
                        <div className={"space-y-4"}>
                            <ImageInput onImageReceived={f => setImage(f)} type={"browse"} id={modalId + "image-browse"}/>
                            <ImageInput onImageReceived={f => setImage(f)} type={"dragdrop"}/>
                        </div>
                    </div>

                    {/* Image Preview */}
                    {image &&
                        <div className={"w-full"}>
                            <label className={"form-label"} htmlFor={"image"}>
                                Image Preview
                            </label>
                            <div className={"form-field p-2 space-y-2"}>
                                <div className={"flex flex-row text-slate-600 ml-1 space-x-1 items-center text-xs"}>
                                    <IoImageOutline/>
                                    <p className={'text-xs overflow-hidden overflow-ellipsis whitespace-nowrap max-w-72'}>
                                        {image.name}
                                    </p>
                                    <p className={"text-xs select-none"}>·</p>
                                    <p className={"text-xs"}>
                                        {filesize(image.size)}
                                    </p>
                                    <p className={"text-xs select-none"}>·</p>
                                    <p className={`text-xs ${uploading ? "text-yellow-600" : "text-green-600"}`}>
                                        {uploading ? <IoCloudUpload/> : <IoCloudDone/>}
                                    </p>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={URL.createObjectURL(image)} alt={image.name} className={"rounded-xl max-w-full"}/>
                            </div>
                        </div>
                    }

                    {/* Alt Text Field */}
                    <div className={"w-full"}>
                        <label htmlFor={"alt"} className={"form-label"}>
                            Alt Text
                        </label>
                        <input
                            id={"alt"}
                            name={"alt"}
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
