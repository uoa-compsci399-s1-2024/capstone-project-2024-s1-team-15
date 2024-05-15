"use client"

import { usePathname } from "next/navigation"
import Petal from "./Petal"
import Page from "@/app/type/PageType"
import { PUBLIC_FRONT_END_PAGES as pages } from "@/app/lib/consts"
import { useEffect, useState } from "react"

import { Roboto } from "next/font/google"

const roboto = Roboto({
    weight: "900",
    subsets: ["latin"],
})

const degreesInCircle = 360
const numTimesEachPageShows = 2 //times in flower
const numPages = pages.length

const angleDifference = degreesInCircle / (numTimesEachPageShows * numPages)

const pagesWithAngles: (Page & { angle: number; oppositeAngle: number })[] = pages.map((page, index) => ({
    ...page,
    angle: calculatePetalAngle(index),
    oppositeAngle: calculatePetalAngle(index + pages.length),
}))

/**
 *
 * @param currentPetalAngle is the `petalRotationAngle` in the code below for currently selected petal  & should be between 0 and 360
 * @param newPetalAngle is the `petalRotationAngle` in the code below for the petal that has been selected & should be between 0 and 360
 * @returns the difference in angle between 180 and -180 that the flower should move such that the newPetal is selected
 */
function calculateClosestAngleBetweenPetals(currentPetalAngle: number, newPetalAngle: number): number {
    const angleDifference = newPetalAngle - currentPetalAngle

    // rotate the shortest way
    if (Math.abs(angleDifference) > degreesInCircle / 2) {
        if (angleDifference > 0) {
            return angleDifference - degreesInCircle
        }
        return degreesInCircle + angleDifference
    }

    return angleDifference
}

function calculatePetalAngle(petalIndex: number): number {
    return angleDifference * petalIndex
}

export default function FlowerNav() {
    const [flowerRotationAngle, setFlowerRotationAngle] = useState<number | null>(null)
    const [flowerRotationStyle, setFlowerRotationStyle] = useState<object | null>({})
    const currentPageUrl = usePathname()
    const pageIndexForCurrentUrl = pages.findIndex(({ url }) => url === currentPageUrl)

    const [selectedPetalIndex, setSelectedPetalIndex] = useState(
        pageIndexForCurrentUrl === -1 ? 0 : pageIndexForCurrentUrl
    )
    const [_, setSelectedPetalRotationAngle] = useState<number | null>(null)

    const Petals = pagesWithAngles.map((page, index) => {
        const petalRotationStyle = { "--tw-rotate": `${page.angle}deg` } as React.CSSProperties
        const oppositePetalRotationStyle = {
            "--tw-rotate": `${page.oppositeAngle}deg`,
        } as React.CSSProperties

        return (
            <li key={page.name} className="absolute h-full w-full pointer-events-none" style={{ zIndex: -1 * index }}>
                <div
                    style={petalRotationStyle}
                    onClick={() => setSelectedPetalIndex(index)}
                    className={`absolute top-1/2 origin-right -translate-y-1/2 rotate-0`}>
                    <Petal page={page} selected={page.url === currentPageUrl && selectedPetalIndex === index} />
                </div>
                <div
                    style={oppositePetalRotationStyle}
                    onClick={() => setSelectedPetalIndex(index + pages.length)}
                    className={`absolute top-1/2 origin-right -translate-y-1/2 rotate-0`}>
                    <Petal
                        page={page}
                        selected={page.url === currentPageUrl && selectedPetalIndex === index + pages.length}
                    />
                </div>
            </li>
        )
    })

    useEffect(() => {
        const pageIndexForCurrentUrl = pages.findIndex(({ url }) => url === currentPageUrl)

        if (pageIndexForCurrentUrl === -1) return

        if (selectedPetalIndex % pages.length === pageIndexForCurrentUrl) return

        setSelectedPetalIndex(pageIndexForCurrentUrl === -1 ? 0 : pageIndexForCurrentUrl)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageUrl])

    useEffect(() => {
        setSelectedPetalRotationAngle((previousPetalAngle1) => {
            let previousPetalAngle = previousPetalAngle1
            const petalAngleForNewPage = calculatePetalAngle(selectedPetalIndex)
            if (previousPetalAngle == null) previousPetalAngle = petalAngleForNewPage
            const angleChange = calculateClosestAngleBetweenPetals(previousPetalAngle, petalAngleForNewPage)

            setFlowerRotationAngle((previousFlowerAngle) => {
                const finalAngleOfFlower =
                    previousFlowerAngle != null ? previousFlowerAngle + angleChange : petalAngleForNewPage

                return finalAngleOfFlower
            })

            return petalAngleForNewPage
        })
    }, [selectedPetalIndex])

    useEffect(() => {
        flowerRotationAngle != null &&
            setFlowerRotationStyle({ "--tw-rotate": `${-1 * flowerRotationAngle}deg` } as React.CSSProperties)
    }, [flowerRotationAngle])

    return (
        <>
            {flowerRotationStyle && (
                <nav className="w-[18rem] overflow-hidden ">
                    <div
                        style={flowerRotationStyle}
                        className={`relative w-[32rem] h-[32rem] rotate-0 ${roboto.className} text-[1.8rem] transition-transform duration-[800ms]  ease-figma-gentle list-none p-0 m-0 `}>
                        {Petals}
                    </div>
                </nav>
            )}
        </>
    )
}
