import { FetchOptions, getHeaders } from "@/app/services/lib/util"
import { Nullable } from "@/app/lib/types"
import { PollenData } from "@aapc/types"
import { API_URI } from "@/app/lib/consts"

export async function getPollenData(options?: FetchOptions): Promise<Nullable<PollenData[]>> {
    const response = await fetch(API_URI + `/pollen-data`, {
        method: "get",
        headers: getHeaders(options),
    })
    if (response.status === 404) {
        return null
    }
    return await response.json()
}

export async function createPollenData(pollenDataset: PollenData[], options?: FetchOptions): Promise<Response> {
    return await fetch(`${API_URI}/pollen-data`, {
        method: "post",
        headers: getHeaders(options),
        body: JSON.stringify(pollenDataset),
    })
}

export async function deletePollenData(options?: FetchOptions): Promise<Response> {
    return await fetch(`${API_URI}/pollen-data`, {
        method: "delete",
        headers: getHeaders(options),
    })
}
