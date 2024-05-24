const { defineConfig } = require("cypress");
const fs = require("fs-extra");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
    screenshotOnRunFailure: true,
    embeddedScreenshots: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        clearDirectory(directoryPath) {
          console.log(`Clearing the directory: ${directoryPath}`);
          return fs.emptyDir(directoryPath);
        },
      });
    },
    baseUrl: "https://enrollment-2.gainbridge.io/product-selection/steadypace",
  },
});
