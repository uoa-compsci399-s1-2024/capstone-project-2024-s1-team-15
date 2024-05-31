import {
    IoAddCircleOutline,
    IoAlertCircleOutline,
    IoCalendarNumberOutline,
    IoCheckmark,
    IoChevronBackOutline,
    IoChevronForwardOutline,
    IoCloseOutline,
    IoCloudUploadOutline,
    IoColorWandOutline,
    IoEyeOutline,
    IoFilterOutline,
    IoImageOutline,
    IoInformationCircleOutline,
    IoKeyOutline, IoLinkOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoMenuOutline, IoPeopleCircleOutline,
    IoPersonAddOutline,
    IoPersonCircleOutline, IoPersonOutline,
    IoPowerOutline,
    IoReload,
    IoSendOutline,
    IoTrashOutline
} from "react-icons/io5"
import React from "react"
import { HiOutlinePencilSquare } from "react-icons/hi2";

const icons =  {
    "signup": <IoPersonAddOutline size={"100%"}/>,
    "login": <IoLogInOutline size={"100%"}/>,
    "logout": <IoLogOutOutline size={"100%"}/>,
    "user": <IoPersonCircleOutline size={"100%"}/>,
    "add": <IoAddCircleOutline size={"100%"}/>,
    "edit": <HiOutlinePencilSquare size={"100%"}/>,
    "trash": <IoTrashOutline size={"100%"}/>,
    "close": <IoCloseOutline size={"100%"}/>,
    "information": <IoInformationCircleOutline size={"100%"}/>,
    "wand": <IoColorWandOutline size={"100%"}/>,
    "eye": <IoEyeOutline size={"100%"}/>,
    "upload": <IoCloudUploadOutline size={"100%"}/>,
    "burger": <IoMenuOutline size={"100%"}/>,
    "back": <IoChevronBackOutline size={"100%"}/>,
    "forward": <IoChevronForwardOutline size={"100%"}/>,
    "filter": <IoFilterOutline size={"100%"}/>,
    "calendar": <IoCalendarNumberOutline size={"100%"}/>,
    "send": <IoSendOutline size={"100%"}/>,
    "alert": <IoAlertCircleOutline size={"100%"}/>,
    "image": <IoImageOutline size={"100%"}/>,
    "reload": <IoReload size={"100%"}/>,
    "key": <IoKeyOutline size={"100%"}/>,
    "deactivate": <IoPowerOutline size={"100%"}/>,
    "check": <IoCheckmark size={"100%"}/>,
    "link": <IoLinkOutline size={"100%"}/>,
    "users": <IoPeopleCircleOutline size={"100%"}/>,
    "person": <IoPersonOutline size={"100%"}/>
}

export default icons
