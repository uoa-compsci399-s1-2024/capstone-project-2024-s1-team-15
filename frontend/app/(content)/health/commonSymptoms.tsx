import SourceLink from "@/app/components/SourceLink"

const symptoms = {
    eye: (
        <>
            <h4 className="flex justify-between">
                Eyes <span className="text-4xl">👀</span>
            </h4>
            <p>
                Common symptoms related to eyes:
                <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/" />
            </p>

            <ul className="default">
                <li>Could be itchy, red or watery</li>
                <li>Dark circles under the eyes</li>
            </ul>
            <br />
            <p>
                Allergy-causing substances like pollen and dander may cause dilatation of blood vessels in the
                conjunctiva, the membrane covering the eye. The resulting reddening of the eyes is called allergic
                conjunctivitis, and is usually accompanied by itching and tearing.
                <SourceLink sourceUrl="https://www.mountsinai.org/health-library/diseases-conditions/allergic-conjunctivitis#:~:text=Symptoms%20vary%20in%20severity%20from,accompanied%20by%20itching%20and%20tearing." />
            </p>
        </>
    ),

    ear: (
        <>
            <h4 className="flex justify-between">
                Ears<span className="4xl">👂</span>
            </h4>

            <p>
                Common symptoms related to ears:
                <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/" />
            </p>
            <ul className="default">
                <li>frequent earaches</li>
                <li>fullness in the ear</li>
                <li>ear infections</li>
                <li>hearing loss</li>
            </ul>
            <br />
        </>
    ),

    nose: (
        <>
            <h4 className="flex justify-between">
                Nose <span className="text-4xl">👃</span>
            </h4>
            <p>
                Common symptoms related to nose:
                <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/" />
            </p>
            <ul className="default">
                <li>
                    watery, runny nose or stuffy nose. <br />
                    This can be all the time, or during certain times of the year
                </li>
                <li>blocked nose so you have to breathe through the mouth; snoring</li>
                <li>sneezing a lot, especially in the morning</li>
                <li>nosebleeds</li>
                <li>headaches because of pressure from inside the nose</li>
                <li>nasal voice because of blocked nasal passages</li>
            </ul>
            <br />
            <p>
                For some people, exposure to allergens can trigger an immune response (your body&apos;s natural defence
                system), which leads to swelling and inflammation in the inner lining of the nose (known as rhinitis).
                <SourceLink sourceUrl="https://www.healthdirect.gov.au/hay-fever" />
            </p>
        </>
    ),

    mouth: (
        <>
            <h4 className="flex justify-between">
                Mouth <span className="text-4xl">😮</span>
            </h4>
            <p>
                Common symptoms related to mouth:
                <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/" />
            </p>
            <ul className="default">
                <li>blocked nose so you have to breathe through the mouth; snoring</li>
            </ul>
            <br />
        </>
    ),

    throat: (
        <>
            <h4>Throat</h4>
            <p>
                Common symptoms related to throat:
                <SourceLink sourceUrl="https://www.allergy.org.nz/conditions/allergy-conditions/hay-fever/" />
            </p>

            <ul className="default">
                <li>often having to clear the throat</li>
                <li>itching in the back of the throat</li>
            </ul>
            <br />
            <p>
                Pollen inhalation can provoke allergic reactions, causing throat irritation, itching, and soreness.
                <br />
                This discomfort may escalate to swelling and inflammation in throat tissues. Excessive mucus production
                can lead to postnasal drip, exacerbating throat irritation and coughing. Pollen exposure can worsen
                respiratory symptoms in asthma sufferers. Long-term exposure may result in complications such as throat
                infections.
            </p>
        </>
    ),
}

export default symptoms
