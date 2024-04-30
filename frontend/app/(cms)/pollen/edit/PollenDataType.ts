export type PollenValue = {
    // key is date and value is the pollen value at that date
    // units for pollen values are: pollen grains per cubic metre of air
    // undefined means there is no pollen data for that date
    date: string;
    value: number | undefined
}

export type PollenData = {
    pollenName: string
    pollenScientificName?: string
    pollenValues: PollenValue[]
}
