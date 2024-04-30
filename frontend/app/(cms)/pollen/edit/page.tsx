"use client"

import React, { useEffect, useState, useRef } from "react"
import { parseSpreadsheet } from "./parseExcel"

import assumptions from "./assumptions"
import { PollenData } from "./PollenDataType"

type ParseError = {
    message: string
    errors?: string[]
}

type Nullable<T> = T | null

export default function EditPollen() {
    const fileInputReference = useRef(null)

    const [error, setError] = useState<Nullable<ParseError>>(null)
    const [inputFile, setInputFile] = useState<Nullable<File>>(null)
    const [pollenDataset, setPollenDataset] = useState<Nullable<PollenData[]>>(null)

    useEffect(() => {
        if (error) setInputFile(null)
    }, [error])

    useEffect(() => {
        if (!inputFile) return
        inputFile.arrayBuffer().then((res) => {
            const parseResults = parseSpreadsheet(res)
            if (parseResults.errors) {
                setError({
                    message: "These errors occurred while trying to parse the Excel spreadsheet:",
                    errors: parseResults.errors
                })
            } else {
                setPollenDataset(parseResults.pollenDataset)
            }
        })
    }, [inputFile])

    function validateInputFileType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!fileInputReference.current) return
        const fileInputElement: HTMLInputElement = fileInputReference.current
        if (!fileInputElement.files?.length || !fileInputElement.files[0]) {
            return setError({
                message: "No file uploaded."
            })
        }
        const uploadedFile = fileInputElement.files[0]
        console.log({ uploadedFile })
        if (!uploadedFile.name.endsWith(".xlsx")) {
            return setError({
                message: "Uploaded file is not a .xlsx Excel spreadsheet."
            })
        }
        setError(null)
        setInputFile(uploadedFile)
    }

    return (
        <>
            <form className="flex flex-col items-start gap-2">
                <label>
                    <p>Upload .xlsx Excel spreadsheet containing pollen data</p>
                    <input type="file" ref={fileInputReference} />
                </label>
                <button type="submit" className="button" onClick={validateInputFileType}>Preview data</button>
                {error && (error.errors
                    ? <>
                        <p className="form-error font-bold"> {error.message} </p>
                        <ul className="list-disc pl-4 mt-5">
                            {error.errors.map((msg) => {
                                return (
                                    <li key={msg}>
                                        <p className="form-error">{msg}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                    : <p className="form-error">{error.message}</p>
                )}
            </form>

            {inputFile && pollenDataset && <div>Preview generated ✅</div>}

            <section className="mt-20">
                <h2 className="text-2xl font-bold mb-5">Parser Assumptions ️</h2>
                <p>
                    The parsing algorithm that attempts to understand your Excel spreadsheet
                    operates under these assumptions:
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
