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
            <section className="flex flex-row-reverse items-start">
                <div className="bg-primary p-4 border-20 border-third rounded-3xl max-w-[50%]">
                    {pageName}
                    <div className="mb-5">{pageExplanation}</div>
                </div>

                {highlightSection && <>{highlightSection}</>}
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

PageHeroSection.HighlightSection = function hs(props: any) {
    return (
        <section className="w-[50%] mt-8">
            <div className="bg-purpletwo p-4 rounded-l-full text-center mb-4">{props.title}</div>
            {props.children}
        </section>
    )
}
PageHeroSection.RemainingPageContent = function rpc(props: PropsWithChildren) {
    return <>{props.children}</>
}

export default PageHeroSection
