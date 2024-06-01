import SourceLink from "@/app/components/SourceLink"
import React from "react"

type Symptom = {
    title: string,
    positions: { x: number, y: number }[],
    content: React.JSX.Element
}

const symptoms: Symptom[] = [
    {
        title: "eye",
        positions: [{ x: 49.7, y: 13.4 }, { x: 53.85, y: 13.25 }],
        content: (
            <>
                <h2>Eyes</h2>
                <p>
                    Common symptoms related to eyes:
                    <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/"/>
                </p>
                <ul className={"marker:text-current"}>
                    <li>Could be itchy, red or watery</li>
                    <li>Dark circles under the eyes</li>
                </ul>
                <p>
                    Allergy-causing substances like pollen and dander may cause dilatation of blood vessels in the
                    conjunctiva, the membrane covering the eye. The resulting reddening of the eyes is called allergic
                    conjunctivitis, and is usually accompanied by itching and tearing.
                    <SourceLink sourceUrl="https://www.mountsinai.org/health-library/diseases-conditions/allergic-conjunctivitis#:~:text=Symptoms%20vary%20in%20severity%20from,accompanied%20by%20itching%20and%20tearing."/>
                </p>
            </>
        )
    },
    {
        title: "ear",
        positions: [{ x: 43.5, y: 14.7 }],
        content: (
            <>
                <h2>Ears</h2>
                <p>
                    Common symptoms related to ears:
                    <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/"/>
                </p>
                <ul className={"marker:text-current"}>
                    <li>frequent earaches</li>
                    <li>fullness in the ear</li>
                    <li>ear infections</li>
                    <li>hearing loss</li>
                </ul>
            </>
        )
    },
    {
        title: "nose",
        positions: [{ x: 52, y: 13.9 }],
        content: (
            <>
                <h2>Nose</h2>
                <p>
                    Common symptoms related to nose:
                    <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/"/>
                </p>
                <ul className={"marker:text-current"}>
                    <li>
                        watery, runny nose or stuffy nose. This can be all the time, or during certain times of the year
                    </li>
                    <li>blocked nose so you have to breathe through the mouth; snoring</li>
                    <li>sneezing a lot, especially in the morning</li>
                    <li>nosebleeds</li>
                    <li>headaches because of pressure from inside the nose</li>
                    <li>nasal voice because of blocked nasal passages</li>
                </ul>
                <p>
                    For some people, exposure to allergens can trigger an immune response (your body&apos;s natural
                    defence system), which leads to swelling and inflammation in the inner lining of the nose
                    (known as rhinitis).
                    <SourceLink sourceUrl="https://www.healthdirect.gov.au/hay-fever"/>
                </p>
            </>
        )
    },
    {
        title: "mouth",
        positions: [{ x: 52.5, y: 15.5 }],
        content: (
            <>
                <h2>Mouth</h2>
                <p>
                    Common symptoms related to mouth:
                    <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/"/>
                </p>
                <ul className={"marker:text-current"}>
                    <li>blocked nose so you have to breathe through the mouth, which leads to snoring</li>
                </ul>
            </>
        )
    },
    {
        title: "throat",
        positions: [{ x: 50, y: 19 }],
        content: (
            <>
                <h2>Throat</h2>
                <p>
                    Common symptoms related to throat:
                    <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/"/>
                </p>
                <ul className={"marker:text-current"}>
                    <li>often having to clear the throat</li>
                    <li>itching in the back of the throat</li>
                </ul>
                <p>
                    Pollen inhalation can provoke allergic reactions, causing throat irritation, itching, and soreness.
                    <br/>
                    This discomfort may escalate to swelling and inflammation in throat tissues. Excessive mucus
                    production
                    can lead to postnasal drip, exacerbating throat irritation and coughing. Pollen exposure can worsen
                    respiratory symptoms in asthma sufferers. Long-term exposure may result in complications such as
                    throat
                    infections.
                </p>
            </>
        )
    },
]

export default symptoms
