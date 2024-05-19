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
            <PageTemplate.PageName name={"Health"}/>

            <PageTemplate.PageExplanation>
                <p>
                    Hay fever is the common name to describe allergic rhinitis and involves a recurrent runny, stuffy,
                    itchy nose, and frequent sneezing. It can also affect your eyes, sinuses, throat and ears. Like any
                    other allergy, allergic rhinitis is an inappropriate immune system response to an allergen – most
                    commonly house dust mite, pet, pollen and mould. The allergen comes into contact with the sensitive,
                    moist lining in your nose and sinuses and sets off the allergic response.
                </p>
            </PageTemplate.PageExplanation>

            <PageTemplate.HighlightSection title={<h3>Common Symptoms</h3>}>
                <InteractiveBodyDiagram />
            </PageTemplate.HighlightSection>

            <PageTemplate.RemainingPageContent>
                <div className={`bg-purpleone rounded-r-[4rem] mb-4 flex flex-col items-center
                    -ml-pc pl-[calc(theme(spacing.pc)+0.375rem)] pr-pc py-2
                    sm:-ml-pc-sm sm:pl-[calc(theme(spacing.pc-sm)+0.5rem)] sm:pr-pc-sm sm:py-3
                    md:-ml-pc-md md:pl-[calc(theme(spacing.pc-md)+0.75rem)] md:pr-pc-md md:py-4
                    xl:-ml-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md))]
                    xl:pl-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md)+0.75rem)]
                    xl:pr-0
                `}>
                    <h2 className="w-full text-left my-1.5 sm:my-2.5 md:my-4">Managing Symptoms</h2>
                    <div className="bg-purpletwo py-2 sm:py-2.5 md:py-3 px-8 w-1/2 min-w-max rounded-full">
                        <h3 className={`m-0`}>Common Strategies</h3>
                    </div>
                </div>
                <div className="flex gap-x-4 flex-wrap w-full gap-y-12 justify-center">
                    {techniques.map((technique) => {
                        return (
                            <TechniqueCard key={technique.name} image={technique.image} name={technique.name}/>
                        )
                    })}
                </div>
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
