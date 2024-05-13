import React from "react"
import PageTemplate from "@/app/components/PageContentTemplate"

import WashingMachineImage from "./images/washingMachine.svg"
import DustFurniture from "./images/dustFurniture.svg"
import NasalRinseImage from "./images/rinseNasalPassages.svg"
import WashHandsImage from "./images/washHands.svg"
import ShutWindowsImages from "./images/shutWindows.svg"
import AvoidSmokingImage from "./images/avoidSmoking.svg"
import TechniqueCard from "./TechniqueCard"
import InteractiveBodyDiagram from "./InteractiveBodyDiagram"

const techniques = [
    { name: "Wash bedding regularly", image: WashingMachineImage },
    { name: "Dust frequently", image: DustFurniture },
    { name: "Rinse nasal passages", image: NasalRinseImage },
    { name: "Wash hands after playing with pets", image: WashHandsImage },
    { name: "Shut windows during pollen season", image: ShutWindowsImages },
    { name: "Avoid smoke and fragrances", image: AvoidSmokingImage },
]

export default function HealthPage() {
    return (
        <PageTemplate>
            <PageTemplate.PageName>
                <div className="page-title">Health</div>
            </PageTemplate.PageName>
            <PageTemplate.PageExplanation>
                Hay fever is the common name to describe allergic rhinitis and involves a recurrent runny, stuffy, itchy
                nose, and frequent sneezing. It can also affect your eyes, sinuses, throat and ears. Like any other
                allergy, allergic rhinitis is an inappropriate immune system response to an allergen – most commonly
                house dust mite, pet, pollen and mould. The allergen comes into contact with the sensitive, moist lining
                in your nose and sinuses and sets off the allergic response
            </PageTemplate.PageExplanation>
            <PageTemplate.HighlightSection>
                <section className="w-full">
                    <h2 className="w-full ">Common Symptoms</h2>
                    <InteractiveBodyDiagram />
                </section>
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <h2>Managing Symptoms</h2>
                <ul className="list-none flex gap-4">
                    {techniques.map((technique) => {
                        return (
                            <TechniqueCard
                                key={technique.name}
                                image={technique.image}
                                name={technique.name}></TechniqueCard>
                        )
                    })}
                </ul>
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
