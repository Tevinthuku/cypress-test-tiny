/// <reference types="cypress" />
describe("page", () => {
  it("works", () => {
    cy.visit("https://csb-gl5xj-g6j2kdska.vercel.app/");
    cy.intercept("**/sessions", {
      body: { success: true },
      headers: {
        "x-token": "token",
      },
    }).as("loginRequest");
    cy.get("[data-testid=username-input]").type("user");
    cy.get("[data-testid=password-input]").type("userpassword");
    cy.get("[data-testid=signin-button]").click();
    cy.wait("@loginRequest").then((res) => {
      let headers = res.response.headers;
      expect(headers).to.have.property("x-token");
    });
  });
});
