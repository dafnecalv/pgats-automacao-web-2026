const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.automationexercise.com",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Relatório de Testes - PGATS Automation Exercise',
    embeddedScreenshots: true,
    inlineAssets: true,
    autoOpen: !process.env.CI, // Abre o relatório em HTML ao término dos testes, exceto na esteira de CI
    saveAllAttempts: false
  }
});
