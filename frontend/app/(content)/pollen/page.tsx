"use client"

import { PollenCalendar } from "@/app/components/pollen"
import { useEffect, useState } from "react"
import { PollenData } from "@aapc/types"
import { getPollenData } from "@/app/services/pollen"
import PageTemplate from "@/app/components/PageContentTemplate"
import Slider, { Slide } from "@/app/components/Slider"
import pollenTypegrass from "./pollenType-grass.json"
import pollenTypetree from "./pollenType-tree.json"
import pollenTypeweed from "./pollenType-weed-herb.json"
import Privileged from "@/app/components/Privileged"
import { SCOPES } from "@/app/lib/consts"
import ButtonLink from "@/app/components/ButtonLink"

export default function Pollen() {
    const [pollenData, setPollenData] = useState<null | PollenData[]>(null)
    const [selectedSlidePollenNameGrass, setSelectedSlidePollenNameGrass] = useState(pollenTypegrass[0].name)
    const [selectedSlidePollenNameTree, setSelectedSlidePollenNameTree] = useState(pollenTypetree[0].name)
    const [selectedSlidePollenNameWeed, setSelectedSlidePollenNameWeed] = useState(pollenTypeweed[0].name)
    const [selectedPollenSlideHTML, setSelectedPollenSlideHTML] = useState<string | undefined>(undefined)

    useEffect(() => {
        getPollenData().then((r) => {
            setPollenData(r)
        })
    }, [])

    /* Pollen Type Grass */
    useEffect(() => {
        setSelectedPollenSlideHTML(
            pollenTypegrass.find(({ name }) => name === selectedSlidePollenNameGrass)?.summaryHTML
        )
    }, [selectedSlidePollenNameGrass])

    const pollenSlidesGrass = pollenTypegrass.map(({ name, summaryHTML }) => (
        <Slide key={name} slideContent={summaryHTML}></Slide>
    ))

    /* Pollen Type Tree */
    useEffect(() => {
        setSelectedPollenSlideHTML(
            pollenTypetree.find(({ name }) => name === selectedSlidePollenNameTree)?.summaryHTML
        )
    }, [selectedSlidePollenNameTree])

    const pollenSlidesTree = pollenTypetree.map(({ name, summaryHTML }) => (
        <Slide key={name} slideContent={summaryHTML}></Slide>
    ))
    
    /* Pollen Type Weed */
    useEffect(() => {
        setSelectedPollenSlideHTML(
            pollenTypeweed.find(({ name }) => name === selectedSlidePollenNameWeed)?.summaryHTML
        )
    }, [selectedSlidePollenNameWeed])

    const pollenSlidesWeed = pollenTypeweed.map(({ name, summaryHTML }) => (
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
                        Types of Grass Pollen: <span className="font-semibold text-base">{selectedSlidePollenNameGrass}</span>
                    </h3>
                }>
                {selectedSlidePollenNameGrass && selectedPollenSlideHTML && (
                    <Slider
                        onSelectedSlideIndexChange={(index: number) =>
                            setSelectedSlidePollenNameGrass(pollenTypegrass[index].name)
                        }
                        slides={pollenSlidesGrass}
                    />
                )}
                {
                    <h3>
                        Types of Tree Pollen: <span className="font-semibold text-base">{selectedSlidePollenNameTree}</span>
                    </h3>
                }
                {selectedSlidePollenNameTree && selectedPollenSlideHTML && (
                    <Slider
                        onSelectedSlideIndexChange={(index: number) =>
                            setSelectedSlidePollenNameTree(pollenTypetree[index].name)
                        }
                        slides={pollenSlidesTree}
                    />
                )}
                {
                    <h3>
                        Types of Weed Pollen: <span className="font-semibold text-base">{selectedSlidePollenNameWeed}</span>
                    </h3>
                }
                {selectedSlidePollenNameWeed && selectedPollenSlideHTML && (
                    <Slider
                        onSelectedSlideIndexChange={(index: number) =>
                            setSelectedSlidePollenNameWeed(pollenTypeweed[index].name)
                        }
                        slides={pollenSlidesWeed}
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
