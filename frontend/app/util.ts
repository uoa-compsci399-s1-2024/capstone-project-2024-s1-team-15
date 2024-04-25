import { Metadata } from "next"

export function getMetadata(title: string = ""): Metadata {
    const websiteTitle = "Aotearoa Airborne Pollen Collective"
    const t = `${title !== "" ? title + " - " : ""}${websiteTitle}`
    return {
        title: t,
    }
}
