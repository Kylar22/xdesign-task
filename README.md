- [xDesign Automation Task](#xdesign-automation-task)
  - [Installation](#installation)
  - [Running Tests](#running-tests)
  - [Test scenarios](#test-scenarios)
  - [Project Setup](#project-setup)
    - [`command.js`](#commandjs)
    - [Testing Library](#testing-library)
    - [HTML reports](#html-reports)
    - [Prettier](#prettier)
    - [Cypress videos](#cypress-videos)
    - [Omissions](#omissions)

# xDesign Automation Task

## Installation

The Git repo is set up using Node and NPM, which are pre-requisites for installation

To install the project:

`npm install`

## Running Tests

`npm test`

This will run the tests headless with with the mochawesome reporter

`npm run cy:open`

## Test scenarios

There are 3 test files to cover the 3 scenarios.  I have used the standard Cypress Mocha framework to run the tests.

- `scenario1-pageload.cy.js`
- `scenario2-filter.cy.js`
- `scenario3-sort.cy.js`

Scenario 3 is a failing test as it does not meet the BDD acceptance criteria.

Scenario 3 stated *"Order should be done alphabetically"* looking at the test site the was ordered by `#<number>` so I based the test logic on that.

If that was an error on my part I think the logic used could be applied in a similar way by creating an array copying it with an appropriate sort and then comparing with the original.

## Project Setup

### `command.js`

I added a custom function in `command.js` to reduce the code in the `beforeEach()` functions which was repeated across the 3 test files.

### Testing Library

I've added a couple of scenarios in `scenario1-pageload.cy.js` to show the implementation of testing library.

### HTML reports

Reports are generated using mochawesome this option can be removed from `cypress.config.js`

Reports are run by default on a `cypress run` and are create in the `/cypress/report` folder

Existing JSON reports are removed via a `pretest` script

To merge the reports to a single JSON file: `npm run merge-reports` 

To create an HTML report: `npm run html-report`

A known issue relating to ascii encoding can occur running the merge script on a Windows machine, this can be resolved pasting the script into the command prompt or running the script in a WSL terminal. 

An example report is in `/cypress/report-example` for reference.

### Prettier
I've included Prettier to highlight attention to formatting which I would expect to be a standard at an organisation or team level. This would also apply to linting (e.g. ESLint) and static code testing like SonarCube.

### Cypress videos

These have been disabled but can be enabled by removing `video: false` in `cypress.config.js`

### Omissions

After speaking to Andrius about your implementations of Cypress using BDD I did consider looking at a cucumber plugin `@badeball/cypress-cucumber-preprocessor` however, after installing it I realised I would need to refactor the project so decided to leave it out

Other items to consider in a project like this:

- Implementing Page objects
- Accessibility testing using the cypress-axe plugin
- Lighthouse performance metrics using the `@cypress-audit/lighthouse` plugin
- Using `dotenv` for environment variables and credentials where appropriate
- Using a fixture file with an intercept to mock the data in scenario 3 to get a passing test

