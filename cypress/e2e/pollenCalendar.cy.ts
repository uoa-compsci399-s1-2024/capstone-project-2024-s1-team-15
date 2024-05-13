import { UI_URI } from "./consts"

describe("viewing pollen calendar", () => {
    beforeEach(() => {
        cy.visit(UI_URI + "/pollen")
    })

    describe("using date filter", () => {
        function inputNewPollenDateByTyping(inputLabel: string, day: string, month: string, year: string) {
            const fromDateInput = cy.findByLabelText(inputLabel, { timeout: 7000, exact: false }) // returns the date

            fromDateInput.focus().realType(day)
            fromDateInput.realType(month)
            fromDateInput.realType(year)
        }

        // uses the date input UI
        // date is in the format: yyyy-MM-dd
        function inputNewPollenDateByChoosing(inputLabel: string, date: string) {
            const fromDateInput = cy.findByLabelText(inputLabel, { timeout: 7000, exact: false }) // returns the date

            fromDateInput.type(date)
        }

        // doesn't check if pollen calendar is showing the right dates
        specify("pollen calendar canvas exists after changing date range", () => {
            cy.findByText("Date").click()
            inputNewPollenDateByTyping("From", "01", "01", "2022")
            cy.get("canvas#multi-chart").should("be.visible")
            inputNewPollenDateByChoosing("To", "2023-02-12")
            cy.get("canvas#multi-chart").should("be.visible")
        })
    })
})
