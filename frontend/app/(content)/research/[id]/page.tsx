import React from "react";
import Link from "next/link";

export default function ResearchPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Viewing Research {params.id}</h1>
            <Link href={`/research/${params.id}/edit`}>Edit</Link>
        </div>
    )
}
