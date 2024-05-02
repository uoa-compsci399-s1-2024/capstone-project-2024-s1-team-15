import authSuccessResponse from "../fixtures/authSuccessResponse.json"

import { API_URI } from "../../frontend/app/lib/consts"
import { URLS } from "./consts"

// allows successful login without using the actual admin credentials
export function mockValidCredentials() {
    cy.intercept({ method: "POST", url: API_URI + "/auth/login" }, (req) =>
        req.reply({
            statusCode: 200, // default
            body: authSuccessResponse,
        })
    )
}

export function userIsLoggedOut() {
    cy.visit(URLS.LOGIN)
    cy.contains("button", "Logout", { matchCase: false }).should("not.exist")
    cy.get("form input").should("have.length", 2)
}

export function loginAttempt() {
    // finds and inputs valid credentials
    cy.contains("form label", "Email").find("input").type("validemail@email.com")
    cy.contains("form label", "Password").find('input[type="password"]').type("validpassword")
    cy.get("button").contains("Login").click()
}

export function userIsLoggedIn() {
    // check user is logged in now
    cy.url().should("eq", URLS.REDIRECT_AFTER_LOGIN)
    cy.contains("Logged in as Admin")
    cy.contains("Logout")
}
