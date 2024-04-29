"use client"

import React, { useEffect, useState, useRef } from "react"
import { parse } from "./parseExcel"

import assumptions from "./assumptions made to parse excel file"
import { PollenData } from "./PollenDataType"
import PollenCalendar from "@/app/components/pollenCalendar"

export default function EditPollen() {
    const [errorMessages, setErrorMessages] = useState(null as string[] | null)
    const fileInputReference = useRef(null)
    const [inputFileWithValidFileType, setInputFileWithValidFileType] = useState(null as null | File)
    const [pollenDataset, setPollenDataset] = useState(null as null | PollenData)

    useEffect(() => {
        if (!inputFileWithValidFileType) return

        inputFileWithValidFileType.arrayBuffer().then((res) => {
            const parseResults = parse(res)

            setPollenDataset(parseResults.pollenDataset)

            if (parseResults.errors.length) {
                setErrorMessages([
                    "These errors occured while trying to parse (understand) the excel spreadsheet:",
                    ...parseResults.errors,
                ])
            }
        })
    }, [inputFileWithValidFileType])

    function validateInputFileType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!fileInputReference.current) return

        const fileInputElement: HTMLInputElement = fileInputReference.current

        if (!fileInputElement.files?.length || !fileInputElement.files[0]) return setErrorMessages(["No file uploaded"])

        const uploadedFile = fileInputElement.files[0]

        console.log({ uploadedFile })

        if (!uploadedFile.name.includes(".xlsx"))
            return setErrorMessages([
                `The file you have uploaded doesn't seem to be an Excel spreadsheet. The filename '${uploadedFile.name}' doesn't have '.xlsx'`,
            ])

        setErrorMessages(null)
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

                {errorMessages?.length &&
                    (errorMessages.length === 1 ? (
                        <p className="form-error">{errorMessages[0]}</p>
                    ) : (
                        <>
                            <p className="form-error font-bold"> {errorMessages[0]} </p>
                            <ul className="list-disc pl-4 mt-5">
                                {errorMessages.slice(1).map((msg) => {
                                    return (
                                        <li key={msg}>
                                            <p className="form-error">{msg}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    ))}
            </form>

            {inputFileWithValidFileType && pollenDataset && (
                <div className="mt-10">
                    <h3 className="font-bold text-2xl my-2">Preview generated ✅</h3>
                    <PollenCalendar pollenData={pollenDataset}></PollenCalendar>

                    <button type="submit" className="button" onClick={() => {}}>
                        Update calendar on website
                    </button>
                </div>
            )}

            {inputFileWithValidFileType && errorMessages && (
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
            )}
        </>
    )
}
