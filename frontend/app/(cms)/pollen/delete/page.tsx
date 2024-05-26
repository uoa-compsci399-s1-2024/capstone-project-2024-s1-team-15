"use client"

import React, { useState } from "react"
import Link from "next/link"
import { deletePollenData } from "@/app/services/pollen"
import { useAuth } from "@/app/lib/hooks"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"

export default function DeletePollenData() {
    const [deletePending, setDeletePending] = useState(false)
    const [deleteDataError, setDeleteDataError] = useState<null | string>(null)
    const [deleteDataSuccess, setDeleteDataSuccess] = useState(false)

    const { token } = useAuth()

    async function deleteFromDatabase() {
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
            <Button
                theme={'red'}
                type={"submit"}
                disabled={deletePending}
                onClick={deleteFromDatabase}
                text={deletePending ? "Deleting..." : "Delete All Pollen Data"}
                icon={icons.trash}
            />
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
