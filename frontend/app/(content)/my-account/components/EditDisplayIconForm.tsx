import ImageInputModal, { ImageWithAltText } from "@/app/components/modals/ImageInputModal"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"
import fallbackIcon from "@/app/public/default-profile-icon.jpg"
import React, { useRef, useState } from "react"
import { Nullable } from "@/app/lib/types"
import { ModalRef } from "@/app/lib/hooks/useModal"
import Image from "next/image";
import { useFormState } from "react-dom";
import { FormState } from "@/app/(content)/my-account/page";

type Props = {
    currentSrc: Nullable<string>,
    onSuccess?: () => void
}

export default function EditDisplayIconForm({ currentSrc, onSuccess }: Props) {
    const [image, setImage] = useState<Nullable<ImageWithAltText>>(null)
    const modalRef = useRef<ModalRef>(null)

    const [formState, formAction] = useFormState<FormState>(
        async (_: FormState): Promise<FormState> => {
            if (!image?.src) return { error: "You must choose a new icon." }
            onSuccess && onSuccess()
            return { successMessage: "Display icon has been successfully changed." }
        }, {}
    )

    const DisplayIcon = ({ text, src }: { text: string, src: Nullable<string> }) => {
        return (
            <div className={"shrink-0 grow-0 flex flex-col-reverse justify-center gap-y-1"}>
                <p className={"text-center text-[9px] sm:text-[10px] md:text-[11px] text-slate-400 uppercase"}>
                    {text}
                </p>
                <Image
                    className={'h-28 w-28 aspect-square object-cover rounded-full shadow-md'}
                    src={src || fallbackIcon} width={200} height={200}
                    alt={"profile-icon"}
                />
            </div>
        )
    }

    return (
        <div>
            <ImageInputModal modalId={"display-icon-input"} setImage={setImage} ref={modalRef} location={"display-icon"}/>
            <form className={"space-y-2"} action={formAction}>
                <div className={"max-w-full flex flex-col mb-3"}>
                    <p className={"form-label"}>Display Icon</p>
                    <div className={`flex items-center justify-self-start gap-x-6 gap-y-2 flex-shrink-0 flex-wrap
                        md:flex-row md:flex-nowrap mt-1
                    `}>
                        <div className={"flex flex-row select-none gap-x-6"}>
                            <DisplayIcon text={"Current"} src={currentSrc}/>
                            {image && image.src && <DisplayIcon text={"New"} src={image.src}/>}
                        </div>
                        {!image?.src
                            ? <Button theme={"green"} text={"Choose a New Icon"} icon={icons.image} onClick={() => {
                                modalRef.current && modalRef.current.showModal()
                            }}/>
                            : <div className={"flex flex-col gap-y-2 "}>
                                <Button type={"submit"} theme={"green"} text={"Change Display Icon"} icon={icons.edit}/>
                                <Button theme={"secondary"} text={"Reset"} icon={icons.reload} onClick={() => {
                                    setImage(null)
                                }}/>
                            </div>
                        }
                    </div>
                </div>
                <div className={"ml-2"}>
                    {formState.error &&
                        <p className={"form-error"}>{formState.error}</p>
                    }
                    {formState.successMessage &&
                        <p className={"form-success"}>{formState.successMessage}</p>
                    }
                </div>
            </form>
        </div>
    )
}