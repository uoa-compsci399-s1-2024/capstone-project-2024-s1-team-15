"use client"

import React, { useEffect, useState, useRef } from "react"
import { parse } from "./parseExcel"

import assumptions from "./assumptions made to parse excel file"

export default function EditPollen() {
    const [errorMessage, setErrorMessage] = useState(null as string | null)
    const fileInputReference = useRef(null)
    const [inputFileWithValidFileType, setInputFileWithValidFileType] = useState(null as null | File)

    useEffect(() => {
        if (errorMessage) setInputFileWithValidFileType(null)
    }, [errorMessage])

    useEffect(() => {
        if (!inputFileWithValidFileType) return

        inputFileWithValidFileType.arrayBuffer().then((res) => parse(res))
    }, [inputFileWithValidFileType])

    function validateInputFileType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!fileInputReference.current) return

        const fileInputElement: HTMLInputElement = fileInputReference.current

        if (!fileInputElement.files?.length || !fileInputElement.files[0]) return setErrorMessage("No file uploaded")

        const uploadedFile = fileInputElement.files[0]

        console.log({ uploadedFile })

        if (!uploadedFile.name.includes(".xlsx"))
            return setErrorMessage(
                `The file you have uploaded doesn't seem to be an Excel spreadsheet. The filename '${uploadedFile.name}' doesn't have '.xlsx'`
            )

        setErrorMessage(null)
        setInputFileWithValidFileType(uploadedFile)
    }

    return (
        <>
            <form className="flex flex-col items-start gap-2">
                <label>
                    <span>Upload .xlsx spreadsheet file with pollen data</span>
                    <br />
                    <input type="file" ref={fileInputReference} />
                </label>

                <button type="submit" className="button" onClick={validateInputFileType}>
                    Preview data
                </button>
                {errorMessage && <p className="form-error">{errorMessage}</p>}
            </form>

            {inputFileWithValidFileType && <div>Preview generated ✅</div>}

            <section className="mt-20">
                <h3 className="text-4xl mb-5">Assumptions ⚠️</h3>
                <p>
                    The parsing algorithm that attempts to understand your Excel file input makes the following
                    assumptions:
                </p>
                <ul className="list-disc pl-4 mt-5">
                    {assumptions.map((assumption) => {
                        return <li key={assumption}>{assumption}</li>
                    })}
                </ul>
            </section>
        </>
    )
}
