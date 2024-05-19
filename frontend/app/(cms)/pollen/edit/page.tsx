"use client"

import React, { useEffect, useState, useRef } from "react"
import { PollenData } from "@aapc/types"
import { parseSpreadsheet } from "./util/parseExcel"
import { PollenCalendar } from "@/app/components/pollen"
import parseAssumptions from "./util/parseAssumptions"
import Link from "next/link"
import { createPollenData } from "@/app/services/pollen"
import { useAuth } from "@/app/lib/hooks"

type ParseError = {
    message: string
    errors?: string[]
}

type Nullable<T> = T | null

export default function EditPollen() {
    const fileInputReference = useRef(null)
    const { token } = useAuth()

    const [error, setError] = useState<Nullable<ParseError>>(null)
    const [inputFile, setInputFile] = useState<Nullable<File>>(null) // only store after filetype is checked though
    const [pollenDataset, setPollenDataset] = useState<Nullable<PollenData[]>>(null)

    const [updateDbPending, setUpdateDbPending] = useState(false)
    const [updateDbError, setUpdateDbError] = useState<null | string>(null)
    const [updateDbSuccess, setUpdateDbSuccess] = useState(false)

    useEffect(() => {
        if (!inputFile) return
        inputFile.arrayBuffer().then((res) => {
            const parseResults = parseSpreadsheet(res)
            parseResults.errors &&
                setError({
                    message: "These errors occurred while trying to parse the Excel spreadsheet:",
                    errors: parseResults.errors,
                })

            // even with errors, if something was parsed, show a preview for it
            parseResults.pollenDataset && setPollenDataset(parseResults.pollenDataset)
        })
    }, [inputFile])

    function validateInputFileType(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!fileInputReference.current) return
        const fileInputElement: HTMLInputElement = fileInputReference.current
        if (!fileInputElement.files?.length || !fileInputElement.files[0]) {
            return setError({
                message: "No file uploaded.",
            })
        }
        const uploadedFile = fileInputElement.files[0]

        if (!uploadedFile.name.endsWith(".xlsx")) {
            return setError({
                message: `Uploaded file '${uploadedFile.name}' is not a .xlsx Excel spreadsheet.`,
            })
        }
        setError(null)
        setInputFile(uploadedFile)
    }

    async function updateDatabase(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()

        if (!pollenDataset) return

        setUpdateDbPending(true)

        const updateDatabaseResponse = await createPollenData(pollenDataset, { token })

        if (updateDatabaseResponse.status === 201) {
            setUpdateDbError(null)
            setUpdateDbSuccess(true)
        } else {
            setUpdateDbError(await updateDatabaseResponse.json())
            setUpdateDbSuccess(false)
        }

        setUpdateDbPending(false)
    }

    return (
        <>
            <form className="flex flex-col items-start gap-2">
                <label>
                    <p>Upload .xlsx Excel spreadsheet containing pollen data</p>
                    <input type="file" ref={fileInputReference} />
                </label>

                <button type="submit" className="button" onClick={validateInputFileType}>
                    Preview data
                </button>
                {error &&
                    (error.errors ? (
                        <>
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
                    ) : (
                        <p className="form-error">{error.message}</p>
                    ))}
            </form>

            {inputFile && pollenDataset && (
                <div className="mt-10">
                    <h3 className="font-bold text-2xl my-2">Preview generated ✅</h3>
                    <PollenCalendar pollenData={pollenDataset}></PollenCalendar>

                    <button type="submit" disabled={updateDbPending} className="button" onClick={updateDatabase}>
                        {updateDbPending ? "Updating..." : "Update calendar on website"}
                    </button>

                    {updateDbError && <p className="form-error">{updateDbError}</p>}
                    {updateDbSuccess && (
                        <p className="form-success">
                            Pollen Calendar has been updated. Take a look here: <Link href="/pollen">Pollen Page</Link>
                        </p>
                    )}
                </div>
            )}

            {error && (
                <section className="mt-20">
                    <h2 className="text-2xl font-bold mb-5">Parser Assumptions ️</h2>
                    <p>
                        The parsing algorithm that attempts to understand your Excel spreadsheet operates under these
                        assumptions:
                    </p>
                    <ul className="list-disc pl-4 mt-5">
                        {parseAssumptions.map((assumption) => {
                            return <li key={assumption}>{assumption}</li>
                        })}
                    </ul>
                </section>
            )}
        </>
    )
}
