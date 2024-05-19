// for referencing pieces of information to external sources
// e.g. "Decongestant nasal sprays: these may help clear a blocked nose but should not be used for more than a few days at a time" came from: https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/
// so link would be: https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/

import Link from "next/link"

export default function SourceLink({ sourceUrl }: { sourceUrl: string }) {
    return (
        <span>
            [
            <Link href={sourceUrl} target="_blank">
                Source
            </Link>
            ]
        </span>
    )
}
export function LearnMoreLink({ sourceUrl }: { sourceUrl: string }) {
    return (
        <span>
            [
            <Link href={sourceUrl} target="_blank">
                Learn more
            </Link>
            ]
        </span>
    )
}
