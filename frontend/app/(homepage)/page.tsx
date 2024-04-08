import React from "react";
import Link from "next/link";
import ButtonLink from "@/app/components/ButtonLink";
import { getMetadata } from "@/app/util";

export const metadata = getMetadata()

export default async function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className={"space-y-2"}>
                <ButtonLink href={"/news"} text={"View All News"}/>
                <ButtonLink href={"/news/publish"} text={"Publish News"}/>
                <div className={"h-4 w-12"}></div>
                <ButtonLink href={"/research"} text={"View All Research"}/>
                <ButtonLink href={"/research/publish"} text={"Publish Research"}/>
            </div>
        </div>
    )
}
