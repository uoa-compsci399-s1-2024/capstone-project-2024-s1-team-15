/* eslint-disable @next/next/no-img-element */

export default function NasalRinseExplanation() {
    return (
        <>
            <h2 className={"mb-1"}>Nasal rinse</h2>
            <p className="smaller text-gray-600">also called &quot;sinus rinse&quot; or &quot;nasal irrigation&quot;</p>
            <p>
                Nasal irrigation is a personal hygiene practice in which the nasal cavity is washed to flush out
                mucus and debris from the nose and sinuses, in order to enhance nasal breathing.
            </p>
            <div className="w-60 h-60 rounded-xl">
                <img
                    src="https://img.fruugo.com/product/0/24/416294240_max.jpg"
                    alt="nasal rinse diagram - usefulness"
                    className="object-cover w-full h-full overflow-hidden"
                    width="986"
                    height="994"
                />
            </div>
            <h4>Quick Guides</h4>
            <p>Read through one of the following guides from different sources:</p>
            <ul className="marker:text-current">
                <li>
                    <a href="https://www.healthinfo.org.nz/patientinfo/110759.pdf" target="_blank">
                        HealthInfo (healthinfo.org.nz)
                    </a>
                </li>
                <li>
                    <a href="https://www.healthline.com/health/sinus-flush" target="_blank">
                        Healthline (healthline.com)
                    </a>
                </li>
                <li>
                    <a href="https://www.nm.org/-/media/northwestern/resources/patients-and-visitors/patient-education/ear-nose-throat/northwestern-medicine-nasal-saline-irrigation-instructions.pdf">
                        Northwestern Medicine (nm.org)
                    </a>
                </li>
                <li>
                    <a href="https://my.clevelandclinic.org/health/treatments/24286-nasal-irrigation">
                        Cleveland Clinic (clevelandclinic.org)
                    </a>
                </li>
            </ul>
        </>
    )
}
