import { read, utils, WorkSheet } from "xlsx"
import { PollenData, PollenValue } from "@aapc/types"

export function parseSpreadsheet(spreadsheet: ArrayBuffer): { pollenDataset: PollenData[] | null; errors?: string[] } {
    let parsingErrors: string[] = []

    const workbook = read(spreadsheet)
    const sheetsWithRawData: { [sheetName: string]: WorkSheet } = workbook.Sheets

    // ⚠️ assume relevant worksheets have "raw" in them
    workbook.SheetNames.map((sheetName) => {
        if (!sheetName.includes("raw")) delete sheetsWithRawData[sheetName]
    })

    if (!Object.keys(sheetsWithRawData).length) {
        parsingErrors.push(
            "This spreadsheet has no worksheet with 'raw' in its name. " +
                "Names of the worksheets in this spreadsheet: " +
                workbook.SheetNames.join(", ")
        )
        return { pollenDataset: null, errors: parsingErrors }
    }

    let consolidatedPollenDataset: PollenData[] = []
    Object.entries(sheetsWithRawData).map(([sheetName, sheet]) => {
        try {
            const parsedPollenDataset = parseWorksheet(sheet)
            consolidatedPollenDataset =
                consolidatedPollenDataset.length === 0
                    ? parsedPollenDataset
                    : combinePollenDatasets(consolidatedPollenDataset, parsedPollenDataset)
        } catch (e: any) {
            parsingErrors.push(
                `Worksheet '${sheetName}' couldn't be parsed because this error occurred: ${e.message}\n\n
                Take a look at the assumptions the parsing algorithm makes. 
                This could also be a bug with the parsing algorithm, so report to developers 🙂.`
            )
        }
    })

    return {
        pollenDataset: consolidatedPollenDataset.length ? consolidatedPollenDataset : null,
        errors: parsingErrors.length ? parsingErrors : undefined,
    }
}

function combinePollenDatasets(pollenDataset1: PollenData[], pollenDataset2: PollenData[]): PollenData[] {
    let combinedDataset = pollenDataset1
    let existingPollenTypes = combinedDataset.map((pollenType) => pollenType.pollenName)

    pollenDataset2.map((pollenData) => {
        // ⚠️ assume the pollen name is the same in both sheets
        // ⚠️ NOTE: pollen name is the one outside round brackets or cell value is there are no brackets
        const existingIndex = existingPollenTypes.findIndex((name) => name === pollenData.pollenName)
        if (existingIndex === -1) {
            combinedDataset.push(pollenData)
        } else {
            // ⚠️ assume no date in a sheet as also in another sheet
            // BUT if the same date is in 2 different sheets, then use the pollen value from the last sheet
            combinedDataset[existingIndex].pollenValues.push(...pollenData.pollenValues)
        }
    })
    return combinedDataset
}

function parseWorksheet(worksheet: WorkSheet): PollenData[] {
    const rows = utils.sheet_to_json<{ [col: string]: any }>(worksheet, { header: "A", raw: false })

    // ⚠️ assume dates are in the first row
    const dates = rows[0]

    let lastPollenRow = -1

    const pollenTypeValues = rows.slice(1).map((row) => row.A)
    const remainingColumns = rows.slice(1).map((row) => {
        delete row.A
        return row
    })

    pollenTypeValues.map((pollenNameValue, index) => {
        // ⚠️ assume pollen names are in column A AND start at row 2
        if (!(typeof pollenNameValue === "string") || pollenNameValue === "")
            throw Error(
                `Cell A${2 + index} doesn't seem to be a pollen name: ${pollenNameValue}. 
                Values in Column A from Row 2 onwards are expected to be pollen names,
                and the value in the last populated Row in Column A should be "Total pollen counted".`
            )
        // ⚠️ assume pollen values are in column B or to the right of column B AND start at row 2
        // ⚠️ assume last pollen name is "Total pollen counted"
        // ⚠️ assume last pollen values are the same row as ☝️
        if (pollenNameValue.toLowerCase() === "total pollen counted") {
            lastPollenRow = index + 2
        }
    })

    if (lastPollenRow === -1) {
        throw Error(
            `A cell containing 'Total pollen counted' was not found in Column A. 
            This is used to determine how many pollen types are in the spreadsheet.`
        )
    }

    const pollenDataset: PollenData[] = []

    for (let i = 0; i < pollenTypeValues.length; i++) {
        const pType = pollenTypeValues[i]
        const pName = pType.split("(")[0]
        // ⚠️ assume scientific name is within round brackets i.e. name (scientific name)
        let pScientificName: string | undefined
        try {
            pScientificName = pType.split("(")[1].split(")")[0]
        } catch (e) {
            pScientificName = undefined
        }

        const data = remainingColumns[i]
        const pValues: PollenValue[] = []
        Object.entries(dates).map(([col, date]) => {
            const pRawValue = data[col]
            let pValue: number | undefined
            try {
                pValue = parseInt(pRawValue)
            } catch (e) {
                pValue = undefined
            }
            pValues.push({ date: date, value: pValue })
        })

        pollenDataset.push({
            pollenName: pName,
            pollenScientificName: pScientificName,
            pollenValues: pValues,
        })
    }

    return pollenDataset
}
