import { useEffect, useState } from "react";
import { Nullable } from "@/app/lib/types"

const isServer = typeof window === "undefined"

export default function useLocalStorage(key: string, initialValue: Nullable<string>): [Nullable<string>, (v: Nullable<string>) => void] {
    const [value, setStateValue] = useState<Nullable<string>>(initialValue)

    useEffect(() => {
        const storedValue = localStorage.getItem(key)
        setStateValue(storedValue ? storedValue : initialValue)
    }, [])

    const setValue = (value: Nullable<string>) => {
        if (!isServer) {
            if (!value) {
                localStorage.removeItem(key)
            } else {
                localStorage.setItem(key, value)
            }
        }
        setStateValue(value)
    }

    return [value, setValue]
}
