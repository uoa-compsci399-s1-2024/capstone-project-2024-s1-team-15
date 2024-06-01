"use client"

import { useEffect, useRef, useState } from "react"
import HumanCartoon from "./images/humanCartoon.svg"
import Image from "next/image"
import commonSymptoms from "./commonSymptoms"
import ExplanationDialog from "./ExplanationDialog"

export default function InteractiveBodyDiagram() {
    const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
    const bodyPartExplanationDialogRef = useRef<null | HTMLDialogElement>(null)

    return (
        <div>
            <div className={`h-96 w-fit opacity-gradient relative group overflow-hidden`}>
                <p className={`absolute group-hover:opacity-0 ${selectedBodyPart ? "opacity-0" : ""} transition-all`}>
                    Hover on me!
                </p>
                <p
                    className={`absolute opacity-0 group-hover:opacity-100 ${selectedBodyPart ? "opacity-0" : ""} transition-all`}>
                    Click a purple circle
                </p>
                <div
                    className={`w-fit h-full group-hover:scale-[450%] ${selectedBodyPart ? "scale-[450%]" : ""} origin-[50%_8%] relative -top-2 transition-all`}>
                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("eye")}
                        location={{ x: 49.7, y: 13.4 }}
                        selected={selectedBodyPart === "eye"}
                    />
                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("eye")}
                        location={{ x: 53.85, y: 13.25 }}
                        selected={selectedBodyPart === "eye"}
                    />

                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("ear")}
                        location={{ x: 43.5, y: 14.7 }}
                        selected={selectedBodyPart === "ear"}
                    />

                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("nose")}
                        location={{ x: 52, y: 13.9 }}
                        selected={selectedBodyPart === "nose"}
                    />

                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("mouth")}
                        location={{ x: 54, y: 15.6 }}
                        selected={selectedBodyPart === "mouth"}
                    />

                    <ClickableBodyPart
                        onClick={() => setSelectedBodyPart("throat")}
                        location={{ x: 50, y: 19 }}
                        selected={selectedBodyPart === "throat"}
                    />
                    <Image src={HumanCartoon} alt="Human cartoon" className="w-full h-full" />
                </div>
            </div>

            {selectedBodyPart && (
                <ExplanationDialog onClose={() => setSelectedBodyPart(null)}>
                    {commonSymptoms[selectedBodyPart as keyof typeof commonSymptoms]}
                </ExplanationDialog>
            )}
        </div>
    )
}

type Props = {
    onClick: any
    location: { x: number; y: number } // in % from top left
    selected: boolean
}

function ClickableBodyPart({ onClick, location, selected }: Props) {
    return (
        <button
            className={`border-[#601872] border-[0.05px] border-solid ${selected ? "bg-[#601872] opacity-60" : ""} hover:bg-[#601872] w-[5px] h-[5px] inline-block absolute top-5 rounded-xl opacity-0 group-hover:opacity-60 transition-all`}
            style={{ top: `${location.y}%`, left: `${location.x}%` }}
            onClick={onClick}
        />
    )
}
