import authSuccessResponse1 from "../fixtures/authSuccessResponse1.json";
import authSuccessResponse2 from "../fixtures/authSuccessResponse2.json";
import authSuccessRequestHeaders from "../fixtures/authSuccessRequestHeaders.json";

import { URLS } from "@/../../frontend/app/consts";

describe("Authentication", () => {
  describe("login", () => {
    it("valid credentials", () => {
      cy.intercept(
        { method: "POST", url: "https://cognito-idp.us-east-1.amazonaws.com/" },
        (req) =>
          req.reply({
            statusCode: 200, // default
            body: !req.body["ChallengeName"]
              ? authSuccessResponse1
              : authSuccessResponse2,
            headers: authSuccessRequestHeaders,
          })
      );

      cy.visit(URLS.LOGIN_URL);
      cy.url().should("eq", URLS.LOGIN_URL);
      cy.get("button")
        .contains("Logout", { matchCase: false })
        .should("not.exist");
      cy.get("form input").should("have.length", 2);

      // finds and inputs valid credentials
      cy.contains("form label", "Email")
        .find("input")
        .type("validemail@email.com");
      cy.contains("form label", "Password")
        .find('input[type="password"]')
        .type("validpassword");

      // submit login form & redirects
      cy.get("button").contains("Login").click();
      cy.url().should("eq", URLS.REDIRECT_AFTER_LOGIN);
      cy.contains("Logged in as Admin");
      cy.contains("Logout");
    });
  });
});
