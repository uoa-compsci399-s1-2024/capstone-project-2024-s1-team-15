import { LearnMoreLink } from "@/app/components/SourceLink"
import Image from "next/image"
import ArtificialTearsExplanationImage from "./images/artificialTears.png"

/* eslint-disable react/no-unescaped-entities */
export default function ArtificialTearsExplanation() {
    return (
        <>
            <div className="mb-4 gap-4  flex-wrap flex ">
                <div className="flex-1">
                    <h4>Artificial tears</h4>
                    <p className="text-gray-700 text-sm">also called "lubricating eye drops"</p>
                    <br />
                    <p>
                        These aim to reduce irritation in the eyes caused by allergies. They help flush allergens from
                        the eye and also moisten the eyes, which often become dry when red and irritated. They are best
                        used for mild symptoms.{" "}
                        <LearnMoreLink sourceUrl="https://healthify.nz/medicines-a-z/e/eye-lubricants/" />
                    </p>
                </div>
                <div className="w-48 h-48">
                    <Image
                        src={ArtificialTearsExplanationImage}
                        alt="artificial tears diagram"
                        className="object-contain w-full h-full rounded-lg overflow-hidden"
                        width="986"
                        height="994"
                    />
                </div>
            </div>
            <h5>Other types of eye drops</h5>
            <p>
                There are other types of eye drops for allergies besides artificial tears, such as antihistamines, mast
                cell stabilisers, decongestants and steriods.
                <LearnMoreLink sourceUrl="https://healthify.nz/medicines-a-z/e/eye-drops-for-eye-allergies/" /> These
                different medicines have different actions. The choice of eye drops will depend on the severity of your
                symptoms. Some are suitable for short-term relief while others need several weeks of regular treatment
                to be effective.{" "}
            </p>
        </>
    )
}
