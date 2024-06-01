import WashingMachineImage from "../../../public/health/washingMachine.svg"
import DustFurniture from "../../../public/health/dustFurniture.svg"
import NasalRinseImage from "../../../public/health/rinseNasalPassages.svg"
import WashHandsImage from "../../../public/health/washHands.svg"
import ShutWindowsImages from "../../../public/health/shutWindows.svg"
import AvoidSmokingImage from "../../../public/health/avoidSmoking.svg"
import NasalRinseExplanation from "@/app/(content)/health/components/NasalRinse"
import RedEyeImage from "../../../public/health/redeye.svg"
import ArtificialTearsExplanation from "@/app/(content)/health/components/ArtificialTears"

const strategies = {
    "Wash bedding regularly": {
        image: WashingMachineImage,
        explanation: null,
    },
    "Dust frequently": { image: DustFurniture, explanation: null },
    "Rinse nasal passages": {
        image: NasalRinseImage,
        explanation: <NasalRinseExplanation />,
    },
    "Wash hands after playing with pets": { image: WashHandsImage, explanation: null },
    "Shut windows during pollen season": { image: ShutWindowsImages, explanation: null },
    "Avoid smoke and fragrances": { image: AvoidSmokingImage, explanation: null },
    "Use artificial tears": { image: RedEyeImage, explanation: <ArtificialTearsExplanation /> },
}

export default strategies
