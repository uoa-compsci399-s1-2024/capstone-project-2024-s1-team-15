import Button from "@/app/components/Button";
import icons from "@/app/lib/icons";
import React from "react";
import { useFormState } from "react-dom";
import { FormState } from "@/app/(content)/my-account/page";

type Props = {
    displayName: string,
    onSuccess?: () => void
}

export default function EditDisplayNameForm({ displayName, onSuccess }: Props) {
    const [formState, formAction] = useFormState<FormState>(
        async (_: FormState, formData?: any): Promise<FormState> => {
            const displayName = formData?.get("displayName")
            if (!displayName) return { error: "You must enter a display name." }
            onSuccess && onSuccess()
            return { successMessage: "Display name has been successfully changed." }
        }, {}
    )

    return (
        <form className={"space-y-2"} action={formAction}>
            <div className={"max-w-full flex flex-col"}>
                <label className={"form-label"} htmlFor={"displayName"}>Display Name</label>
                <div className={`flex items-center justify-self-start gap-x-6 gap-y-2 flex-shrink-0 flex-wrap
                    md:flex-row md:flex-nowrap
                `}>
                    <input
                        id={"displayName"} name={"displayName"} type={"text"}
                        className={"form-input max-w-96"}
                        placeholder={"John Doe"}
                        defaultValue={displayName}
                    />
                    <Button type={"submit"} theme={"green"} text={"Change Display Name"} icon={icons.edit}/>
                </div>
            </div>
            <div className={"ml-2"}>
                {formState.error &&
                    <p className={"form-error"}>{formState.error}</p>
                }
                {formState.successMessage &&
                    <p className={"form-success"}>{formState.successMessage}</p>
                }
            </div>
        </form>
    )
}