"use client"

import React from "react"
import ButtonLink from "@/app/components/ButtonLink"
import { useAuth } from "@/app/lib/hooks";
import { getScopesFromToken } from "@/app/lib/util";
import { SCOPES } from "@/app/lib/consts";

export default function Home() {
    const { token } = useAuth()
    const scopes = getScopesFromToken(token)

    return (
        <div>
            <h1>Home</h1>
            <div className={"space-y-2"}>
                <ButtonLink href={"/news"} text={"View All News"} />
                {scopes && scopes.some(s => SCOPES.maintainer.includes(s)) &&
                    <ButtonLink href={"/news/publish"} text={"Publish News"} />
                }

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/research"} text={"View All Research"} />
                {scopes && scopes.some(s => SCOPES.maintainer.includes(s)) &&
                    <ButtonLink href={"/research/publish"} text={"Publish Research"} />
                }

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/pollen"} text={"View Pollen Data"} />
                {scopes && scopes.some(s => SCOPES.maintainer.includes(s)) &&
                    <ButtonLink href={"/pollen/edit"} text={"Edit Pollen Data"} />
                }

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/about"} text={"About Us"} />
                <ButtonLink href={"/contact"} text={"Contact Us"} />
                <ButtonLink href={"/health"} text={"Health"} />
            </div>
        </div>
    )
}
