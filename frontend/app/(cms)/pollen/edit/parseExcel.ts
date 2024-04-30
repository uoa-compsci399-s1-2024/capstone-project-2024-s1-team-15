import { read, utils, WorkSheet } from "xlsx"
import { PollenData } from "./PollenDataType"
import dayjs from "dayjs"

export function parse(excelFile: ArrayBuffer): { pollenDataset: PollenData | null; errors: string[] } {
    let parsingErrors = [] as string[]

    const workbook = read(excelFile)

    const sheetsWithRawData: { [sheetName: string]: WorkSheet } = workbook.Sheets

    //⚠️assume relevent worksheets have "raw" in them
    workbook.SheetNames.map((sheetName) => {
        if (!sheetName.includes("raw")) delete sheetsWithRawData[sheetName]
    })

    if (!Object.keys(sheetsWithRawData).length) {
        parsingErrors.push(
            "This spreadsheet has no worksheet that has 'raw' in it. Here are the worksheet names it does have though: " +
                workbook.SheetNames.join(", ")
        )
        return { pollenDataset: null, errors: parsingErrors }
    }

    let pollenDataForAllSheets: PollenData = []
    Object.entries(sheetsWithRawData).map(([sheetName, sheet]) => {
        try {
            const parsedWorksheet = parseWorksheet(sheet)
            pollenDataForAllSheets = pollenDataForAllSheets.length
                ? add2PollenDatasets(pollenDataForAllSheets, [...parsedWorksheet])
                : [...parsedWorksheet]
        } catch (e: any) {
            parsingErrors.push(
                `Worksheet '${sheetName}' couldn't be parsed because this error occurred: ${e.message}\n\nTake a look at the assumptions the parsing algorithm makes. This could also be a bug with the parsing algorithm so report to developers 🙂.`
            )
        }
    })

    const returnedDataset = pollenDataForAllSheets.length ? sortValuesByDate(pollenDataForAllSheets) : null

    return { pollenDataset: returnedDataset, errors: parsingErrors }
}

// so pollen calendar chart doesn't look weird
// chart.js connects the lines based on the order of list, not based on the date value 🥲
function sortValuesByDate(pollenData: PollenData): PollenData {
    return pollenData.map((pollenType) => {
        pollenType.pollenValues = pollenType.pollenValues.toSorted(
            ({ date }, { date: date1 }) => dayjs(date).valueOf() - dayjs(date1).valueOf()
        )
        return pollenType
    })
}

function add2PollenDatasets(pollenData1: PollenData, pollenData2: PollenData): PollenData {
    let combinedDataset: PollenData = pollenData1

    let existingPollenTypes = combinedDataset.map((pollenType) => pollenType.pollenName)

    pollenData2.map((pollenType) => {
        // ⚠️assume the pollen name is the same in both sheets
        // ⚠️NOTE: pollen name is the one outside of round brackets or cell value is there are no brackets
        const existingIndex = existingPollenTypes.findIndex((name) => name == pollenType.pollenName)
        if (existingIndex === -1) {
            combinedDataset.push(pollenType)
        } else {
            // ⚠️assume no date in a sheet as also in another sheet
            // BUT if the same date is in 2 different sheets, then use the pollen value from the last sheet
            combinedDataset[existingIndex].pollenValues = [
                ...combinedDataset[existingIndex].pollenValues,
                ...pollenType.pollenValues,
            ]
        }
    })

    return combinedDataset
}

function parseWorksheet(worksheet: WorkSheet): PollenData {
    let parsedData: PollenData

    const rows = utils.sheet_to_json(worksheet, { header: "A", raw: false })

    // ⚠️assume dates are in the first row
    const datesWithColumnNumber = rows[0] as { [columnNumber: string]: string } // string value is date

    let lastPollenRow = -1
    const columnAValues = rows.slice(1).map((row: any) => row.A)

    const remainingColumns = rows.slice(1).map((row: any) => {
        delete row.A
        return row
    })

    columnAValues.map((columnAValue, index) => {
        // ⚠️assume pollen names are in column A AND start at row 2
        if (!(typeof columnAValue == "string") || columnAValue === "")
            throw Error(
                `Column A, row ${2 + index} doesn't seem to contain a pollen name, it contains: ${columnAValue}. To understand the excel data, the pollen names should be in column A, start at row 2 and the last pollen type will be "Total pollen counted"`
            )

        // ⚠️assume pollen values are in column B or to the right of column B AND start at row 2

        // ⚠️ assume last pollen name is "Total pollen counted"
        // ⚠️ assume last pollen values are the same row as ☝️
        if (columnAValue === "Total pollen counted") {
            lastPollenRow = 2 + index
        }
    })

    if (lastPollenRow === -1) {
        throw Error(
            `Couldn't find a 'Total pollen counted' row or 'Total pollen counted' label is not in column A. This is used to detect how many pollen types are in the spreadsheet. `
        )
    }

    const pollenTypes: string[] = []
    const pollenValues: { [columnNumber: string]: string }[] = []

    for (let index = 0; index < columnAValues.length; index++) {
        const columnAValue = columnAValues[index]
        const remainingColumnsValues = remainingColumns[index]

        pollenTypes.push(columnAValue)
        pollenValues.push(remainingColumnsValues)

        if (index + 2 === lastPollenRow) {
            break
        }
    }

    // ⚠️assume scientific name is within round brackets i.e. name (scientific name)

    const pollenNames = pollenTypes.map((pollenType: string) => pollenType.split("(")[0])
    const pollenScientificNames = pollenTypes.map((pollenType: string) => {
        try {
            return pollenType.split("(")[1].split(")")[0]
        } catch (e) {
            return undefined
        }
    })

    parsedData = pollenNames.map((pollenName, index) => {
        return {
            pollenName,
            pollenScientificName: pollenScientificNames[index],
            pollenValues: [],
        }
    })

    parsedData.map((pollenType, index) => {
        pollenType.pollenValues = Object.entries(datesWithColumnNumber).map(([columnNumber, date]) => {
            // ⚠️assume the column of the pollen value = the column for the date it was recorded at
            const pollenStringValueForThisDate = pollenValues[index][columnNumber]

            let pollenValueForThisDate: undefined | number
            try {
                // ⚠️assume pollen values are integers (not floats)
                pollenValueForThisDate = parseInt(pollenStringValueForThisDate)
            } catch (e) {
                // ⚠️assume if not integer, then there is no pollen value for this date
                pollenValueForThisDate = undefined
            }

            return { date, value: pollenValueForThisDate }
        })

        return pollenType
    })

    return parsedData
}
