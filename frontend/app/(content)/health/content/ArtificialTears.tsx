import { LearnMoreLink } from "@/app/components/SourceLink"
import Image from "next/image"
import ArtificialTearsExplanationImage from "@/app/public/health/artificialTears.png"

export default function ArtificialTearsExplanation() {
    return (
        <>
            <h2 className={"mb-1"}>Artificial tears</h2>
            <p className={"smaller text-gray-600"}>also called &quot;lubricating eye drops&quot;</p>
            <p>
                These aim to reduce irritation in the eyes caused by allergies. They help flush allergens from
                the eye and also moisten the eyes, which often become dry when red and irritated. They are best
                used for mild symptoms.{" "}
                <LearnMoreLink sourceUrl="https://healthify.nz/medicines-a-z/e/eye-lubricants/" />
            </p>
            <div className="w-60 h-60">
                <Image
                    src={ArtificialTearsExplanationImage}
                    alt="artificial tears diagram"
                    className="object-cover w-full h-full rounded-xl overflow-hidden"
                    width="986"
                    height="994"
                />
            </div>
            <h4>Other types of eye drops</h4>
            <p>
                There are other types of eye drops for allergies besides artificial tears, such as antihistamines, mast
                cell stabilisers, decongestants and steriods.
                <LearnMoreLink sourceUrl="https://healthify.nz/medicines-a-z/e/eye-drops-for-eye-allergies/" /> These
                different medicines have different actions. The choice of eye drops will depend on the severity of your
                symptoms. Some are suitable for short-term relief while others need several weeks of regular treatment
                to be effective.
            </p>
        </>
    )
}
