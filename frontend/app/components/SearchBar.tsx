"use client"

export default function SearchBar({ onSearchInputChange }: { onSearchInputChange: (input: string) => void }) {
    return (
        <div className="flex justify-start relative">
            <svg className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd" />
            </svg>
            <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border-2 focus:border-primary hover:border-accent-dark rounded-lg sm:max-w-xs"
                onChange={e => onSearchInputChange(e.target.value)}
            />
        </div>
    )
}