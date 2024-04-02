import React from "react";
import Link from "next/link";

export default function EditResearchPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Editing Research {params.id}</h1>
            <Link href={`/research/${params.id}`}>Return</Link>
        </div>
    )
}
