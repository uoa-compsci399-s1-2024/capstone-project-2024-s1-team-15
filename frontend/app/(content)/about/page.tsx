import React from "react"
import Image from "next/image"

import amy from "./images/researchers/amy.jpeg"
import katherine from "./images/researchers/katherine.jpeg"
import stuti from "./images/researchers/stuti.jpeg"
import stutiHeaderImage from "./images/researchers/stutiHeaderImage.jpg"
import katherineHeaderImage from "./images/researchers/katHeaderImage.jpg"
import amyHeaderImage from "./images/researchers/amyHeaderImage.jpeg"

import teamPicture from "./images/Team AWMM roof.jpeg"

import aucklandMuseumLogo from "./images/organisations/aucklandMuseum.png"
import allergyNZLogo from "./images/organisations/allergyNZ.png"
import masseyLogo from "./images/organisations/masseyUniversity.png"
import victoriaLogo from "./images/organisations/victoriaUniversityOfWellington.png"
import uoaLogo from "./images/organisations/universityOfAuckland.png"

export default function About() {
    return (
        <>
            <h1 className="page-title mb-8">About Us</h1>
            <div className="about-page max-w-screen-xl mx-auto">
                <p>
                    Aotearoa Airborne Pollen Collaborative (AAPC) is a research collaboration between researchers at the
                    University of Auckland Medical School, Victoria University of Wellington, and Massey University.
                    AAPC has its beginnings in 2022, when overlapping research interests brought Associate Professor Amy
                    Chan, Associate Professor Stuti Misra, Professor Rewi Newnham and Dr Kat Holt together in a Zoom
                    room.
                </p>

                <h2>Meet the Researchers!</h2>

                <section className="flex flex-wrap gap-2 pt-4">
                    <ProfileCard
                        name="Amy Chan"
                        email="a.chan@aucklanduni.ac.nz"
                        bio=<>
                            Dr Amy Chan is a senior clinical research fellow at the School of Pharmacy, University of
                            Auckland, New Zealand, and holds an honorary post at the Centre of Behavioural Medicine,
                            University College London. She is a clinical pharmacist academic and is currently in a
                            joint-appointment between the University and Auckland District Health Board.
                        </>
                        profilePicture={amy}
                        headerImage={amyHeaderImage}
                    />

                    <ProfileCard
                        name="Katherine Holt"
                        email="k.holt@massey.ac.nz"
                        bio=<>
                            My research centres on using pollen to understand the environment in the past. Through
                            extracting pollen preserved in ancient sediments, it is possible to work out what the
                            vegetation once was and how it has changed in response to events like natural disasters,
                            climate change and human impacts.
                            <br />
                            <br /> I am also interested in determining how recent environmental changes are impacting
                            the pollen types that are present in the air at different times of the year. This is very
                            important for helping those suffering from hay fever and other-pollen related conditions
                            manage their symptoms, and what drives my involvement in AAPC.
                        </>
                        profilePicture={katherine}
                        headerImage={katherineHeaderImage}
                    />

                    <ProfileCard
                        name="Stuti Misra"
                        email="s.misra@auckland.ac.nz"
                        bio=<>
                            Associate Professor Stuti Misra is an optometrist-scientist in the Department of
                            Ophthalmology at the University of Auckland. She specialises in ocular surface disorders,
                            ocular imaging, tear film and dry eye assessment, and community eye health. <br />
                            <br />
                            Recently, she collaborated with Australian researchers on a project investigating the
                            effects of seasonal and geographic variations on the ocular surface, which sparked her
                            interest in the relationship between climate change and eye health. Her work with the AAPC
                            is centred on understanding the impact of climate change and pollen on ocular health.
                        </>
                        profilePicture={stuti}
                        headerImage={stutiHeaderImage}
                    />
                </section>

                <div className="py-14">
                    <div className="flex items-center mb-8">
                        <div className="flex-1">
                            <h2>Our Story</h2>
                            <p className="">
                                AAPC has its beginnings in 2022, when overlapping research interests brought Associate
                                Professor Amy Chan, Associate Professor Stuti Misra, Professor Rewi Newnham and Dr Kat
                                Holt together in a Zoom room. Stuti and Amy were seeking data on airborne pollen levels
                                as part of their research, while Rewi and Kat were focused on a long-standing goal to
                                establish airborne pollen monitoring in New Zealand.
                            </p>
                        </div>

                        <figure className="flex-1 h-96">
                            <Image src={teamPicture} alt="" className="object-contain w-full h-full" />
                            <figcaption>Team AWMM on Auckland Museum Roof</figcaption>
                        </figure>
                    </div>

                    <p>
                        Our shared interest in generating modern airborne pollen data resulted in a collaboration to
                        install an airborne pollen sampler on the roof of the Auckland War Memorial Museum and collect
                        pollen data for one year. This was made possible by the generous cooperation of the AWWM Botany
                        team and operations staff. Amy was able to support this work through her Auckland Medical
                        Research Foundation fellowship, and the University of Auckland PhD Student Laura McDonald (Kai
                        Tahu) was coopted to undertake the pollen counting work, with sisters and fellow UoA students
                        Natasha and Calista Ngadi assisting in operating the airborne sampler.
                    </p>

                    <h2>Our Aims</h2>
                    <h4>Health</h4>
                    <p>
                        AAPC’s aim is to better understand how airborne pollen levels vary through time and what the
                        implications are for sufferers of eye conditions and allergic respiratory diseases. By building
                        a long-term record of pollen variation through the year, our health researchers will be able to
                        look for relationships between pollen levels and occurrences of eye and respiratory conditions
                        to better understand causative relationships. Knowing which pollen is connected with periods of
                        increased symptoms and when helps to inform diagnoses and treatments for patients.
                        <br />
                        <br />
                    </p>
                    <h4>Climate Change</h4>
                    <p>
                        Furthermore, building a picture of the long-term variation in pollen levels can help us
                        understand how environmental processes like climate variability and climate change might impact
                        pollen levels in the future. This will, in turn, help decision-makers plan to ensure that the
                        health system has the capacity to deal with changes in pollen-related conditions in the future.
                        This contributes to making our communities more resilient in the face of climate change.
                        <br />
                        <br />
                    </p>

                    <h4>Auckland</h4>
                    <p>
                        We are focussing on Tamaki Makaurau as it is our most populous city and has a high concentration
                        of people who suffer from hay fever and other respiratory and ophthalmologic conditions. But it
                        is our hope to eventually be able to expand our work to other centres in Aotearoa.
                    </p>

                    <h2>Academic Organisations</h2>
                    <p>
                        These organisations are backing AAPC and are providing the tools, technologies and support to
                        continue research into pollen.
                    </p>

                    <ul className="mt-6 flex gap-6 flex-wrap items-center justify-center ">
                        <OrganisationImage
                            name="Auckland Museum"
                            websiteLink="https://www.aucklandmuseum.com/"
                            logoImage={aucklandMuseumLogo}
                        />

                        <OrganisationImage
                            name="Allergy NZ"
                            websiteLink="https://www.allergy.org.nz/"
                            logoImage={allergyNZLogo}
                        />

                        <OrganisationImage
                            name="Victoria University of Wellington"
                            websiteLink="https://www.wgtn.ac.nz/"
                            logoImage={victoriaLogo}
                        />

                        <OrganisationImage
                            name="Massey University"
                            websiteLink="https://www.massey.ac.nz/"
                            logoImage={masseyLogo}
                        />

                        <OrganisationImage
                            name="University of Auckland"
                            websiteLink="https://www.auckland.ac.nz/en.html"
                            logoImage={uoaLogo}
                        />
                    </ul>
                </div>
            </div>
        </>
    )
}

