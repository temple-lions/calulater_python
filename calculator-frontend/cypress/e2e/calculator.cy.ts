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

  it("subtracts numbers correctly", () => {
    cy.contains("9").click();
    cy.contains("-").click();
    cy.contains("4").click();
    cy.contains("=").click();
    cy.contains("Result: 5").should("exist");
  });

  it("multiplies numbers correctly", () => {
    cy.contains("6").click();
    cy.contains("*").click();
    cy.contains("7").click();
    cy.contains("=").click();
    cy.contains("Result: 42").should("exist");
  });

  it("divides numbers correctly", () => {
    cy.contains("8").click();
    cy.contains("/").click();
    cy.contains("2").click();
    cy.contains("=").click();
    cy.contains("Result: 4").should("exist");
  });
  it("handles division by zero", () => {
    cy.contains("5").click();
    cy.contains("/").click();
    cy.contains("0").click();
    cy.contains("=").click();
    cy.contains("Error: Division by zero").should("exist");
  });

  it("clears input when C is clicked", () => {
    cy.contains("5").click();

    cy.get('[data-cy="calculator-input"]').should("have.value", "5");

    cy.get('[data-cy="clear-button"]').click();

    cy.get('[data-cy="calculator-input"]').should("have.value", "");
  });
});
