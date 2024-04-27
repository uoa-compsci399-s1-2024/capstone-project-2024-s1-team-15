const assumptions = [
    '⚠️assume relevent worksheets have "raw" in them',

    " ⚠️assume the pollen name is the same in both sheets",
    " ⚠️NOTE: pollen name is the one outside of round brackets or cell value is there are no brackets",

    " ⚠️assume pollen names are in column A AND start at row 2",

    " ⚠️assume pollen values are in column B or to the right of column B AND start at row 2",

    ' ⚠️ assume last pollen name is "Total pollen counted"',
    ' ⚠️ assume last pollen values are the same row as ☝️ "Total pollen counted"',

    " ⚠️assume scientific name is within round brackets i.e. name (scientific name)",

    " ⚠️assume dates are in the first row",

    " ⚠️assume pollen values are integers (not floats)",

    " ⚠️assume if not integer, then there is no pollen value for this date",

    " ⚠️assume the column of the pollen value = the column for the date it was recorded at",
]

export default assumptions
