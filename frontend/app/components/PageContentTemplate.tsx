import React, { PropsWithChildren, Children } from "react"

function PageHeroSection({ children }: { children: React.ReactNode }) {
    let pageName = <PageHeroSection.PageName>No page name</PageHeroSection.PageName>,
        highlightSection = null
    let remainingPageContent = (
        <PageHeroSection.RemainingPageContent>No Page Content</PageHeroSection.RemainingPageContent>
    )

    Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return

        if (child.type === PageHeroSection.PageName) {
            return (pageName = child)
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
                <div className="page-explanation">{pageName}</div>

                {highlightSection && <div className="emphasized-first-section">{highlightSection}</div>}
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

PageHeroSection.HighlightSection = function hs(props: PropsWithChildren) {
    return <div>{props.children}</div>
}
PageHeroSection.RemainingPageContent = function rpc(props: PropsWithChildren) {
    return <>{props.children}</>
}

export default PageHeroSection
