import {
    IoAddCircleOutline, IoCalendarNumberOutline, IoChevronBackOutline, IoChevronForwardOutline,
    IoCloseOutline,
    IoCloudUploadOutline,
    IoColorWandOutline,
    IoEyeOutline, IoFilterOutline,
    IoInformationCircleOutline,
    IoLogInOutline,
    IoLogOutOutline, IoMenuOutline,
    IoPencilOutline,
    IoPersonAddOutline,
    IoPersonOutline, IoSendOutline,
    IoTrashOutline
} from "react-icons/io5"
import React from "react"

const icons =  {
    "signup": <IoPersonAddOutline size={"100%"}/>,
    "login": <IoLogInOutline size={"100%"}/>,
    "logout": <IoLogOutOutline size={"100%"}/>,
    "user": <IoPersonOutline size={"100%"}/>,
    "add": <IoAddCircleOutline size={"100%"}/>,
    "edit": <IoPencilOutline size={"100%"}/>,
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
}

export default icons
