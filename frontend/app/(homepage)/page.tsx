import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className={`space-y-2`}>
                <p>
                    <Link href={'/news/1'}>View News 1</Link><br/>
                    <Link href={'/news/1'}>View News 2</Link><br/>
                    <Link href={'/research/1'}>View Research 1</Link><br/>
                    <Link href={'/research/1'}>View Research 2</Link>
                </p>
                <p>
                    <Link href={'/news/create'}>Add News</Link><br/>
                    <Link href={'/research/create'}>Add Research</Link>
                </p>
            </div>
        </div>
    )
}
