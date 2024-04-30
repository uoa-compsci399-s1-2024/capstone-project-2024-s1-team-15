import { URLS } from "../consts"
import { loginAttempt, mockValidCredentials, userIsLoggedIn } from "../authenticationUtils"

describe("pollen data", () => {
    describe("filetype of inputted file", () => {
        beforeEach(() => {
            cy.visit(URLS.EDIT_POLLEN_DATA)
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()
            cy.visit(URLS.EDIT_POLLEN_DATA) // TODO: login should already redirect here!!!!
        })

        it("valid excel file", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - valid format.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains("Preview generated ✅")
        })

        it("no file", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data").find("input[type='file']")

            cy.contains("button", "Preview data").click()
            cy.contains("No file uploaded")
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("invalid file", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/authSuccessResponse.json")

            cy.contains("button", "Preview data").click()
            cy.contains(
                "The file you have uploaded doesn't seem to be an Excel spreadsheet. The filename 'authSuccessResponse.json' doesn't have '.xlsx'"
            )
        })
    })

    describe("excel spreadsheet format", () => {
        beforeEach(() => {
            cy.visit(URLS.EDIT_POLLEN_DATA)
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()
            cy.visit(URLS.EDIT_POLLEN_DATA) // TODO: login should already redirect here!!!!
        })
        // correct format test is already in the 'inputting excel file' suite
        // so testing all invalid formats
        // which are formats that ignore an assumptions made by parsing algorithm

        it("has no worksheets with 'raw' in the name", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format  - no 'raw' worksheet.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                "This spreadsheet has no worksheet that has 'raw' in it. Here are the worksheet names it does have though: "
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("pollen types are not in column A", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format - pollen types in column B.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                `Column A, row 2 doesn't seem to contain a pollen name, it contains: undefined. To understand the excel data, the pollen names should be in column A, start at row 2 and the last pollen type will be "Total pollen counted"`
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it.skip("dates are not in row 1", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format - dates in row 2.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(
                `Column B, row 1 doesn't seem to contain a date, it contains: Pollen Data 2025. To understand the excel data, the dates should be in row 1 and start at column B.`
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("doesn't have 'Total pollen counted'", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile(
                    "cypress/fixtures/Pollen Dummy Data - invalid format - sheet doesn't have 'Total pollen counted'.xlsx"
                )

            cy.contains("button", "Preview data").click()
            cy.contains("Worksheet '2023_24_raw' couldn't be parsed because this error occurred:")
            cy.contains(
                `Couldn't find a 'Total pollen counted' row or 'Total pollen counted' label is not in column A. This is used to detect how many pollen types are in the spreadsheet. `
            )
            cy.contains("Preview generated ✅").should("not.exist")
        })
    })
})
