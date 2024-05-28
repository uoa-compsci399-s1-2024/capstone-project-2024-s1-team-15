'use client'

import React, { FC, SetStateAction } from "react"
import { useState } from "react"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"


interface PaginatorProps {
    currentPage: number
    setCurrentPage: React.Dispatch<SetStateAction<number>>
    lastPage: number
}

const Paginator: FC<PaginatorProps> = ({ currentPage, setCurrentPage, lastPage }) => {

    const [pages] = useState<string[]>(["1", "2", "3", "...", "8", "9", "10"])

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(p => p - 1)
        }
    };

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(p => p + 1)
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden justify-between text-sm md:flex">
                <div>SHOWING 15 RESULTS PER PAGE</div>
                <div className="flex items-center gap-12" aria-label="Pagination">
                    <Button
                        onClick={handlePreviousPage}
                        text={"Previous"}
                        icon={icons.back}
                        disabled={currentPage === 1}
                        leftIcon
                    />
                    <ul className="flex items-center gap-1">
                        {pages.map((item) => (
                            <li key={item}>
                                {/*<Button text={item} />*/}
                                {/*{item === "..." ? (*/}
                                {/*    <div>{item}</div>*/}
                                {/*) : (*/}
                                {/*    <a*/}
                                {/*        href="#"*/}
                                {/*        aria-current={currentPage === item ? "page" : false}*/}
                                {/*        className={`px-3 py-2 rounded-lg button ${*/}
                                {/*            currentPage === item*/}
                                {/*                ? "button"*/}
                                {/*                : ""*/}
                                {/*        }`}*/}
                                {/*    >*/}
                                {/*        {item}*/}
                                {/*    </a>*/}
                                {/*)}*/}
                            </li>
                        ))}
                    </ul>
                    <Button
                        onClick={handleNextPage}
                        text={"Next"}
                        icon={icons.forward}
                        disabled={currentPage === lastPage}
                    />
                </div>
            </div>
            {/* Mobile view */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                <Button
                    onClick={handlePreviousPage}
                    text={"Previous"}
                    icon={icons.back}
                    disabled={currentPage === 1}
                    leftIcon
                />
                <div className="font-medium">SHOWING 15 RESULTS PER PAGE</div>
                <Button
                    onClick={handleNextPage}
                    text={"Next"}
                    icon={icons.forward}
                    disabled={currentPage === lastPage}
                />
            </div>
        </div>
    )
}

export default Paginator