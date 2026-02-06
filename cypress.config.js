const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    includeShadowDom: true,
    setupNodeEvents(on, config) {
      // Implementar plugins futuros se necessário
      return config;
    },
    baseUrl: 'https://www.betterroaming.com/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    chromeWebSecurity: false,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 0,
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
