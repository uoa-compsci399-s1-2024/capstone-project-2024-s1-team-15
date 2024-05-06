import { URLS } from "./consts"
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
            userIsLoggedOut()
            loginAttempt()
            cy.get("p").contains("Username and/or password incorrect.")
            userIsLoggedOut() // should still be logged out
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
    })
})