function OrganisationImage({ name, websiteLink, logoImage }: any) {
    return (
        <li className="h-full">
            <a className="inline-block" href={websiteLink} target="_blank">
                <Image src={logoImage} alt={name + " Logo"} className="w-full h-full object-cover" />
            </a>
        </li>
    )
}

function ProfileCard({ name, email, bio, headerImage, profilePicture }: any) {
    return (
        <article className="mx-4 p-4 min-w-56 flex-1 relative z-0 shadow-lg border rounded-md duration-300 hover:shadow-sm bg-white">
            <div className="flex-none mx-auto h-48 w-48 rounded-full overflow-hidden">
                <Image src={profilePicture} className="w-full h-full  object-cover" alt={`${name}'s Profile Picture`} />
            </div>

            <div className="mt-4">
                <span className="block text-gray-900 text-lg">{name}</span>
                <a href={`mailto:${email}`} className="">
                    <span className="inline-block text-gray-400 text-sm">{email}</span>
                </a>
                <h3 className="text-xl text-gray-900">About Me</h3>
                <p className="text-gray-600 text-sm mt-1">{bio}</p>
            </div>
            <Image
                src={headerImage || stutiHeaderImage}
                alt={`${name}'s Background Image`}
                className="object-cover w-full h-full top-0 left-0 -z-10 opacity-15 blur-[3px] absolute"
            />
        </article>
    )
}
