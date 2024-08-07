"use client"

import React from "react"
import PageTemplate from "@/app/components/PageContentTemplate"

import StrategyCard from "@/app/(content)/health/components/StrategyCard"
import InteractiveBodyDiagram from "./components/InteractiveBodyDiagram"
import SourceLink, { LearnMoreLink } from "@/app/components/SourceLink"
import strategies from "@/app/(content)/health/content/commonStrategies"

export default function HealthPage() {
    return (
        <PageTemplate>
            <PageTemplate.PageName name={"Health"} />
            <PageTemplate.PageExplanation>
                <div className={"prose"}>
                    <p>
                        Hay fever is the common name to describe allergic rhinitis and involves a recurrent runny,
                        stuffy, itchy nose, and frequent sneezing. It can also affect your eyes, sinuses, throat and
                        ears. Like any other allergy, allergic rhinitis is an inappropriate immune system response to an
                        allergen - most commonly:
                    </p>
                    <ul className={"marker:text-current"}>
                        <li>
                            <p>
                                house dust mite
                                <LearnMoreLink sourceUrl="https://www.allergy.org.nz/conditions/environmental-allergies/seed/#:~:text=House%20dust%20mites%20are%20microscopic,that%20causes%20so%20much%20misery." />
                            </p>
                        </li>
                        <li>
                            <p>
                                animal hair - do you have pets?
                            </p>
                        </li>
                        <li>
                            <p>
                                mould
                            </p>
                        </li>
                        <li>
                            <p>
                                pollen from grasses, weeds or trees
                                <LearnMoreLink sourceUrl="./pollen" />
                            </p>
                        </li>
                    </ul>
                    <p>
                        The allergen comes into contact with the sensitive, moist lining in your nose and sinuses and
                        sets off the allergic response.{" "}
                    </p>
                    <SourceLink sourceUrl="https://www.asthmafoundation.org.nz/your-health/other-respiratory-conditions/allergies" />
                </div>
            </PageTemplate.PageExplanation>

            <PageTemplate.HighlightSection title={<h3>Common Symptoms</h3>}>
                <InteractiveBodyDiagram />
            </PageTemplate.HighlightSection>

            <PageTemplate.RemainingPageContent>
                <div
                    className={`bg-accent-light rounded-r-[4rem] mb-4 flex flex-col items-center
                    -ml-pc pl-[calc(theme(spacing.pc)+0.375rem)] pr-pc py-2
                    sm:-ml-pc-sm sm:pl-[calc(theme(spacing.pc-sm)+0.5rem)] sm:pr-pc-sm sm:py-3
                    md:-ml-pc-md md:pl-[calc(theme(spacing.pc-md)+0.75rem)] md:pr-pc-md md:py-4
                    xl:-ml-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md))]
                    xl:pl-[calc(100vw-theme(spacing.content-max)-theme(spacing.nav)+theme(spacing.pc-md)+0.75rem)]
                    xl:pr-0
                `}>
                    <h2 className="w-full text-left my-1.5 sm:my-2.5 md:my-4">Managing Symptoms</h2>
                    <div className="bg-accent-dark py-2 sm:py-2.5 md:py-3 px-8 w-1/2 min-w-max rounded-full">
                        <h3 className={`m-0 text-center`}>Common Strategies</h3>
                    </div>
                </div>
                <div className="flex gap-x-4 flex-wrap w-full gap-y-16 justify-center">
                    {strategies.map(s => (
                        <StrategyCard strategy={s} key={s.title}/>
                    ))}
                </div>

                <p className="mt-8">
                    For more in-depth tips on dealing with Hayfever, take a look at this article:{" "}
                    <a
                        href="https://www.auckland.ac.nz/en/news/2023/11/06/seven-tips-amy-chan-allergies.html"
                        target="_blank">
                        Seven tips to combat seasonal allergies
                    </a>
                    .
                </p>
            </PageTemplate.RemainingPageContent>
        </PageTemplate>
    )
}
