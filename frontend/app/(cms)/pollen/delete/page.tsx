"use client"

import { useAuth } from "@/app/lib/hooks"
import { deletePollenData } from "@/app/services/pollen"
import Link from "next/link"
import { useState } from "react"

export default function DeletePollenData() {
    const [deletePending, setDeletePending] = useState(false)
    const [deleteDataError, setDeleteDataError] = useState<null | string>(null)
    const [deleteDataSuccess, setDeleteDataSuccess] = useState(false)

    const { token } = useAuth()

    async function deleteFromDatabase(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setDeletePending(true)

        const deleteDataResponse = await deletePollenData({ token })

        if (deleteDataResponse.status === 200) {
            setDeleteDataError(null)
            setDeleteDataSuccess(true)
        } else {
            setDeleteDataError(await deleteDataResponse.json())
            setDeleteDataSuccess(false)
        }

        setDeletePending(false)
    }

    return (
        <>
            Click button to delete all pollen data from the database
            <button
                type="submit"
                disabled={deletePending}
                onClick={deleteFromDatabase}
                className="button bg-red-400 cms ">
                {deletePending ? "Deleting" : "Delete"}
            </button>
            {deleteDataError && <p className="form-error">{deleteDataError}</p>}
            {deleteDataSuccess && (
                <p className="form-success">
                    Pollen data for pollen calendar has been deleted. Take a look here:{" "}
                    <Link href="/pollen">Pollen Page</Link>
                    <br />
                    <br />
                    To add pollen data via an excel spreadsheet, click <Link href="/pollen/edit">here</Link>.
                </p>
            )}
        </>
    )
}
