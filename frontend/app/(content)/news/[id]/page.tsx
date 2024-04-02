import React from "react";
import Link from "next/link";

export default function NewsPage({ params }: { params: { id: number } }) {
    return (
        <div>
            <h1>Viewing News {params.id}</h1>
            <Link href={`/news/${params.id}/edit`}>Edit</Link>
        </div>
    )
}
