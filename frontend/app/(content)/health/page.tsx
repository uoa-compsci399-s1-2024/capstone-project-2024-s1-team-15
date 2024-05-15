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
import SourceLink, { LearnMoreLink } from "@/app/components/SourceLink"

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
            <PageTemplate.PageName>Health</PageTemplate.PageName>
            <PageTemplate.PageExplanation>
                Hay fever is the common name to describe allergic rhinitis and involves a recurrent runny, stuffy, itchy
                nose, and frequent sneezing. It can also affect your eyes, sinuses, throat and ears. Like any other
                allergy, allergic rhinitis is an inappropriate immune system response to an allergen - most commonly:
                <ul className="default">
                    <li>
                        house dust mite{" "}
                        <LearnMoreLink sourceUrl="https://www.allergy.org.nz/conditions/environmental-allergies/seed/#:~:text=House%20dust%20mites%20are%20microscopic,that%20causes%20so%20much%20misery." />
                    </li>
                    <li>
                        animal hair <span className="text-gray-600">- do you have pets?</span>
                    </li>
                    <li>mould </li>
                    <li>
                        pollen from grasses, weeds or trees <br />
                        <LearnMoreLink sourceUrl="./pollen" />
                    </li>
                </ul>
                <br />
                The allergen comes into contact with the sensitive, moist lining in your nose and sinuses and sets off
                the allergic response.{" "}
                <SourceLink sourceUrl="https://www.asthmafoundation.org.nz/your-health/other-respiratory-conditions/allergies" />
            </PageTemplate.PageExplanation>
            <PageTemplate.HighlightSection title={<h3>Common Symptoms</h3>}>
                <InteractiveBodyDiagram />
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <div className="bg-purpleone p-4 pl-8 pb-0 rounded-r-[4rem] text-center -ml-4 mb-4 flex flex-col items-center">
                    <h2 className="w-full text-left">Managing Symptoms</h2>
                    <h3 className="bg-purpletwo p-4 w-1/2 rounded-t-[2rem] text-center mb-0">Common Strategies</h3>
                </div>
                <ul className="list-none flex gap-4 flex-wrap w-full gap-y-16">
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
