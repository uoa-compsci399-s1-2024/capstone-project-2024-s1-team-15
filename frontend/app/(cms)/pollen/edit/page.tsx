"use client"

import React, { useEffect, useState, useRef } from "react"
import { PollenData } from "@aapc/types"
import { parseSpreadsheet } from "./util/parseExcel"
import { PollenCalendar } from "@/app/components/pollen"
import parseAssumptions from "./util/parseAssumptions"
import { createPollenData } from "@/app/services/pollen"
import { useAuth } from "@/app/lib/hooks"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons";
import ButtonLink from "@/app/components/ButtonLink"

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

    function validateInputFileType() {
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

    async function updateDatabase() {
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
            <h1 className={"page-title"}>Update Pollen Data</h1>
            <form className="flex flex-col items-start gap-y-2">
                <div className={"mb-4"}>
                    <label className={"form-label"}>Excel (.xlsx) spreadsheet upload</label>
                    <input className={"block mt-1 w-full"} type="file" ref={fileInputReference} accept={`.xlsx`} />
                </div>
                <div className={"flex flex-row gap-x-6"}>
                    <ButtonLink
                        theme={"secondary"}
                        text={"Back"}
                        icon={icons.back}
                        href={"/pollen"}
                        leftIcon
                    />
                    <Button
                        theme={"green"}
                        onClick={validateInputFileType}
                        text={"Preview Data"}
                        icon={icons.eye}
                    />
                </div>
                {error &&
                    (error.errors ? (
                        <div className={"mt-2"}>
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
                        </div>
                    ) : (
                        <p className="form-error">{error.message}</p>
                    ))
                }
            </form>

            {inputFile && pollenDataset && (
                <div className="mt-10">
                    <h3 className="font-bold text-2xl my-2">Preview generated</h3>
                    <PollenCalendar pollenData={pollenDataset}></PollenCalendar>
                    <div className={"mt-4 flex flex-row gap-x-6"}>
                        <ButtonLink
                            href={"/pollen"}
                            theme={"secondary"}
                            text={"Back"}
                            icon={icons.back}
                            leftIcon
                        />
                        <Button
                            disabled={updateDbPending}
                            theme={"cms-green"}
                            onClick={updateDatabase}
                            text={updateDbPending ? "Updating..." : "Update Pollen Data"}
                            icon={icons.upload}
                        />
                    </div>


                    {updateDbError && <p className="form-error">{updateDbError}</p>}

                    {updateDbSuccess && (
                        <p className="form-success mt-4">
                            Pollen Data has been successfully updated.
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
