"use client"

import React, { Dispatch, ForwardedRef, forwardRef, SetStateAction, useEffect, useRef, useState } from "react"
import Select from "react-select"
import { IPaginator, IUser, UserScope } from "@aapc/types"
import { useAuth } from "@/app/lib/hooks"
import { Nullable } from "@/app/lib/types"
import { editUserScope, getUsers } from "@/app/services/user"
import DisplayIcon from "@/app/components/DisplayIcon"
import Paginator from "@/app/components/Paginator"
import SearchBar from "@/app/components/SearchBar"
import { UserScopeLabel } from "@/app/(auth)/components"
import ButtonLink from "@/app/components/ButtonLink"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"
import Modal from "@/app/components/modals/components/Modal"
import useModal, { ModalRef } from "@/app/lib/hooks/useModal"

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
            <Modal modalId={`${user.username}-edit-role`} hidden={hidden} innerClassName={`flex flex-row gap-x-3 justify-between bg-white`}>
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
                                Granting other users the <b className={"font-semibold"}>Site Admin</b> role also grants them the permission to <b className={"font-semibold"}>remove that role from you</b>!
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


function ManageUserCard({ user, isSelf }: { user: IUser, isSelf: boolean }) {
    const editRoleModalRef = useRef<ModalRef>(null)
    const [_user, setUser] = useState(user)

    return (
        <>
            <EditUserRoleModal user={_user} setUser={setUser} ref={editRoleModalRef}/>
            <div className={"flex flex-col md:flex-row md:justify-between px-3 py-2 gap-y-3 gap-x-4 rounded-2xl hover:bg-gray-100 transition"}>
                <div className={"flex flex-row gap-x-2.5 items-center"}>
                    <DisplayIcon
                        src={_user.iconSrc}
                        displayName={_user.displayName}
                        nextSize={32}
                        className={"h-10 w-10 drop-shadow-md"}
                    />
                    <div className={"flex flex-col w-96"}>
                        <div className={"flex flex-row gap-x-2 items-center"}>
                            <p className={"font-medium truncate"}>{_user.displayName}</p>
                            <UserScopeLabel scopes={_user.scopes}/>
                        </div>
                        <p className={"smallest text-gray-500 truncate"}>@{_user.username}</p>
                    </div>
                </div>
                <div className={"flex flex-row gap-x-2.5 items-center"}>
                    <ButtonLink
                        href={`/profile/${_user.username}`}
                        text={"Go To Profile"}
                        icon={icons.person}
                        theme={"secondary"}
                    />
                    <Button
                        disabled={isSelf}
                        theme={"cms-green"}
                        title={isSelf ? "You cannot edit your own role." : undefined}
                        text={"Edit Role"}
                        icon={icons.edit}
                        onClick={() => editRoleModalRef.current && editRoleModalRef.current.showModal()}
                    />
                </div>
            </div>
        </>
    )
}

export default function ManageUsersPage() {
    const { user, token } = useAuth()
    const [userP, setUserP] = useState<Nullable<IPaginator<IUser>>>(null)
    const [page, setPage] = useState<number>(1)
    const [userSearchTerm, setUserSearchTerm] = useState<string | undefined>(undefined)

    useEffect(() => {
        getUsers(userSearchTerm, { page, perPage: 10 }, { token }).then(r => {
            if (r.success) {
                setUserP(r.result)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSearchTerm, page])

    return (
        <div>
            <h1 className={"page-title"}>Manage Users</h1>
            <div className={"mb-4"}>
                <p className={"form-label"}>Search by username</p>
                <SearchBar onSearchInputChange={i => setUserSearchTerm(i)}/>
            </div>
            {userP && user &&
                <>
                    <Paginator paginator={userP} setPage={setPage}/>
                    <div className={"space-y-4 mt-4"}>
                        {userP.data.map(u =>
                            <ManageUserCard user={u} key={u.username} isSelf={u.username === user.username}/>
                        )}
                    </div>
                </>
            }
        </div>
    )
}