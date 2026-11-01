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
    autoOpen: true, // Abre o relatório em HTML automaticamente ao término dos testes
    saveAllAttempts: false
  }
});
