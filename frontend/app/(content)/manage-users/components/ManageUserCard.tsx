import { IUser } from "@aapc/types"
import React, { useRef, useState } from "react"
import { ModalRef } from "@/app/lib/hooks/useModal"
import EditUserRoleModal from "@/app/(content)/manage-users/components/EditUserRoleModal"
import DisplayIcon from "@/app/components/DisplayIcon"
import { UserScopeLabel } from "@/app/(auth)/components"
import ButtonLink from "@/app/components/ButtonLink"
import icons from "@/app/lib/icons"
import Button from "@/app/components/Button"

export default function ManageUserCard({ user, isSelf }: { user: IUser, isSelf: boolean }) {
    const editRoleModalRef = useRef<ModalRef>(null)
    const [_user, setUser] = useState(user)

    return (
        <>
            <EditUserRoleModal user={_user} setUser={setUser} ref={editRoleModalRef}/>
            <div
                className={"flex flex-col md:flex-row md:justify-between px-3 py-2 gap-y-3 gap-x-4 rounded-2xl hover:bg-gray-100 transition"}>
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