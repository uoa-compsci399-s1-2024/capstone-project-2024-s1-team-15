import { URLS } from "../consts"
import { loginAttempt, mockValidCredentials, userIsLoggedIn } from "../authenticationUtils"

function loginToEditPollenPage() {
    cy.visit(URLS.EDIT_POLLEN_DATA)
    mockValidCredentials()
    loginAttempt()
    userIsLoggedIn()
    cy.visit(URLS.EDIT_POLLEN_DATA) // TODO: login should already redirect here (task #70)
    cy.url().should("eq", URLS.EDIT_POLLEN_DATA)
}

function inputDataFile(filepath: string = "cypress/fixtures/Pollen Dummy Data - valid format.xlsx") {
    cy.contains("label", "Upload .xlsx spreadsheet file with pollen data")
        .find("input[type='file']")
        .selectFile(filepath)
}

describe("updating pollen calendar", () => {
    beforeEach(loginToEditPollenPage)

    it("successfully preview calendar using valid excel spreadsheet", () => {
        inputDataFile("cypress/fixtures/Pollen Dummy Data - valid format.xlsx")

        cy.contains("button", "Preview data").click()
        cy.contains("Preview generated ✅")

        cy.contains("button", "Update calendar on website").click()
    })

    describe("invalid filetypes", () => {
        it("no file", () => {
            cy.contains("label", "Upload .xlsx spreadsheet file with pollen data").find("input[type='file']")

            cy.contains("button", "Preview data").click()
            cy.contains("No file uploaded")
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("invalid file", () => {
            inputDataFile("cypress/fixtures/authSuccessResponse.json")

            cy.contains("button", "Preview data").click()
            cy.contains(
                "The file you have uploaded doesn't seem to be an Excel spreadsheet. The filename 'authSuccessResponse.json' doesn't have '.xlsx'"
            )
        })
    })

    describe("invalid excel spreadsheet format", () => {
        // invalid formatsare formats that ignore an assumptions made by parsing algorithm

        it("has no worksheets with 'raw' in the name", () => {
            inputDataFile("cypress/fixtures/Pollen Dummy Data - invalid format  - no 'raw' worksheet.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                "This spreadsheet has no worksheet that has 'raw' in it. Here are the worksheet names it does have though: "
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("pollen types are not in column A", () => {
            inputDataFile("cypress/fixtures/Pollen Dummy Data - invalid format - pollen types in column B.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                `Column A, row 2 doesn't seem to contain a pollen name, it contains: undefined. To understand the excel data, the pollen names should be in column A, start at row 2 and the last pollen type will be "Total pollen counted"`
            )
            cy.contains("Preview generated ✅").should("exist") // the other worksheet has a valid format though so preview that data
        })

        it.skip("dates are not in row 1", () => {
            inputDataFile("cypress/fixtures/Pollen Dummy Data - invalid format - dates in row 2.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                `Column B, row 1 doesn't seem to contain a date, it contains: Pollen Data 2025. To understand the excel data, the dates should be in row 1 and start at column B.`
            )
            cy.contains("Preview generated ✅").should("exist") // other worksheet has valid format
        })

        it("doesn't have 'Total pollen counted'", () => {
            inputDataFile(
                "cypress/fixtures/Pollen Dummy Data - invalid format - sheets don't have 'Total pollen counted'.xlsx"
            )

            cy.contains("button", "Preview data").click()
            cy.contains("Worksheet '2023_24_raw' couldn't be parsed because this error occurred:")
            cy.contains(
                `Couldn't find a 'Total pollen counted' row or 'Total pollen counted' label is not in column A. This is used to detect how many pollen types are in the spreadsheet. `
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })
    })

    describe("showing calendar preview", () => {
        beforeEach(() => inputDataFile("cypress/fixtures/Pollen Dummy Data - valid format.xlsx"))

        // both tests won't work as is because canvas is a visual element
        // and its children elements are picked up by the browser :`(
        it.skip("chart with a labelled x and y axis", () => {
            cy.contains("button", "Preview data").click()

            const yAxisLabel = "Pollen grains per cubic metre of air"
            const xAxisLabel = "Date"
            cy.contains(yAxisLabel).should("have.length", 1)
            cy.contains(xAxisLabel).should("have.length", 1)
        })

        it.skip("check tooltip of a pollen data point", () => {
            cy.contains("button", "Preview data").click()

            cy.get("#toolTipButton").trigger("mouseover")

            cy.contains("You hovered over the Button").should("be.visible")
        })

        it("pollen calendar looks as it currently does lol", () => {
            cy.contains("button", "Preview data").click()
            cy.wait(5000)

            // if it looks '50%' or more different to base snapshot then test fails
            cy.compareSnapshot("editPollenCalendarPreview", { errorThreshold: 50 })
            cy.get("canvas").compareSnapshot("editPollenCalendarPreview", { errorThreshold: 50 })
        })

        it("pollen calendar hover on data point should look as it does right now", () => {
            cy.contains("button", "Preview data").click()
            cy.wait(5000)

            cy.get("canvas").then(($canvas) => {
                const canvasWidth = $canvas.width()
                const canvasHeight = $canvas.height()

                let buttonX = canvasWidth * 0.53052
                let buttonY = canvasHeight * 0.6427

                cy.wrap($canvas).scrollIntoView().realTouch({ x: buttonX, y: buttonY })
                cy.wait(5000)
                cy.get("canvas").compareSnapshot("pollenCalendarDataPointHover1")
            })
        })
    })
})
