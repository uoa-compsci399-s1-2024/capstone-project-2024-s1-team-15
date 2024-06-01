import { PUBLIC_FRONTEND_URLS } from "../consts"
import { compareSnapshots } from "cypress-visual-regression/dist/plugin"
import { Page } from "../../../frontend/app/lib/types"

const getTransformRotationAngle = (cssTransformMatrix, absoluteValue) => {
    const cssTransformMatrixIndexes = cssTransformMatrix.split("(")[1].split(")")[0].split(",")
    const cssTransformScale = Math.sqrt(
        cssTransformMatrixIndexes[0] * cssTransformMatrixIndexes[0] +
            cssTransformMatrixIndexes[1] * cssTransformMatrixIndexes[1]
    )
    const cssTransformSin = cssTransformMatrixIndexes[1] / cssTransformScale
    const cssTransformAngle = Math.round(Math.asin(cssTransformSin) * (180 / Math.PI))
    return absoluteValue ? Math.abs(cssTransformAngle) : cssTransformAngle
}

// Cypress.Commands.add("getTransformRotationAngle", getTransformRotationAngle)

describe.skip("flower navigation", () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#examples
    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min)
        const maxFloored = Math.floor(max)
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
    }

    function getRandomPage(): Page {
        const indexOfRandomPage = getRandomInt(0, PUBLIC_FRONTEND_URLS.length)

        return PUBLIC_FRONTEND_URLS[indexOfRandomPage]
    }

    specify("navigation links work", () => {
        const startingPageUrl = getRandomPage().url
        cy.visit(startingPageUrl)
        cy.url().should("eq", startingPageUrl)

        const maxNumNavClicks = 15
        const numNavClicksForTest = Math.random() * maxNumNavClicks
        let nextPageToClick: Page
        for (let navClicksCounter = 0; navClicksCounter < numNavClicksForTest; navClicksCounter++) {
            nextPageToClick = getRandomPage()

            cy.contains("nav li a", nextPageToClick.name).click()
            cy.url().should("eq", nextPageToClick.url)
        }
    })

    specify("nav items for every page are always visible", () => {
        // regardless of which petal is selected

        cy.visit(PUBLIC_FRONTEND_URLS[0].url)
        for (let pageIndex = 0; pageIndex < PUBLIC_FRONTEND_URLS.length; pageIndex++) {
            let nextPageName = PUBLIC_FRONTEND_URLS[(pageIndex + 1) % PUBLIC_FRONTEND_URLS.length].name

            cy.get("nav li a:visible").should("have.length.greaterThan", PUBLIC_FRONTEND_URLS.length)
            cy.get("nav li a:visible").contains(nextPageName).click()
        }
    })

    describe.skip("navigation selects petal from current url", () => {
        // no tests for CMS or auth pages yet 👇
        // on cms pages, hide flower?
        // on auth pages, hide flower?

        it("only has full opacity on selected page", () => {
            const startingPage = getRandomPage()
            cy.visit(startingPage.url)
            cy.url().should("eq", startingPage.url)

            const maxNumNavClicks = 15
            const numNavClicksForTest = Math.random() * maxNumNavClicks
            let nextPageToClick: Page
            let navItemElement: Cypress.Chainable<JQuery<HTMLElement>>
            for (let navClicksCounter = 0; navClicksCounter < numNavClicksForTest; navClicksCounter++) {
                nextPageToClick = getRandomPage()
                cy.contains("a", nextPageToClick.name).click()

                for (let page of PUBLIC_FRONTEND_URLS) {
                    navItemElement = cy.contains("nav li a", page.name)

                    try {
                        navItemElement.should("have.css", "color", "rgb(0, 0, 0)")
                    } catch (e) {
                        navItemElement.should("have.css", "color", "black")
                    }

                    cy.log(nextPageToClick.name, page.name)
                    if (page.name === nextPageToClick.name) {
                        try {
                            navItemElement.contains("p", page.name).eq(0).should("have.css", "opacity", "1")
                        } catch (e) {
                            navItemElement.contains("p", page.name).eq(1).should("have.css", "opacity", "1")
                        }
                    } else {
                        navItemElement.contains("p", page.name).should("have.css", "opacity", "0.2")
                    }
                }
            }
        })

        // is checking text rotation possible without checking implementation details?
        it.skip("current page is horizontal", () => {
            const startingPage = getRandomPage()
            cy.visit(startingPage.url)
            cy.url().should("eq", startingPage.url)

            cy.contains(startingPage.name)

            try {
                cy.get("nav li a").should("not.have.css", "transform")
            } catch (e) {
                // if it has transform, it shouldn't have rotate
                try {
                    cy.get("nav li a").should("have.css", "transform").should("not.contain", "rotate")
                } catch (e) {
                    cy.get("nav li a").should("have.css", "transform").should("contain", "rotate0")
                }
            }
        })
    })

    // seems to passing for a empty nav too 🥲
    specify.skip("flower navigation looks the same as the design", () => {
        cy.visit(PUBLIC_FRONTEND_URLS[0].url)
        cy.get("nav").compareSnapshot("flowerNavFromDesign", { errorThreshold: 20 })
    })
})