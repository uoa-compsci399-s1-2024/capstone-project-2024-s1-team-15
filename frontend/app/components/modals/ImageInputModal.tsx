import Modal from "@/app/components/modals/components/Modal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useState } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import { Nullable } from "@/app/lib/types";
import {
    IoCloudDone,
    IoCloudDoneOutline, IoCloudOffline, IoCloudUpload,
    IoCloudUploadOutline,
    IoImageOutline
} from "react-icons/io5"
import ImageInput from "@/app/components/modals/components/ImageInput"
import { filesize } from "filesize"
import { useAuth } from "@/app/lib/hooks"
import { uploadImage } from "@/app/services/image"

export type ImageWithAltText = {
    src: Nullable<string>,
    alt: Nullable<string>
}

type Props = {
    modalId: string,
    setImage: Dispatch<SetStateAction<Nullable<ImageWithAltText>>>
    location: "display-icon" | "content-editor"
}

const URLInputModal = forwardRef(
    function URLInputModal({ modalId, setImage, location }: Props, ref: React.ForwardedRef<ModalRef>) {
        const [hidden, setHidden] = useModal(modalId, ref)
        const [selectedImg, setSelectedImg] = useState<Nullable<File>>(null)
        const [uploading, setUploading] = useState<boolean>(false)
        const [uploadedImgSrc, setUploadedImgSrc] = useState<Nullable<string>>(null)
        const [error, setError] = useState<Nullable<string>>(null)
        const { token } = useAuth()

        useEffect(() => {
            setError(null)
            setUploadedImgSrc(null)
            if (!selectedImg) return
            setUploading(true)
            uploadImage(selectedImg, { token }).then(r => {
                if (r.success) {
                    setUploadedImgSrc(r.result.src)
                    setError(null)
                } else {
                    setError(r.message)
                }
            })
            setUploading(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [selectedImg])

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const form = e.currentTarget
            const formElements = form.elements as typeof form.elements & {
                alt: HTMLInputElement
            }
            setImage({
                src: uploadedImgSrc,
                alt: formElements.alt.value
            })
            setHidden(true)
            setSelectedImg(null)
            setUploadedImgSrc(null)
            form.reset()
        }

        return (
            <Modal modalId={modalId} hidden={hidden} innerClassName={`flex flex-row gap-x-4 bg-white`}>
                <form className={"grow default-form"} onSubmit={handleSubmit}>
                    <div className={"w-full"}>
                        <label className={"form-label"} htmlFor={"image"}>
                            Choose Image
                        </label>
                        <div className={"space-y-4"}>
                            <ImageInput onImageReceived={f => setSelectedImg(f)} type={"browse"} id={modalId + "image-browse"}/>
                            <ImageInput onImageReceived={f => setSelectedImg(f)} type={"dragdrop"}/>
                        </div>
                    </div>

                    {/* Image Preview */}
                    {selectedImg &&
                        <div className={"w-full"}>
                            <label className={"form-label"} htmlFor={"image"}>
                                Image Preview
                            </label>
                            <div className={"form-field p-2 space-y-2"}>
                                <div className={"flex flex-row text-slate-600 ml-1 space-x-1 items-center text-xs"}>
                                    <IoImageOutline/>
                                    <p className={'text-xs overflow-hidden overflow-ellipsis whitespace-nowrap max-w-72'}>
                                        {selectedImg.name}
                                    </p>
                                    <p className={"text-xs select-none"}>·</p>
                                    <p className={"text-xs"}>
                                        {filesize(selectedImg.size)}
                                    </p>
                                    <p className={"text-xs select-none"}>·</p>
                                    {error
                                        ? <p className={"text-xs text-red-600"} title={"Upload Error"}>
                                            <IoCloudOffline/>
                                        </p>
                                    : uploading
                                        ? <p className={"text-xs text-yellow-600"} title={"Uploading..."}>
                                            <IoCloudUpload/>
                                        </p>
                                        : <p className={"text-xs text-green-600"} title={"Upload Success"}>
                                            <IoCloudDone/>
                                        </p>
                                    }
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={URL.createObjectURL(selectedImg)} alt={selectedImg.name} className={"rounded-xl max-w-full"}/>
                            </div>
                        </div>
                    }

                    {/* Alt Text Field */}
                    <div className={`w-full ${location === "content-editor" ? "" : "hidden"}`}>
                        <label htmlFor={"alt"} className={"form-label"}>
                            Alt Text
                        </label>
                        <input
                            id={"alt"}
                            name={"alt"}
                            className={"form-input"}
                            type={"text"}
                            placeholder={"A short description of the image... (Optional)"}
                            value={location === "content-editor" ? undefined : "profile-icon"}
                            readOnly={location !== "content-editor"}
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className={"form-error"}>Upload Error: {error}</p>}

                    {selectedImg === null || error
                        ? <Button
                            type={"submit"}
                            text={location === 'content-editor' ? "Add Image" : "Use Image"}
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
                            text={location === 'content-editor' ? "Add Image" : "Use Image"}
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
