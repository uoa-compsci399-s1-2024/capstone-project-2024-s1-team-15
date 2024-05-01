import { Metadata } from "next"
import { WEBSITE_NAME } from "@/app/consts"

export function getMetadata(title: string = ""): Metadata {
    const t = `${title !== "" ? title + " - " : ""}${WEBSITE_NAME}`
    return {
        title: t,
    }
}
