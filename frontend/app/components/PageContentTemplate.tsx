import React, { PropsWithChildren, Children } from "react"

function PageHeroSection({ children }: { children: React.ReactNode }) {
    let pageName = (
        <PageHeroSection.PageName name={"No Page Name"}/>
    )

    let highlightSection = null

    let remainingPageContent = (
        <PageHeroSection.RemainingPageContent>
            No Page Content
        </PageHeroSection.RemainingPageContent>
    )

    let pageExplanation = (
        <PageHeroSection.PageExplanation>

        </PageHeroSection.PageExplanation>
    )

    Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return

        if (child.type === PageHeroSection.PageName) {
            return (pageName = child)
        }

        if (child.type === PageHeroSection.PageExplanation) {
            return (pageExplanation = child)
        }

        if (child.type === PageHeroSection.HighlightSection) {
            return (highlightSection = child)
        }

        if (child.type === PageHeroSection.RemainingPageContent) {
            return (remainingPageContent = child)
        }
    })

    return (
        <>
            <section className="flex md:flex-row-reverse flex-col items-start mb-6">
                <div className={`bg-primary border-third basis-1/2
                    border-8 rounded-[30px] p-4
                    sm:border-[12px] sm:rounded-[36px] sm:p-5
                    md:border-20 md:rounded-[42px] md:p-6`}>
                    {pageName}
                    {pageExplanation}
                </div>
                <section className={"basis-1/2 mt-4 sm:mt-8 md:mt-12"}>
                    {highlightSection && highlightSection}
                </section>
            </section>

            {remainingPageContent}
        </>
    )
}

PageHeroSection.PageName = function _(props: { name: string }) {
    return (
        <h1 className="text-white mt-0 mb-2.5 sm:mb-3 md:mb-4">{props.name}</h1>
    )
}

PageHeroSection.PageExplanation = function _(props: PropsWithChildren) {
    return (
        <>{props.children}</>
    )
}

PageHeroSection.HighlightSection = function _(props: PropsWithChildren & { title: string | React.JSX.Element }) {
    return (
        <>
            <div className={`bg-purpletwo text-center mb-6
                p-2 rounded-full
                sm:p-2.5 
                md:p-4 md:rounded-none md:rounded-l-full
            `}>
                {props.title}
            </div>
            <div className={`px-4`}>
                {props.children}
            </div>
        </>
    )
}

PageHeroSection.RemainingPageContent = function rpc(props: PropsWithChildren) {
    return <>{props.children}</>
}

export default PageHeroSection
