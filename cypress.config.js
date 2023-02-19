const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://fe-automation-tool.s3.eu-west-1.amazonaws.com",
    // chromeWebSecurity: false,
    defaultCommandTimeout: 6000,
    requestTimeout: 8000,
    responseTimeout: 33000,
    reporter: "mochawesome",
    reporterOptions: {
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: "cypress/report"
    },
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
