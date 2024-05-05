import React from "react"
import ButtonLink from "@/app/components/ButtonLink"
import { SCOPES } from "@/app/lib/consts"
import Privileged from "@/app/components/Privileged"

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className={"space-y-2"}>
                <ButtonLink href={"/news"} text={"View All News"} />
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink href={"/news/publish"} text={"Publish News"}/>
                </Privileged>

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/research"} text={"View All Research"} />
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink href={"/research/publish"} text={"Publish Research"} />
                </Privileged>

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/pollen"} text={"View Pollen Data"} />
                <Privileged requiredScopes={SCOPES.maintainer}>
                    <ButtonLink href={"/pollen/edit"} text={"Edit Pollen Data"} />
                </Privileged>

                <br className={"h-4 w-12"} />

                <ButtonLink href={"/about"} text={"About Us"} />
                <ButtonLink href={"/contact"} text={"Contact Us"} />
                <ButtonLink href={"/health"} text={"Health"} />
            </div>
        </div>
    )
}
