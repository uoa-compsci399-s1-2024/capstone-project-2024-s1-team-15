"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { PollenData } from "@aapc/types"

import { DEFAULT_FORM_DIALOG_DURATION, SCOPES } from "@/app/lib/consts"
import icons from "@/app/lib/icons"
import { deletePollenData, getPollenData } from "@/app/services/pollen"
import PageTemplate from "@/app/components/PageContentTemplate"
import Slider, { Slide } from "@/app/components/slider/Slider"
import PollenCalendar from "@/app/components/PollenCalendar"
import ButtonLink from "@/app/components/ButtonLink"
import Privileged from "@/app/components/Privileged"

import pollenTypegrass from "./pollenType-grass.json"
import pollenTypetree from "./pollenType-tree.json"
import pollenTypeweed from "./pollenType-weed-herb.json"
import ImageSlider from "./components/ImageSlider"
import pollenImages from "./components/PollenImages"
import ConfirmModal from "@/app/components/modals/ConfirmModal"
import Button from "@/app/components/Button"
import { Nullable } from "@/app/lib/types"
import { ModalRef } from "@/app/lib/hooks/useModal"
import { useAuth } from "@/app/lib/hooks"

type PollenType = {
    name: string
    scientificName?: string
    summaryHTML: string
}

export default function Pollen() {
    const { token } = useAuth()

    const [pollenData, setPollenData] = useState<null | PollenData[]>(null)
    const [selectedSlidePollen, setSelectedSlidePollen] = useState<PollenType>(pollenTypegrass[0])
    const [selectedPollenSlideHTML, setSelectedPollenSlideHTML] = useState<string | undefined>(undefined)
    const [pollenType, setPollenType] = useState<"grass" | "tree" | "weed">("grass")
    const [sliderKey, setSliderKey] = useState(0) // To reset the slider component

    const deleteConfirmModalRef = useRef<ModalRef>(null)
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const [deleteErrorMessage, setDeleteErrorMessage] = useState<Nullable<string>>(null)
    const [_, setCurrentTimeout] = useState<Nullable<NodeJS.Timeout>>(null)

    useEffect(() => {
        setPollenDataFromDB()
    }, [])

    useEffect(() => {
        let pollenArray
        if (pollenType === "grass") {
            pollenArray = pollenTypegrass
        } else if (pollenType === "tree") {
            pollenArray = pollenTypetree
        } else {
            pollenArray = pollenTypeweed
        }
        setSelectedPollenSlideHTML(pollenArray.find(({ name }) => name === selectedSlidePollen.name)?.summaryHTML)
    }, [selectedSlidePollen, pollenType])

    const pollenSlides = (pollenArray: PollenType[]) =>
        pollenArray.map(({ name, summaryHTML }) => <Slide key={name} slideContent={summaryHTML}></Slide>)

    const setPollenDataFromDB = () => {
        getPollenData().then((r) => {
            setPollenData(r)
        })
    }

    const handleSlideIndexChange = (index: number) => {
        const pollenArray =
            pollenType === "grass" ? pollenTypegrass : pollenType === "tree" ? pollenTypetree : pollenTypeweed

        if (index >= 0 && index < pollenArray.length) {
            setSelectedSlidePollen(pollenArray[index])
        }
    }

    const handlePollenTypeChange = (newPollenType: "grass" | "tree" | "weed") => {
        setPollenType(newPollenType)
        const newSelectedPollen =
            newPollenType === "grass"
                ? pollenTypegrass[0]
                : newPollenType === "tree"
                  ? pollenTypetree[0]
                  : pollenTypeweed[0]
        setSelectedSlidePollen(newSelectedPollen)
        setSliderKey((prevKey) => prevKey + 1) // Force re-render of the Slider component to reset it
    }

    const handleDeletePollenData = () => {
        deletePollenData({ token }).then(r => {
            if (r.success) {
                setDeleteSuccess(true)
                setDeleteErrorMessage(null)
                setPollenDataFromDB()
                setCurrentTimeout(e => {
                    if (e) clearTimeout(e)
                    return setTimeout(
                        () => setDeleteSuccess(false),
                        DEFAULT_FORM_DIALOG_DURATION
                    )
                })
            } else {
                setDeleteErrorMessage(r.message)
            }
        })
    }

    return (
        <PageTemplate>
            <PageTemplate.PageName name={"Pollen"} />
            <PageTemplate.PageExplanation>
                <div className={"prose"}>
                    <p>
                        Pollen is a powdery substance produced by most types of flowers of seed plants for the purpose of
                        sexual reproduction. It consists of pollen grains, which produce male gametes. There are several
                        different types of pollen. The most common include grass, oak and ragweed. For each plant/tree, the
                        shape of the pollen can be slightly different and affect the body in different ways.
                    </p>
                </div>
            </PageTemplate.PageExplanation>
            <PageTemplate.HighlightSection
                title={
                    <>
                        <h3>
                            <span className="font-semibold text-base">
                                Types of
                                <select
                                    className="bg-gray-100 border border-gray-300 rounded-lg p-1 mx-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={pollenType}
                                    onChange={(e) =>
                                        handlePollenTypeChange(e.target.value as "grass" | "tree" | "weed")
                                    }>
                                    <option value="grass">Grass</option>
                                    <option value="tree">Tree</option>
                                    <option value="weed">Weed / Herb</option>
                                </select>
                                Pollen
                            </span>
                        </h3>
                        <h3 className="flex flex-col">
                            <span>{selectedSlidePollen.name}</span>

                            {selectedSlidePollen.scientificName && (
                                <span className="text-gray-500 text-[0.6rem] leading-3 top-full  font-normal w-full text-center">
                                    Scientific name: {selectedSlidePollen.scientificName}
                                </span>
                            )}
                        </h3>
                    </>
                }>
                {selectedSlidePollen && selectedPollenSlideHTML && (
                    <>
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

                        {/* images */}
                        {Object.entries(pollenImages).map(([pollenType, images]) => (
                            <ImageSlider
                                key={pollenType}
                                selected={selectedSlidePollen.name === pollenType}
                                img1={images[0]}
                                img2={images[1]}
                            />
                        ))}
                    </>
                )}
            </PageTemplate.HighlightSection>
            <PageTemplate.RemainingPageContent>
                <h2 className={"mt-16 drop-shadow-lg"}>Pollen Calendar</h2>
                <p
                    className={`bg-accent-light pb-4 pt-8 prose max-w-max
                    -ml-pc pl-[calc(theme(spacing.pc)+0.625rem)] pr-pc -mt-8 rounded-r-[2rem]
                    sm:-ml-pc-sm sm:pl-[calc(theme(spacing.pc-sm)+0.75rem)] sm:pr-pc-sm sm:-mt-9 sm:rounded-r-[3rem]
                    md:-ml-pc-md md:pl-[calc(theme(spacing.pc-md)+0.875rem)] md:pr-pc-md md:-mt-10 md:rounded-r-[4rem]
                    xl:-ml-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md))]
                    xl:pl-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md)+0.875rem)]
                `}>
                    The pollen season starts in spring, with some trees producing pollen earlier depending on climate
                    conditions. The season usually starts earlier in the north and finishes later in the south of New
                    Zealand.
                    <br />
                    <br />
                    Take a look at the pollen calendar below for a better idea of seasonal changes of pollen.
                </p>
                {pollenData && <PollenCalendar pollenData={pollenData} />}
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <div className="flex flex-wrap gap-x-4 gap-y- 2 my-4">
                        <ButtonLink theme={"cms"} href={"/pollen/edit"} text={"Update Pollen Data"} icon={icons.edit}/>
                        <Button theme={"cms-red"} text={"Delete All Pollen Data"} icon={icons.trash} onClick={() => {
                            deleteConfirmModalRef.current && deleteConfirmModalRef.current.showModal()
                        }}/>
                        <ConfirmModal
                            id={"delete-pollen-data"}
                            ref={deleteConfirmModalRef}
                            onConfirm={() => {
                                handleDeletePollenData()
                            }}
                            buttonText={"Delete All Pollen Data"}
                            buttonIcon={icons.trash}
                        >
                            <p className={"text-white"}>
                                Are you sure you want to delete <b className={"font-medium"}>all</b> pollen data?
                            </p>
                        </ConfirmModal>
                    </div>
                    {deleteSuccess &&
                        <p className={"form-success"}>All pollen data has been deleted.</p>
                    }
                    {deleteErrorMessage &&
                        <p className={"form-error"}>{deleteErrorMessage}</p>
                    }
                </Privileged>
                <p className="mt-4">
                    If you want access to all available pollen data, please send us a message via the{" "}
                    <Link href="/contact" target="_blank">
                        contact form
                    </Link>
                    .
                </p>
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
