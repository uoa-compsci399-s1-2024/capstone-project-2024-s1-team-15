import { defineConfig } from "cypress"
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin"

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            configureVisualRegression(on)
        },
        env: {
            visualRegressionType: "regression",
        },
        screenshotsFolder: "./cypress/snapshots/actual",
    },
})
