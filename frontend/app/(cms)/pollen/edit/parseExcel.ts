import { read, utils, WorkSheet } from "xlsx"
import { PollenData } from "./PollenDataType"

export function parse(excelFile: ArrayBuffer): PollenData {
    const workbook = read(excelFile)
    console.log({ workbook })

    const sheetsWithRawData: { [sheetName: string]: WorkSheet } = workbook.Sheets

    //⚠️assume relevent worksheets have "raw" in them
    workbook.SheetNames.map((sheetName) => {
        if (!sheetName.includes("raw")) delete sheetsWithRawData[sheetName]
    })

    console.log({ sheetsWithRawData })

    let pollenDataForAllSheets: PollenData = []
    Object.values(sheetsWithRawData).map((sheet) => {
        pollenDataForAllSheets = add2PollenDatasets(pollenDataForAllSheets, parseWorksheet(sheet))
    })
    console.log({ pollenDataForAllSheets })
    return pollenDataForAllSheets
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
            combinedDataset[existingIndex].pollenValues = {
                ...combinedDataset[existingIndex].pollenValues,
                ...pollenType.pollenValues,
            }
        }
    })

    return combinedDataset
}

function parseWorksheet(worksheet: WorkSheet): PollenData {
    let parsedData: PollenData

    const rows = utils.sheet_to_json(worksheet, { header: "A", raw: false })

    // ⚠️assume pollen names are in column A AND start at row 2
    const columnAValues = rows.slice(1).map((row: any) => row.A)

    // ⚠️assume pollen values are in column B or to the right of column B AND start at row 2
    const remainingColumns = rows.slice(1).map((row: any) => {
        delete row.A
        return row
    })

    const pollenTypes: string[] = []
    const pollenValues: { [columnNumber: string]: string }[] = []

    for (let index in columnAValues) {
        const columnAValue = columnAValues[index]
        const remainingColumnsValues = remainingColumns[index]
        pollenTypes.push(columnAValue)
        pollenValues.push(remainingColumnsValues)

        // ⚠️ assume last pollen name is "Total pollen counted"
        // ⚠️ assume last pollen values are the same row as ☝️
        if (columnAValue === "Total pollen counted") {
            console.log("No more pollen types in sheet")
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
            pollenValues: {},
        }
    })

    // ⚠️assume dates are in the first row
    const datesWithColumnNumber = rows[0] as { [columnNumber: string]: string } // string value is date

    parsedData.map((pollenType, index) => {
        pollenType.pollenValues = Object.fromEntries(
            Object.entries(datesWithColumnNumber).map(([columnNumber, date]) => {
                const pollenStringValueForThisDate = pollenValues[index][columnNumber]

                let pollenValueForThisDate: undefined | number
                try {
                    // ⚠️assume pollen values are integers (not floats)
                    pollenValueForThisDate = parseInt(pollenStringValueForThisDate)
                } catch (e) {
                    // ⚠️assume if not integer, then there is no pollen value for this date
                    pollenValueForThisDate = undefined
                }

                return [date, pollenValueForThisDate]
            })
        )

        // ⚠️assume the column of the pollen value = the column for the date it was recorded at

        return pollenType
    })

    return parsedData
}
