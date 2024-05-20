import WashingMachineImage from "./images/washingMachine.svg"
import DustFurniture from "./images/dustFurniture.svg"
import NasalRinseImage from "./images/rinseNasalPassages.svg"
import WashHandsImage from "./images/washHands.svg"
import ShutWindowsImages from "./images/shutWindows.svg"
import AvoidSmokingImage from "./images/avoidSmoking.svg"
import NasalRinseExplanation from "./components/commonStrategies/explanations/NasalRinse"

const strategies = {
    "Wash bedding regularly": {
        image: WashingMachineImage,
        explanation: null,
    },
    "Dust frequently": { image: DustFurniture, explanation: null },
    "Rinse nasal passages": {
        image: NasalRinseImage,
        explanation: NasalRinseExplanation,
    },
    "Wash hands after playing with pets": { image: WashHandsImage, explanation: null },
    "Shut windows during pollen season": { image: ShutWindowsImages, explanation: null },
    "Avoid smoke and fragrances": { image: AvoidSmokingImage, explanation: <>Smoke bad, fragrance bad :)</> },
}

export default strategies
