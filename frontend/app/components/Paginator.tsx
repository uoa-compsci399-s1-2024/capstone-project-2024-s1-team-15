'use client'

import React, { SetStateAction } from "react"
import { IPaginator } from "@aapc/types"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

interface PaginatorProps {
    paginator: IPaginator<any>
    setPage: React.Dispatch<SetStateAction<number>>
}

export default function Paginator({ paginator, setPage }: PaginatorProps) {
    const resultEndIndex = Math.min(paginator.currentPage * paginator.resultsPerPage, paginator.totalResults)
    const resultStartIndex = Math.min((paginator.currentPage - 1) * paginator.resultsPerPage + 1)

    const handlePrevious = () => {
        if (paginator.currentPage > 1) {
            setPage(p => p - 1)
        }
    }

    const handleNext = () => {
        if (paginator.currentPage < paginator.lastPage) {
            setPage(p => p + 1)
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between" aria-label="Pagination">
                <Button
                    onClick={handlePrevious}
                    text={"Previous"}
                    icon={icons.back}
                    disabled={paginator.currentPage === 1}
                    leftIcon
                />
                <div className={"flex flex-col md:flex-row gap-x-1.5 text-center uppercase text-gray-500"}>
                    <p className={"block smallest"}>
                        Page <b className={"font-semibold"}>{paginator.currentPage}</b>
                    </p>
                    <p className={"hidden md:block smallest select-none"}>
                        ·
                    </p>
                    <p className={"hidden sm:block smallest"}>
                        Showing {resultStartIndex} - {resultEndIndex} of {paginator.totalResults}
                    </p>
                </div>
                <Button
                    onClick={handleNext}
                    text={"Next"}
                    icon={icons.forward}
                    disabled={paginator.currentPage >= paginator.lastPage}
                />
            </div>
        </div>
    )
}
