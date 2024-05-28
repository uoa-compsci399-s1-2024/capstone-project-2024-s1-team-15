"use server"

import { revalidateTag } from "next/cache"

export async function revalidateNews() {
    revalidateTag("news")
}

export async function revalidateResearch() {
    revalidateTag("research")
}
