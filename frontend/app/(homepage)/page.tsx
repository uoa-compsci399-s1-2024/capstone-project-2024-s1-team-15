import React from "react";
import Link from "next/link";
import ButtonLink from "@/app/components/ButtonLink";

export default async function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className={"space-y-2"}>
                <ButtonLink href={"/news"} text={"View All News"}/>
                <ButtonLink href={"/research"} text={"View All Research"}/>
            </div>
        </div>
    )
}
