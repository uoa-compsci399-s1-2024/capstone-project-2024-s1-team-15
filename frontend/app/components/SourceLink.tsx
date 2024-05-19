// for referencing peices of information to external sources
// e.g. "Decongestant nasal sprays: these may help clear a blocked nose but should not be used for more than a few days at a time" came from: https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/
// so link would be: https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/

import Link from "next/link"

export default function SourceLink({ sourceUrl }: { sourceUrl: string }) {
    return (
        <>
            {" "}
            [
            <a href={sourceUrl} target="_blank">
                Source
            </a>
            ]
        </>
    )
}
export function LearnMoreLink({ sourceUrl }: { sourceUrl: string }) {
    return (
        <>
            {" "}
            [
            <Link href={sourceUrl} target="_blank">
                Learn more
            </Link>
            ]
        </>
    )
}
