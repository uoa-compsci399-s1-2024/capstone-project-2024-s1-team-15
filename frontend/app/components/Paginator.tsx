'use client'

import { useState } from "react"

export default function Paginator() {
    const [pages] = useState<string[]>(["1", "2", "3", "...", "8", "9", "10"]);
    const [currentPage] = useState<string>("1");

    return (
        <div className="max-w-screen-xl mx-auto mt-12 px-4 text-gray-600 md:px-8">
            <div className="hidden justify-between text-sm md:flex">
                <div>SHOWING 1-10 OF 100</div>
                <div className="flex items-center gap-12" aria-label="Pagination">
                    <a href="#" className="button">
                        Previous
                    </a>
                    <ul className="flex items-center gap-1">
                        {pages.map((item) => (
                            <li key={item}>
                                {item === "..." ? (
                                    <div>{item}</div>
                                ) : (
                                    <a
                                        href="#"
                                        aria-current={currentPage === item ? "page" : false}
                                        className={`px-3 py-2 rounded-lg button ${
                                            currentPage === item
                                                ? "button"
                                                : ""
                                        }`}
                                    >
                                        {item}
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                    <a href="#" className="button">
                        Next
                    </a>
                </div>
            </div>
            {/* Mobile view */}
            <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
                <a
                    href="#"
                    className="px-4 py-2 border rounded-lg button"
                >
                    Previous
                </a>
                <div className="font-medium">Showing 1-10 OF 100</div>
                <a
                    href="#"
                    className="px-4 py-2 border rounded-lg button"
                >
                    Next
                </a>
            </div>
        </div>
    )
}