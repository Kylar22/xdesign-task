describe("Scenario 2 - Filter by year", () => {
  let totalListCount = 0
  let totalListWith2015 = 0
  let filteredListTotal = 0
  let filteredListWith2015 = 0
  beforeEach("Visit SpaceX Launches site", () => {
    cy.testSetup()
  })

  it("Checks the filtered list returns only launches in 2015 ", () => {
    // Checks the total number of items in an unfiltered list
    cy.get(".launch-item")
      .filter(':contains("#")')
      .then(($value) => {
        totalListCount = $value.length
        cy.log(totalListCount)
      })
    // Checks the number of items in the unfiltered list with year 2015
    cy.get(".launch-item")
      .filter(':contains(" 2015")')
      .then(($value) => {
        totalListWith2015 = $value.length
        cy.log(totalListWith2015)
        // Optional assertion
        expect(totalListWith2015).to.be.lessThan(totalListCount)
      })
    // The list is filtered by year 2015
    cy.get("[name='Filter By Year']").select("2015")
    cy.get(".launch-item")
      // containing all filtered items in the list
      .should("contain", "#")
      .then(($value) => {
        filteredListTotal = $value.length
        // The number of items in the filtered list
        cy.log(filteredListTotal)
        // Asserting the filtered list contains all the entries
        expect(filteredListTotal).to.equal(totalListWith2015)
      })
    cy.get(".launch-item")
      // containing all filtered items in the list with 2015
      .should("contain", " 2015")
      .then(($value) => {
        filteredListWith2015 = $value.length
        // The number of items in the filtered list
        cy.log(filteredListWith2015)
        // Asserting ALL the filtered list contains 2015
        expect(filteredListWith2015).to.equal(filteredListTotal)
      })
  })

  it("Compares total items vs filtered items length", () => {
    cy.log("totalListCount " + totalListCount)
    cy.log("totalListWith2015 " + totalListWith2015)
    cy.log("filteredListTotal " + filteredListTotal)
    cy.log("filteredListWith2015 " + filteredListWith2015)
    expect(totalListWith2015).to.equal(filteredListWith2015).and.to.equal(filteredListTotal)
  })
})
