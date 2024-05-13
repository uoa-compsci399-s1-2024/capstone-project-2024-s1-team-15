"use client"

import { PollenCalendar } from "@/app/components/pollen"
import { useEffect, useState } from "react"
import { PollenData } from "@aapc/types"
import { getPollenData } from "@/app/services/pollen"
import PageTemplate from "@/app/components/PageContentTemplate"
import Slider, { Slide } from "@/app/components/Slider"
import pollenTypesSlidesContent from "./pollenTypesSlidesContent.json"
import Privileged from "@/app/components/Privileged"
import { SCOPES } from "@/app/lib/consts"
import ButtonLink from "@/app/components/ButtonLink"

export default function Pollen() {
    const [pollenData, setPollenData] = useState<null | PollenData[]>(null)
    const [selectedSlidePollenName, setSelectedSlidePollenName] = useState(pollenTypesSlidesContent[0].name)
    const [selectedPollenSlideHTML, setSelectedPollenSlideHTML] = useState<string | undefined>(undefined)

    useEffect(() => {
        getPollenData().then((r) => {
            setPollenData(r)
        })
    }, [])

    useEffect(() => {
        setSelectedPollenSlideHTML(
            pollenTypesSlidesContent.find(({ name }) => name === selectedSlidePollenName)?.summaryHTML
        )
    }, [selectedSlidePollenName])

    const pollenSlides = pollenTypesSlidesContent.map(({ name, summaryHTML }) => (
        <Slide key={name} slideContent={summaryHTML}></Slide>
    ))

    return (
        <PageTemplate>
            <PageTemplate.PageName>
                <div className="page-title">Pollen</div>
            </PageTemplate.PageName>
            <PageTemplate.PageExplanation>
                Pollen is a powdery substance produced by most types of flowers of seed plants for the purpose of sexual
                reproduction. It consists of pollen grains, which produce male gametes. There are several different
                types of pollen. The most common include grass, oak and ragweed. For each plant/tree, the shape of the
                pollen can be slightly different and affect the body in different ways.{" "}
            </PageTemplate.PageExplanation>
            <PageTemplate.HighlightSection
                title={
                    <h3>
                        Types of Pollen: <span className="font-semibold text-base">{selectedSlidePollenName}</span>
                    </h3>
                }>
                {selectedSlidePollenName && selectedPollenSlideHTML && (
                    <Slider
                        onSelectedSlideIndexChange={(index: number) =>
                            setSelectedSlidePollenName(pollenTypesSlidesContent[index].name)
                        }
                        slides={pollenSlides}
                    />
                )}
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <h2>Pollen Calendar</h2>
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink href={"/pollen/edit"} text={"Edit Pollen Data"} />
                </Privileged>
                <p>
                    The pollen season starts in spring, with some trees producing pollen earlier depending on climate
                    conditions. The season usually starts earlier in the north and finishes later in the south of New
                    Zealand. Take a look at the pollen calendar below for a better idea of seasonal changes of pollen.
                </p>
                {pollenData && <PollenCalendar pollenData={pollenData} />}
                <p>
                    Become a premium member to access data for 65+ pollen types.
                    <span className="italic text-red-400">NOTE: Do premium members get any additional features?</span>
                </p>
                <button className="button">Go premium</button>
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
