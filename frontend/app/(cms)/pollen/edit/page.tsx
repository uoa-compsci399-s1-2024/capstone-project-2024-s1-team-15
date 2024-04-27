"use client"

import React, { useEffect, useState, useRef } from "react"

export default function EditPollen() {
    const [errorMessage, setErrorMessage] = useState(null as string | null)
    const fileInputReference = useRef(null)
    const [validInputFile, setValidInputFile] = useState(null as null | File)

    useEffect(() => {
        if (errorMessage) setValidInputFile(null)
    }, [errorMessage])

    function validateInputFile(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
        setValidInputFile(uploadedFile)
    }
    return (
        <>
            <form>
                <label>
                    <span>Upload .xlsx spreadsheet file with pollen data</span>
                    <input type="file" ref={fileInputReference} />
                </label>

                <button type="submit" onClick={validateInputFile}>
                    Preview data
                </button>
                <button type="submit">Save data</button>
                {errorMessage && <p className="form-error">{errorMessage}</p>}
            </form>

            {validInputFile && <div>Preview generated ✅</div>}
        </>
    )
}
