"use client"

import PollenCalendar from "@/app/components/pollenCalendar"
import PageTemplate from "@/app/components/PageContentTemplate"
import { API_URI } from "@/app/consts"
import { useEffect, useState } from "react"
import { PollenData } from "@aapc/types"
import Slider, { Slide } from "@/app/components/Slider"
import pollenTypesSlidesContent from "./pollenTypesSlidesContent.json"

export default function Pollen() {
    const [pollenData, setPollenData] = useState<null | PollenData[]>(null)
    const [selectedSlidePollenName, setSelectedSlidePollenName] = useState(pollenTypesSlidesContent[0].name)
    const [selectedPollenSlideHTML, selectPollenSlideHTML] = useState<string | undefined>(undefined)

    const getPollenData = async () => {
        setPollenData((await (await fetch(API_URI + "/pollen-data", { method: "GET" })).json()) as PollenData[])
    }

    useEffect(() => {
        getPollenData()
    }, [])

    useEffect(() => {
        selectPollenSlideHTML(pollenTypesSlidesContent.find(({ name }) => name == selectedSlidePollenName)?.summaryHTML)
    }, [selectedSlidePollenName])

    const pollenSlides = pollenTypesSlidesContent.map(({ name, summaryHTML }) => (
        <Slide key={name} slideContent={summaryHTML}></Slide>
    ))

    return (
        <main>
            <PageTemplate>
                <PageTemplate.PageName>Pollen</PageTemplate.PageName>
                <PageTemplate.HighlightSection>
                    {selectedSlidePollenName && selectedPollenSlideHTML && (
                        <>
                            <section>
                                <p>
                                    Types of Pollen: <span className="font-bold">{selectedSlidePollenName}</span>
                                </p>
                                <Slider
                                    onSelectedSlideIndexChange={(index: number) =>
                                        setSelectedSlidePollenName(pollenTypesSlidesContent[index].name)
                                    }
                                    slides={pollenSlides}
                                />
                            </section>
                        </>
                    )}
                </PageTemplate.HighlightSection>
                <PageTemplate.RemainingPageContent>
                    <h2>Pollen Calendar</h2>
                    <p>
                        The pollen season starts in spring, with some trees producing pollen earlier depending on
                        climate conditions. The season usually starts earlier in the north and finishes later in the
                        south of New Zealand. Take a look at the pollen calendar below for a better idea of seasonal
                        changes of pollen.
                    </p>
                    {pollenData && <PollenCalendar pollenData={pollenData} />}
                    <p>
                        Become a premium member to access data for 65+ pollen types.
                        <span className="italic text-red-400">
                            NOTE: Do premium members get any additional features?
                        </span>
                    </p>
                    <button className="button">Go premium</button>
                </PageTemplate.RemainingPageContent>
            </PageTemplate>
        </main>
    )
}
