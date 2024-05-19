import React, { PropsWithChildren, Children } from "react"

function PageHeroSection({ children }: { children: React.ReactNode }) {
    let pageName = (
        <PageHeroSection.PageName name={"No Title"}/>
    )

    let highlightSection = null

    let remainingPageContent = (
        <PageHeroSection.RemainingPageContent/>
    )

    let pageExplanation = (
        <PageHeroSection.PageExplanation/>
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
                <div className={`bg-primary border-tertiary basis-1/2
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
            <div className={`bg-accent-dark text-center mb-6
                py-1 px-6 rounded-full
                sm:py-2 sm:px-8
                md:p-4 md:rounded-none md:rounded-l-full
            `}>
                {props.title}
            </div>
            <div className={`p-0 md:pr-4`}>
                {props.children}
            </div>
        </>
    )
}

PageHeroSection.RemainingPageContent = function _(props: PropsWithChildren) {
    return <>{props.children}</>
}

export default PageHeroSection
