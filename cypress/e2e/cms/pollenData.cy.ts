import { URLS } from "../consts"
import { loginAttempt, mockValidCredentials, userIsLoggedIn } from "../authenticationUtils"

describe("pollen data", () => {
    describe("inputting excel file", () => {
        beforeEach(() => {
            cy.visit(URLS.EDIT_POLLEN_DATA)
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()
            cy.visit(URLS.EDIT_POLLEN_DATA) // TODO: login should already redirect here!!!!
        })

        it("valid excel file", () => {
            cy.contains("label", "Upload .xlsx spreadsheet file with pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/AAPC dummy data.xlsx")

            cy.contains("button", "Preview data").click()
            cy.contains("Preview generated ✅")
        })

        it("no file", () => {
            cy.contains("label", "Upload .xlsx spreadsheet file with pollen data").find("input[type='file']")

            cy.contains("button", "Preview data").click()
            cy.contains("No file uploaded")
        })

        it("invalid file", () => {
            cy.contains("label", "Upload .xlsx spreadsheet file with pollen data")
                .find("input[type='file']")
                .selectFile("cypress/fixtures/authSuccessResponse.json")

            cy.contains("button", "Preview data").click()
            cy.contains(
                "The file you have uploaded doesn't seem to be an Excel spreadsheet. The filename 'authSuccessResponse.json' doesn't have '.xlsx'"
            )
        })
    })
})
