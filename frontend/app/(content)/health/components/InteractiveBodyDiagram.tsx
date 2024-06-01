"use client"

import React, { useRef, useState } from "react"
import Image from "next/image"
import { Nullable } from "@/app/lib/types"
import { ModalRef } from "@/app/lib/hooks/useModal"
import symptoms from "@/app/(content)/health/content/commonSymptoms"
import DialogModal from "@/app/(content)/health/components/DialogModal"
import HumanCartoon from "@/app/public/health/humanCartoon.svg"

export default function InteractiveBodyDiagram() {
    const [selectedBodyPart, setSelectedBodyPart] = useState<Nullable<string>>(null)
    const dialogModalRefs = symptoms.map(s => {
        return {
            id: s.title,
            ref: useRef<ModalRef>(null)
        }
    })

    return (
        <>
            {symptoms.map(s =>
                <DialogModal id={s.title} ref={dialogModalRefs.find(r => r.id === s.title)?.ref} onClose={() => {
                    setSelectedBodyPart(null)
                }}>
                    <div className={"prose"}>
                        {s.content}
                    </div>
                </DialogModal>
            )}
            <div className={`h-96 w-fit opacity-gradient relative group`}>
                <p className={`absolute group-hover:opacity-0 ${selectedBodyPart ? "opacity-0" : ""} transition-all`}>
                    Hover on me!
                </p>
                <p className={`absolute opacity-0 group-hover:opacity-100 ${selectedBodyPart ? "opacity-0" : ""} transition-all`}>
                    Click a purple circle
                </p>
                <div
                    className={`w-fit h-full group-hover:scale-[450%] ${selectedBodyPart ? "scale-[450%]" : ""} origin-[50%_8%] relative -top-2 transition-all`}>
                    {symptoms.map((s) => s.positions.map(p =>
                        <ClickableBodyPart
                            position={p}
                            onClick={() => {
                                const modalRef = dialogModalRefs.find(r => r.id === s.title)?.ref
                                if (modalRef) modalRef.current && modalRef.current.showModal()
                                setSelectedBodyPart(s.title)
                            }}
                            selected={selectedBodyPart === s.title}
                        />
                    ))}
                    <Image src={HumanCartoon} alt="Human cartoon" className="w-full h-full"/>
                </div>
            </div>
        </>
    )
}

type ClickableBodyPartProps = {
    position: { x: number; y: number }  // in % from top left
    selected: boolean
    onClick: () => void
}

function ClickableBodyPart({ position, selected, onClick }: ClickableBodyPartProps) {
    return (
        <button
            className={`border-[#601872] border-[0.05px] border-solid ${selected ? "bg-[#601872] opacity-60" : ""}
                hover:bg-[#601872] w-[5px] h-[5px] inline-block absolute
                top-5 rounded-xl opacity-0 group-hover:opacity-60 transition-all`
            }
            style={{ top: `${position.y}%`, left: `${position.x}%` }}
            onClick={onClick}
        />
    )
}
