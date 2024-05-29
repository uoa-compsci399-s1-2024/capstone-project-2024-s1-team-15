import React, { useRef, useState } from "react"
import Image from "next/image"
import { filesize } from "filesize"
import { IImageMetadata } from "@aapc/types"
import { deleteImage } from "@/app/services/image"
import { ModalRef } from "@/app/lib/hooks/useModal"
import { useAuth } from "@/app/lib/hooks"
import icons from "@/app/lib/icons"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import Button from "@/app/components/Button"

export default function ManageImageCard({ image }: { image: IImageMetadata }) {
    const confirmModalRef = useRef<ModalRef>(null)
    const [deleted, setDeleted] = useState(false)
    const { token } = useAuth()

    const handleDeleteImage = () => {
        deleteImage(image.id, { token }).then(r => {
            if (r.success) {
                setDeleted(true)
            }
        })
    }

    return (!deleted &&
        <div className={"flex flex-row gap-x-6 items-center"}>
            <ConfirmModal id={image.id} ref={confirmModalRef} onConfirm={() => {
                handleDeleteImage()
            }}>
                <div className={"text-white space-y-6 mb-6"}>
                    <div className={"space-y-4"}>
                        <p>
                            Are you sure you want to delete{" "}
                            <b className={"font-medium"}>{image.id}.{image.format}</b>
                            ?
                        </p>
                        <Image
                            src={image.src} alt={image.alt || ""} height={image.height} width={image.width}
                            className={"h-auto max-h-60 w-auto max-w-full object-contain rounded-xl mx-auto drop-shadow-xl"}
                        />
                    </div>
                </div>
            </ConfirmModal>

            <Button icon={icons.trash} theme={"red"} onClick={() => {
                confirmModalRef.current && confirmModalRef.current.showModal()
            }}/>

            <Image
                src={image.src} alt={image.alt || ""} height={96} width={96}
                className={"object-contain h-16 w-16 drop-shadow-md"}
            />

            <div>
                <p className={"smaller font-medium mb-1"}>{image.id}.{image.format}</p>
                <div className={"flex flex-row gap-x-3"}>
                    <p className={"text-xs text-gray-500"}>{filesize(image.size)}</p>
                    <p className={"text-xs text-gray-500"}>{image.height}x{image.width}</p>
                    <p className={"text-xs text-gray-500"}>{image.format.toUpperCase()} file</p>
                </div>
                <div>
                    <p className={"text-xs text-gray-500"}>
                        {"Uploaded at "}
                        {new Date(image.createdAt).toLocaleTimeString("en-us", {
                            hour: "numeric",
                            minute: "numeric"
                        })}{" on "}
                        {new Date(image.createdAt).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}