import { URLS } from "../consts"
import { loginAttempt, mockValidCredentials, userIsLoggedIn } from "../authenticationUtils"

describe("pollen data", () => {
    describe("filetype of inputted file", () => {
        beforeEach(() => {
            cy.visit(URLS.EDIT_POLLEN_DATA)
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()
            cy.visit(URLS.EDIT_POLLEN_DATA)  // TODO: login should already redirect here!!!!
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
            cy.contains("No file uploaded.")
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("invalid file", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/authSuccessResponse.json")

            cy.contains("button", "Preview data").click()

            cy.contains("Uploaded file 'authSuccessResponse.json' is not a .xlsx Excel spreadsheet.")
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

        it("No worksheets containing 'raw' in name", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format  - no 'raw' worksheet.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains("This spreadsheet has no worksheet with 'raw' in its name.")
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it("Pollen types not in Column A", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format - pollen types in column B.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(`Cell A2 doesn't seem to be a pollen name: undefined.`)
            cy.contains("Preview generated ✅").should("not.exist")
        })

        it.skip("Dates are not in row 1", () => {
            cy.contains("label", "Upload .xlsx Excel spreadsheet containing pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/Pollen Dummy Data - invalid format - dates in row 2.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains(`Cell B1 doesn't seem to be a date: Pollen Data 2025.`)
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
            cy.contains(`A cell containing 'Total pollen counted' was not found in Column A.`)
            cy.contains("Preview generated ✅").should("not.exist")
        })
    })
})
