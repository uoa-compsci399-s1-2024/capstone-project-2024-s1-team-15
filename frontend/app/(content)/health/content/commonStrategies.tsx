import WashingMachineImage from "@/app/public/health/washingMachine.svg"
import DustFurniture from "@/app/public/health/dustFurniture.svg"
import NasalRinseImage from "@/app/public/health/rinseNasalPassages.svg"
import WashHandsImage from "@/app/public/health/washHands.svg"
import ShutWindowsImages from "@/app/public/health/shutWindows.svg"
import AvoidSmokingImage from "@/app/public/health/avoidSmoking.svg"
import RedEyeImage from "@/app/public/health/redeye.png"
import NasalRinseExplanation from "@/app/(content)/health/components/NasalRinse"
import ArtificialTearsExplanation from "@/app/(content)/health/components/ArtificialTears"

const strategies = {
    "Wash bedding regularly": {
        image: WashingMachineImage,
        explanation: null
    },
    "Dust frequently": {
        image: DustFurniture,
        explanation: null
    },
    "Rinse nasal passages": {
        image: NasalRinseImage,
        explanation: <NasalRinseExplanation/>
    },
    "Wash hands after playing with pets": {
        image: WashHandsImage,
        explanation: null
    },
    "Shut windows during pollen season": {
        image: ShutWindowsImages,
        explanation: null
    },
    "Avoid smoke and fragrances": {
        image: AvoidSmokingImage,
        explanation: null
    },
    "Use artificial tears": {
        image: RedEyeImage,
        explanation: <ArtificialTearsExplanation/>
    }
}

export default strategies
