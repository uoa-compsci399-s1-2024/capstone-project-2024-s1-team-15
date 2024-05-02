export type PollenValue = {
    // units for pollen values are: pollen grains per cubic metre of air
    // value=undefined means there is no pollen data for that date
    // value=0 means pollen had 0 pollen grains per cubic metre of air
    date: string
    value: number | undefined
}

export type PollenData = {
    pollenName: string
    pollenScientificName?: string
    pollenValues: PollenValue[]
}
