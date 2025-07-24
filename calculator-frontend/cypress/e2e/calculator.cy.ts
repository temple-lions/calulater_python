describe("Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("adds numbers correctly", () => {
    cy.contains("2").click();
    cy.contains("+").click();
    cy.contains("3").click();
    cy.contains("=").click();
    cy.contains("Result: 5").should("exist");
  });
});
