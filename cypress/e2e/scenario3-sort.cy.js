describe("Scenario 2 - Order should be done alphabetically", () => {
  const allNumbers = []
  let allNumbersSorted = []
  let totalListCount
  beforeEach("Visit SpaceX Launches site", () => {
    cy.testSetup()
  })

  it("Checks the sort in Descending order", () => {
    cy.wait("@launches")
    cy.contains("Sort Ascending").click()
    cy.get(".launch-item").then(($items) => {
      totalListCount = $items.length
    })
    cy.get(".launch-item")
      .find(".launch-item__number")
      .each(($items, index) => {
        // cy.log($items[0].innerText)
        const numbers = $items[0].innerText.slice(1)
        cy.log(numbers, totalListCount - index)
        expect(parseInt(numbers)).to.equal(totalListCount - index)
      })
  })

  // The 3 `it()` blocks below were included as I did these to check the logic - matching the #number to the index as the test above fails on the first assertion.

  // This shows the ascending order breaks at #165
  it("Checks the sort in ascending order", () => {
    cy.wait("@launches")
    cy.get(".launch-item")
      .find(".launch-item__number")
      .each(($items, index) => {
        const numbers = $items[0].innerText.slice(1)
        cy.log(numbers, index + 1)
        expect(parseInt(numbers)).to.equal(index + 1)
      })
  })

  // This creates an array of numbers in display order ascending by removing the `#`
  it("Creates an array of numbers in display order ascending", () => {
    cy.get(".launch-item")
      .find(".launch-item__number")
      .each(($items, index) => {
        const numbers = $items[0].innerText.slice(1)
        cy.log(numbers, index + 1)
        allNumbers.push(numbers)
      })
  })

  // This copies the array above sorts the copy then compares the 2 arrays.  Looking at the results you can see that the difference occurs in the same place i.e after #165.  Although this requires more code the same result is reached from 1 assertion
  it("Compares arrays of numbers", () => {
    allNumbersSorted = allNumbers
    console.log(allNumbers)
    cy.log(allNumbers)
    cy.log(allNumbersSorted)
    expect(allNumbers.toString()).to.equals(allNumbersSorted.sort((a, b) => a - b).toString())
  })
})
