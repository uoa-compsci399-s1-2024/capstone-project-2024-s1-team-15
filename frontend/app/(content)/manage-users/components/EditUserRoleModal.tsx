import { IUser, UserScope } from "@aapc/types"
import React, { Dispatch, ForwardedRef, forwardRef, SetStateAction, useState } from "react"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"
import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import { editUserScope } from "@/app/services/user"
import Modal from "@/app/components/modals/components/Modal"
import Select from "react-select"
import Button from "@/app/components/Button"
import icons from "@/app/lib/icons"

type UserRoleOption = {
    value: UserScope[]
    label: string
}

type EditUserRoleModalProps = {
    user: IUser,
    setUser: Dispatch<SetStateAction<IUser>>
}

const EditUserRoleModal = forwardRef(
    function EditUserRoleModal({ user, setUser }: EditUserRoleModalProps, ref: ForwardedRef<ModalRef>) {
        const { token } = useAuth()
        const [hidden, setHidden] = useModal(`${user.username}-edit-role`, ref)
        const [selectedRole, setSelectedRole] = useState<Nullable<UserRoleOption>>(null)
        const [pending, setPending] = useState(false)
        const [success, setSuccess] = useState(false)
        const [error, setError] = useState<Nullable<string>>(null)

        const roles: UserRoleOption[] = [
            {
                value: [UserScope.user, UserScope.regular],
                label: "Regular User"
            },
            {
                value: [UserScope.user, UserScope.regular, UserScope.premium],
                label: "Premium User"
            },
            {
                value: [UserScope.user, UserScope.regular, UserScope.premium, UserScope.maintainer],
                label: "Site Maintainer"
            },
            {
                value: [UserScope.user, UserScope.regular, UserScope.premium, UserScope.maintainer, UserScope.admin],
                label: "Site Admin"
            },
        ]

        const handleEdit = () => {
            setSuccess(false)
            setError(null)
            if (!selectedRole) return
            setPending(true)
            editUserScope(user.username, selectedRole.value, { token }).then(r => {
                if (r.success) {
                    setPending(false)
                    setSuccess(true)
                    setUser && setUser(r.result)
                } else {
                    setPending(false)
                    setError(r.message)
                }
            })
        }

        let currentOption = roles[0]
        if (user.scopes.includes(UserScope.admin)) {
            currentOption = roles[3]
        } else if (user.scopes.includes(UserScope.maintainer)) {
            currentOption = roles[2]
        } else if (user.scopes.includes(UserScope.premium)) {
            currentOption = roles[1]
        }
        return (
            <Modal modalId={`${user.username}-edit-role`} hidden={hidden}
                   innerClassName={`flex flex-row gap-x-3 justify-between bg-white`}>
                <div className={"grow min-h-72 flex flex-col justify-between"}>
                    <div>
                        <p className={"form-label"}>Editing @{user.username}&apos;s role</p>
                        <Select
                            options={roles}
                            isSearchable={true}
                            className={"min-w-44"}
                            defaultValue={currentOption}
                            onChange={e => {
                                setSelectedRole(e)
                            }}
                        />
                        <div className={"my-6"}>
                            <p className={"smallest text-slate-800 mt-4"}>
                                If you wish to give access for a user to manage site content, grant them the <b
                                className={"font-semibold"}>Site Maintainer</b> role.
                            </p>
                            <p className={"smallest text-red-500 mt-4"}>
                                Granting other users the <b className={"font-semibold"}>Site Admin</b> role also grants
                                them the permission to <b className={"font-semibold"}>remove that role from you</b>!
                            </p>
                            <p className={"smallest text-red-500 mt-4 font-semibold"}>
                                Only grant the Site Admin role to users you trust.
                            </p>
                        </div>
                    </div>
                    <div>
                        {success &&
                            <p className={"form-success mb-2"}>Successfully edited user scope.</p>
                        }
                        {error &&
                            <p className={"form-error mb-2"}>{error}</p>
                        }
                        <div className={"flex flex-row gap-x-4"}>
                            <Button
                                theme={"secondary"}
                                icon={icons.back}
                                text={"Back"}
                                onClick={() => setHidden(true)}
                                leftIcon
                            />
                            <Button
                                theme={"green"}
                                disabled={pending}
                                icon={icons.edit}
                                text={pending ? "Editing..." : "Edit"}
                                onClick={handleEdit}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    theme={"secondary"}
                    icon={icons.close}
                    onClick={() => setHidden(true)}
                />
            </Modal>
        )
    }
)

export default EditUserRoleModal
