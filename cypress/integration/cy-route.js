/// <reference types="cypress" />
describe("page", () => {
  beforeEach(() => {
    cy.server();
  });
  it("works", () => {
    cy.visit("https://csb-gl5xj.netlify.app/");
    cy.route({
      method: "POST",
      url: "**/sessions",
      status: 200,
      response: {
        success: true,
      },
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
