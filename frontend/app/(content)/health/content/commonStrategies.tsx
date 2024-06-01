import WashingMachineImage from "@/app/public/health/washingMachine.svg"
import DustFurniture from "@/app/public/health/dustFurniture.svg"
import NasalRinseImage from "@/app/public/health/rinseNasalPassages.svg"
import WashHandsImage from "@/app/public/health/washHands.svg"
import ShutWindowsImages from "@/app/public/health/shutWindows.svg"
import AvoidSmokingImage from "@/app/public/health/avoidSmoking.svg"
import RedEyeImage from "@/app/public/health/redeye.png"
import NasalRinseExplanation from "@/app/(content)/health/content/NasalRinse"
import ArtificialTearsExplanation from "@/app/(content)/health/content/ArtificialTears"
import { Nullable } from "@/app/lib/types"
import React from "react"
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Strategy = {
    title: string
    dialogContent: Nullable<React.JSX.Element>
    image: StaticImport
}

const strategies: Strategy[] = [
    {
        title: "Wash bedding regularly",
        image: WashingMachineImage,
        dialogContent: null
    },
    {
        title: "Dust frequently",
        image: DustFurniture,
        dialogContent: null
    },
    {
        title: "Rinse nasal passages",
        image: NasalRinseImage,
        dialogContent: <NasalRinseExplanation/>
    },
    {
        title: "Wash hands after playing with pets",
        image: WashHandsImage,
        dialogContent: null
    },
    {
        title: "Shut windows during pollen season",
        image: ShutWindowsImages,
        dialogContent: null
    },
    {
        title: "Avoid smoke and fragrances",
        image: AvoidSmokingImage,
        dialogContent: null
    },
    {
        title: "Use artificial tears",
        image: RedEyeImage,
        dialogContent: <ArtificialTearsExplanation/>
    },
]

export default strategies
