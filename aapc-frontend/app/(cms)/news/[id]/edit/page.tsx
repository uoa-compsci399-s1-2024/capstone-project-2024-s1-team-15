import React from "react";
import Link from "next/link";

export default function EditNewsPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Editing News {params.id}</h1>
            <Link href={`/research/${params.id}`}>Return</Link>
        </div>
    )
}
