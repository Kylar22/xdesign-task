describe("Scenario 1 - Data should load onto the page", () => {
  beforeEach("Visit SpaceX Launches site", () => {
    cy.testSetup()
  })

  it("Check page loads and launch items exist", () => {
    cy.wait("@launches")
    // main test
    cy.get(".launch-item").should("exist")
    // If a known value will be consistently present
    cy.get(".launch-list").children(".launch-item").should("contain.text", "FalconSat")

    // Example assertions
    cy.url().should("contain", "https://fe-automation-tool.s3.eu-west-1.amazonaws.com/index.html")
    // Testing Library
    cy.findByRole("img", { name: /spacex/i }).should("be.visible")
    cy.findByRole("button", { name: /reload data/i }).should("be.visible")
    // Attribute selector
    cy.get("[alt=SpaceX]").should("be.visible")
  })

  it("Checks API response contains an array of ships", () => {
    cy.wait("@launches")
    cy.get("@launches").then((interception) => {
      const ships = interception.response.body
      cy.log("Number of ships = " + ships.length)
      expect(ships).to.exist
      // asserting the number of ships in the GET === #launch items
      cy.get(".launch-item").should("have.length", ships.length)
    })
  })

  it("Checks API response returns a status of 200", () => {
    cy.get("@space").then((interception) => {
      cy.log(interception.response)
      expect(interception.response.statusCode).to.equal(200)
    })
  })
})
