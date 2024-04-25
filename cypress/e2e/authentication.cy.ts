import authSuccessResponse from "../fixtures/authSuccessResponse.json"

import { API_URI, URLS } from "../../frontend/app/consts"

// allows successful login without using the actual admin credentials
function mockValidCredentials() {
    cy.intercept({ method: "POST", url: API_URI + "/auth/login" }, (req) =>
        req.reply({
            statusCode: 200, // default
            body: authSuccessResponse,
        })
    )
}

function userIsLoggedOut() {
    cy.get("button").contains("Logout", { matchCase: false }).should("not.exist")
    cy.get("form input").should("have.length", 2)
}

function loginAttempt() {
    // finds and inputs valid credentials
    cy.contains("form label", "Email").find("input").type("validemail@email.com")
    cy.contains("form label", "Password").find('input[type="password"]').type("validpassword")
    cy.get("button").contains("Login").click()
}

function userIsLoggedIn() {
    // check user is logged in now
    cy.url().should("eq", URLS.REDIRECT_AFTER_LOGIN)
    cy.contains("Logged in as Admin")
    cy.contains("Logout")
}

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
            userIsLoggedOut() // should still be logged out
            cy.get("p").contains("username and/or password incorrect.")
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
