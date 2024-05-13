import React, { PropsWithChildren, Children } from "react"

function PageHeroSection({ children }: { children: React.ReactNode }) {
    let pageName = <PageHeroSection.PageName>No page name</PageHeroSection.PageName>,
        highlightSection = null
    let remainingPageContent = (
        <PageHeroSection.RemainingPageContent>No Page Content</PageHeroSection.RemainingPageContent>
    )
    let pageExplanation = <PageHeroSection.PageExplanation></PageHeroSection.PageExplanation>

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
        <main>
            <section>
                {pageName}
                <div className="mb-5">{pageExplanation}</div>

                {highlightSection && <div className="w-1/2">{highlightSection}</div>}
            </section>
            {remainingPageContent}
        </main>
    )
}

PageHeroSection.PageName = function pn(props: PropsWithChildren) {
    return (
        <>
            <h1 className="m-0 p-0">{props.children}</h1>
            <br />
        </>
    )
}
PageHeroSection.PageExplanation = function pe(props: PropsWithChildren) {
    return <p>{props.children}</p>
}
PageHeroSection.HighlightSection = function hs(props: PropsWithChildren) {
    return <div>{props.children}</div>
}
PageHeroSection.RemainingPageContent = function rpc(props: PropsWithChildren) {
    return <>{props.children}</>
}

export default PageHeroSection
