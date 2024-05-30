import React, { ChangeEvent, Dispatch, SetStateAction } from "react"

type ConfirmationCodeInputProps = {
    setIsValidCode: Dispatch<SetStateAction<boolean>>
    id?: string
}

export default function ConfirmationCodeInput({ setIsValidCode, id = "code" }: ConfirmationCodeInputProps) {
    const codeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 6 && !isNaN(Number(e.target.value))) {
            setIsValidCode(true)
            return
        }
        setIsValidCode(false)
    }

    return (
        <input
            id={id}
            name={"code"}
            className={`form-input block !text-3xl !h-16 max-w-56 text-gray-700 tracking-[7px] font-medium !rounded-full text-center`}
            type={"text"}
            placeholder={"000000"}
            maxLength={6}
            onChange={codeInputHandler}
        />
    )
}
