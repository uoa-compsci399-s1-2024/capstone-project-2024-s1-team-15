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
            <section className="flex flex-row-reverse items-start mb-6">
                <div className="bg-primary p-6 border-20 border-third rounded-[42px] basis-1/2">
                    {pageName}
                    {pageExplanation}
                </div>
                <section className={"basis-1/2 mt-12"}>
                    {highlightSection && highlightSection}
                </section>
            </section>

            {remainingPageContent}
        </>
    )
}

PageHeroSection.PageName = function _(props: { name: string }) {
    return (
        <h1 className="text-white mt-0 mb-4">{props.name}</h1>
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
            <div className="bg-purpletwo p-4 rounded-l-full text-center mb-6">{props.title}</div>
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
