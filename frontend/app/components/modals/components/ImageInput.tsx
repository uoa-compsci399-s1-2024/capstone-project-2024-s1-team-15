import React, { useEffect, useState } from "react"
import { Nullable, Result } from "@/app/lib/types"
import { MAX_IMAGE_UPLOAD_SIZE, SUPPORTED_IMAGE_UPLOAD_TYPES } from "@/app/lib/consts"
import { filesize } from "filesize"
import { IoCloudUploadOutline, IoFileTrayFullOutline } from "react-icons/io5"
import Button from "@/app/components/Button"
import { fail, success } from "@/app/lib/util"

type ImageInputProps = {
    onImageReceived?: (f: File) => void
    onError?: (e: string) => void
    id?: string
}

type ImageInputDragDropProps = {
    type: "dragdrop"
}

type ImageInputBrowseProps = {
    type: "browse"
    id: string
}

type ImageInputFactoryProps = ImageInputBrowseProps | ImageInputDragDropProps

export default function ImageInput (props: ImageInputProps & ImageInputFactoryProps) {
    switch (props.type) {
        case "dragdrop":
            return <DragDropImage onImageReceived={props.onImageReceived} onError={props.onError}/>
        case "browse":
            return <BrowseImage onImageReceived={props.onImageReceived} onError={props.onError} id={props.id}/>
    }
}

function validateImage(fl: FileList): Result<File> {
    if (fl.length > 1) {
        return fail("Only one image can be selected.")
    }
    const f = fl[0]
    if (!SUPPORTED_IMAGE_UPLOAD_TYPES.includes(f.type)) {
        return fail("Only .png, .jpg, and .jpeg images are supported.")
    }
    if (f.size > MAX_IMAGE_UPLOAD_SIZE) {
        return fail(`Only images under ${filesize(MAX_IMAGE_UPLOAD_SIZE)} are supported.`)
    }
    return success(f)
}

function BrowseImage({ onImageReceived, onError, id }: ImageInputProps) {
    const [error, setError] = useState<Nullable<string>>(null)
    const [image, setImage] = useState<Nullable<File>>(null)

    useEffect(() => {
        if (error) onError && onError(error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    useEffect(() => {
        if (image) onImageReceived && onImageReceived(image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.files) return
        const r = validateImage(e.target.files)
        if (r.success) {
            setError(null)
            setImage(r.result)
        } else {
            setError(r.message)
        }
    }

    return (
        <section>
            <div className={"flex flex-row items-center gap-x-4"}>
                <Button
                    text={"Browse..."}
                    icon={<IoFileTrayFullOutline size={"100%"}/>}
                    theme={"secondary"}
                    onClick={() => {
                        const l = document.getElementById(id + "-image-input")
                        l && l.click()
                    }}
                />
                {error && <p className={"text-xs text-red-500"}>{error}</p>}
            </div>
            <input
                name={'image'}
                type={"file"}
                id={id + "-image-input"}
                accept={"image/jpeg, image/png, image/jpg"}
                className={"hidden"}
                onChange={handleInputChange}
            />
        </section>
    )
}

function DragDropImage({ onImageReceived, onError }: ImageInputProps) {
    const [isHovering, setIsHovering] = useState(false)
    const [error, setError] = useState<Nullable<string>>(null)
    const [image, setImage] = useState<Nullable<File>>(null)

    useEffect(() => {
        if (error) onError && onError(error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    useEffect(() => {
        if (image) onImageReceived && onImageReceived(image)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])

    const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHovering(true)
    }

    const onDragExitHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHovering(false)
    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsHovering(false)
        if (e.dataTransfer.files.length === 0) return
        const r = validateImage(e.dataTransfer.files)
        if (r.success) {
            setError(null)
            setImage(r.result)
        } else {
            setError(r.message)
        }
    }

    return (
        <section
            className={`h-44 w-full bg-slate-100 rounded-2xl shadow-inner flex items-center justify-center select-none`}
            onDragOver={e => e.preventDefault()}
            onDragEnter={onDragEnterHandler}
            onDragExit={onDragExitHandler}
            onDrop={onDropHandler}
        >
            <div className={`
                flex flex-col space-y-1 items-center justify-center text-gray-600 p-1 h-full w-full rounded-2xl
                outline-dashed -outline-offset-[6px] outline-slate-400 ${isHovering ? "outline-2" : "outline-0"}
            `}>
                <div className={"h-6 aspect-square"}>
                    <IoCloudUploadOutline size={"100%"}/>
                </div>
                <div className={"text-center"}>
                    <p className={"text-xs font-bold"}>
                        {isHovering ? "...drop an image here!" : "...or, drag and drop an image here"}
                    </p>
                    {error
                        ? <p className={"text-xs text-red-500"}>
                            {error}
                        </p>
                        : <p className={"text-xs"}>
                            Max {filesize(MAX_IMAGE_UPLOAD_SIZE)}, supports .png, .jpg, .jpeg
                        </p>
                    }

                </div>
            </div>
        </section>
    )
}
