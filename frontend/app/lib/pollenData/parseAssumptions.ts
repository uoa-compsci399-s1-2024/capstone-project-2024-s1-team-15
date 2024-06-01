const parseAssumptions = [
    'Assume relevant worksheets in spreadsheet contain "raw" in its name',

    "Assume Row 1 contains dates",

    "Assume Column A contains pollen names from Row 2 onwards",

    'Assume Column A of the last populated Row contains "Total pollen counted"',

    "Assume Column B onwards contain pollen values from Row 2 onwards",

    "Assume pollen names are consistent across all worksheets",

    "Assume the scientific name of pollen are within parentheses, i.e. Pollen Name (Scientific Name)",

    "Assume pollen values are whole numbers",

    "Assume that if a whole number value does not exist for a pollen value, then it is undefined",
]

export default parseAssumptions
