"use client"

import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"
import EditDisplayIconForm from "@/app/(content)/my-account/components/EditDisplayIconForm"
import EditDisplayNameForm from "@/app/(content)/my-account/components/EditDisplayNameForm"
import EditEmailForm from "@/app/(content)/my-account/components/EditEmailForm"
import { ChangePasswordModal } from "@/app/components/modals";
import { ModalRef } from "@/app/lib/hooks/useModal";
import { IImageMetadata } from "@aapc/types";
import { deleteImage, getImagesByUser } from "@/app/services/image";
import { filesize } from "filesize";
import Image from "next/image";
import ConfirmModal from "@/app/components/modals/ConfirmModal";

export type FormState = {
    error?: string
    successMessage?: string
}

function ManageImageCard({ image }: { image: IImageMetadata }) {
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
            <ConfirmModal id={image.id} ref={confirmModalRef} onConfirm={() => {handleDeleteImage()}}>
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
                src={image.src} alt={image.alt || ""} height={128} width={128}
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

export default function Page(): Nullable<React.JSX.Element> {
    const { user, token } = useAuth()
    const changePasswordModalRef = useRef<ModalRef>(null)
    const [images, setImages] = useState<IImageMetadata[]>([])

    useEffect(() => {
        if (!user) return
        getImagesByUser(user?.username, undefined, { token }).then(r => {
            if (r.success) {
                setImages(r.result.data)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return user && (
        <div>
            <ChangePasswordModal modalId={"my-account-change-password"} ref={changePasswordModalRef}/>
            <h1 className={"page-title"}>My Account</h1>
            <div className={"space-y-6"}>
                <div className={"max-w-full flex flex-col"}>
                    <label className={"form-label"}>Username (Cannot be changed)</label>
                    <input className={"form-input max-w-96 text-gray-400 select-none cursor-not-allowed"} readOnly value={user.username}/>
                </div>
                <EditDisplayNameForm displayName={user.displayName}/>
                <EditEmailForm email={user.email}/>
                <EditDisplayIconForm currentSrc={user.iconSrc}/>
                <div>
                    <label className={"form-label"}>Uploaded Images</label>
                    <div className={`space-y-3 mt-1 p-4 bg-blue-100 shadow-inner rounded-2xl bg-opacity-60 
                        hover:bg-opacity-80 transition
                    `}>
                        {images.map(im => <ManageImageCard key={im.id} image={im}/>)}
                    </div>
                </div>
                <div>
                    <label className={"form-label"}>Account Management</label>
                    <div className={`p-4 bg-red-100 shadow-inner rounded-2xl w-max mt-1
                        bg-opacity-60 hover:bg-opacity-80 transition
                    `}>
                        <div className={"space-y-4"}>
                            <Button
                                text={"Change Password"}
                                theme={"red"} icon={icons.key}
                                className={"min-w-[232px]"}
                                onClick={() => changePasswordModalRef.current && changePasswordModalRef.current.showModal()}
                            />
                            <Button
                                text={"Deactivate Account"}
                                theme={"red"} icon={icons.deactivate}
                                className={"min-w-[232px]"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
