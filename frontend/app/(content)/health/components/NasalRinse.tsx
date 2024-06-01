/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
export default function NasalRinseExplanation() {
    return (
        <>
            <div className="mb-4 gap-4  flex-wrap flex ">
                <div className="flex-1">
                    <h4>Nasal rinse</h4>
                    <p className="text-gray-700 text-sm">also called "sinus rinse" or "nasal irrigation"</p>
                    <br />
                    <p>
                        Nasal irrigation is a personal hygiene practice in which the nasal cavity is washed to flush out
                        mucus and debris from the nose and sinuses, in order to enhance nasal breathing.
                    </p>
                </div>
                <div className="w-48 h-48">
                    <img
                        src="https://img.fruugo.com/product/0/24/416294240_max.jpg"
                        alt="nasal rinse diagram - usefulness"
                        className="object-contain w-full h-full rounded-lg overflow-hidden"
                        width="986"
                        height="994"
                    />
                </div>
            </div>

            <h5 className={"underline underline-offset-2"}>Quick Guides</h5>
            <p>Read through one of the following guides from different sources:</p>
            <ul className="default">
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
