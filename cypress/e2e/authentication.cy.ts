import { CMS_URLS, URLS } from "./consts"
import { userIsLoggedOut, mockValidCredentials, loginAttempt, userIsLoggedIn } from "./authenticationUtils"

describe("Authentication", () => {
    describe("login", () => {
        beforeEach(() => {
            cy.visit(URLS.LOGIN)
            cy.url().should("eq", URLS.LOGIN)
        })

        it("valid credentials", () => {
            userIsLoggedOut()
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()
        })

        it("invalid credentials", () => {
            cy.url().should("eq", URLS.LOGIN)
            userIsLoggedOut()
            loginAttempt()
            cy.get("p").contains("Username and/or password incorrect.")
            userIsLoggedOut() // should still be logged out
        })

        it("should not show login page once logged in", () => {
            userIsLoggedOut()
            mockValidCredentials()
            loginAttempt()
            userIsLoggedIn()

            cy.visit(URLS.LOGIN)
            cy.url().should("not.be", URLS.LOGIN)

            cy.contains("login").should("not.exist")
        })
    })

    it("logout", () => {
        cy.visit(URLS.LOGIN)
        cy.url().should("eq", URLS.LOGIN)
        userIsLoggedOut()
        mockValidCredentials()
        loginAttempt()
        userIsLoggedIn()

        cy.get("button").contains("Logout").click()

        userIsLoggedOut()

        for (let url in CMS_URLS) {
            cy.visit(url)
            cy.url().should("be", URLS.LOGIN)
        }
    })
})
