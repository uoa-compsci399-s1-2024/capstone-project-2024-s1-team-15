"use client"

import { PollenCalendar } from "@/app/components/pollen"
import React, { useEffect, useState } from "react"
import { PollenData } from "@aapc/types"
import { getPollenData } from "@/app/services/pollen"
import PageTemplate from "@/app/components/PageContentTemplate"
import Slider, { Slide } from "@/app/components/Slider"
import pollenTypegrass from "./pollenType-grass.json"
import pollenTypetree from "./pollenType-tree.json"
import pollenTypeweed from "./pollenType-weed-herb.json"
import Privileged from "@/app/components/Privileged"
import { SCOPES } from "@/app/lib/consts"
import Link from "next/link"

export default function Pollen() {
    const [pollenData, setPollenData] = useState<null | PollenData[]>(null)
    const [selectedSlidePollenName, setSelectedSlidePollenName] = useState(pollenTypegrass[0].name)
    const [selectedPollenSlideHTML, setSelectedPollenSlideHTML] = useState<string | undefined>(undefined)
    const [pollenType, setPollenType] = useState<"grass" | "tree" | "weed">("grass")
    const [sliderKey, setSliderKey] = useState(0) // To reset the slider component

    useEffect(() => {
        getPollenData().then((r) => {
            setPollenData(r)
        })
    }, [])

    useEffect(() => {
        let pollenArray;
        if (pollenType === "grass") {
            pollenArray = pollenTypegrass;
        } else if (pollenType === "tree") {
            pollenArray = pollenTypetree;
        } else {
            pollenArray = pollenTypeweed;
        }
        setSelectedPollenSlideHTML(
            pollenArray.find(({ name }) => name === selectedSlidePollenName)?.summaryHTML
        )
    }, [selectedSlidePollenName, pollenType])

    const pollenSlides = (pollenArray: { name: string; summaryHTML: string }[]) =>
        pollenArray.map(({ name, summaryHTML }) => (
            <Slide key={name} slideContent={summaryHTML}></Slide>
        ))

    const handleSlideIndexChange = (index: number) => {
        const pollenArray =
            pollenType === "grass" ? pollenTypegrass :
            pollenType === "tree" ? pollenTypetree :
            pollenTypeweed;

        if (index >= 0 && index < pollenArray.length) {
            setSelectedSlidePollenName(pollenArray[index].name);
        }
    }

    const handlePollenTypeChange = (newPollenType: "grass" | "tree" | "weed") => {
        setPollenType(newPollenType);
        const newSelectedName = newPollenType === "grass"
            ? pollenTypegrass[0].name
            : newPollenType === "tree"
            ? pollenTypetree[0].name
            : pollenTypeweed[0].name;
        setSelectedSlidePollenName(newSelectedName);
        setSliderKey(prevKey => prevKey + 1); // Force re-render of the Slider component to reset it
    }

    return (
        <PageTemplate>
            <PageTemplate.PageName>Pollen</PageTemplate.PageName>
            <PageTemplate.PageExplanation>
                Pollen is a powdery substance produced by most types of flowers of seed plants for the purpose of sexual
                reproduction. It consists of pollen grains, which produce male gametes. There are several different
                types of pollen. The most common include grass, oak and ragweed. For each plant/tree, the shape of the
                pollen can be slightly different and affect the body in different ways.
            </PageTemplate.PageExplanation>
            <PageTemplate.HighlightSection
                title={
                    <h3>
                        Types of {
                            <select
                                className="p-2 bg-purpleone rounded-[4rem] text-black font-semibold text-base border-2 border-purple-600 hover:bg-purpletwo transition duration-300 ease-in-out"
                                value={pollenType}
                                onChange={(e) => handlePollenTypeChange(e.target.value as "grass" | "tree" | "weed")}>
                                <option className="p-2" value="grass">Grass</option>
                                <option className="p-2" value="tree">Tree</option>
                                <option className="p-2" value="weed">Weed / Herb</option>
                            </select>
                        } Pollen: <span className="font-semibold text-base">{selectedSlidePollenName}</span>
                    </h3>
                }
            >
                {selectedSlidePollenName && selectedPollenSlideHTML && (
                    <Slider
                        key={sliderKey} // Adding key to reset the Slider component
                        onSelectedSlideIndexChange={handleSlideIndexChange}
                        slides={
                            pollenType === "grass"
                                ? pollenSlides(pollenTypegrass)
                                : pollenType === "tree"
                                ? pollenSlides(pollenTypetree)
                                : pollenSlides(pollenTypeweed)
                        }
                    />
                )}
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <h2>Pollen Calendar</h2>
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <div className="flex gap-2">
                        <Link className="button w-48 cms" href={"/pollen/edit"}>
                            Edit Pollen Data
                        </Link>
                        <Link className="button w-48 cms" href={"/pollen/delete"}>
                            Delete Pollen Data
                        </Link>
                    </div>
                </Privileged>
                <p className="bg-purpleone rounded-r-[4rem] pb-4 pt-8 -mt-8 px-10">
                    The pollen season starts in spring, with some trees producing pollen earlier depending on climate
                    conditions.
                    <br />
                    The season usually starts earlier in the north and finishes later in the south of New Zealand.
                    <br />
                    <br />
                    Take a look at the pollen calendar below for a better idea of seasonal changes of pollen.
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
