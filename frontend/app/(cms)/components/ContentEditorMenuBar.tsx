import React, { useEffect, useRef, useState } from "react"
import { Editor } from "@tiptap/react"
import { IoArrowRedo, IoArrowUndo, IoImageOutline, IoLinkOutline } from "react-icons/io5"
import { ImList2, ImListNumbered, ImQuotesLeft } from "react-icons/im"
import URLInputModal from "@/app/components/modals/URLInputModal";
import { Nullable } from "@/app/lib/types";
import { ModalRef } from "@/app/lib/hooks/useModal";

const boldButton = (editor: Editor) => (
    <button
        title={"Bold (Ctrl+B)"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={(editor.isActive("bold") ? "active" : "") + " ce-button"}>
        <b className={"font-bold"}>B</b>
    </button>
)

const italicButton = (editor: Editor) => (
    <button
        title={"Italic (Ctrl+I)"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={(editor.isActive("italic") ? "active" : "") + " ce-button"}>
        <em>I</em>
    </button>
)

const strikeButton = (editor: Editor) => (
    <button
        title={"Strikethrough"}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={(editor.isActive("strike") ? "active" : "") + " ce-button"}>
        <s>&nbsp;S&nbsp;</s>
    </button>
)

const underlineButton = (editor: Editor) => (
    <button
        title={"Underline (Ctrl+U)"}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={(editor.isActive("underline") ? "active" : "") + " ce-button"}>
        <u>U</u>
    </button>
)

const h2Button = (editor: Editor) => (
    <button
        title={"Heading 2 Block"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={(editor.isActive("heading", { level: 2 }) ? "active" : "") + " ce-button"}>
        <span className={"align-text-bottom"}>
            h<span className={"text-xs font-normal align-baseline"}>2</span>
        </span>
    </button>
)

const h3Button = (editor: Editor) => (
    <button
        title={"Heading 3 Block"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={(editor.isActive("heading", { level: 3 }) ? "active" : "") + " ce-button"}>
        <span className={"align-text-bottom"}>
            h<span className={"text-xs font-normal align-baseline"}>3</span>
        </span>
    </button>
)

const h4Button = (editor: Editor) => (
    <button
        title={"Heading 4 Block"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={(editor.isActive("heading", { level: 4 }) ? "active" : "") + " ce-button"}>
        <span className={"align-text-bottom"}>
            h<span className={"text-xs font-normal align-baseline"}>4</span>
        </span>
    </button>
)

const quoteButton = (editor: Editor) => (
    <button
        title={"Quote Block"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={(editor.isActive("blockquote") ? "active" : "") + " ce-button"}>
        <ImQuotesLeft size={"60%"}/>
    </button>
)

const bulletListButton = (editor: Editor) => (
    <button
        title={"Unordered List"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={(editor.isActive("bulletList") ? "active" : "") + " ce-button"}>
        <ImList2 size={"70%"}/>
    </button>
)

const orderedListButton = (editor: Editor) => (
    <button
        title={"Ordered List"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={(editor.isActive("orderedList") ? "active" : "") + " ce-button"}
    >
        <ImListNumbered size={"70%"}/>
    </button>
)

const undoButton = (editor: Editor) => (
    <button
        title={"Undo (Ctrl+Z)"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={'ce-button'}
    >
        <IoArrowUndo size={"70%"}/>
    </button>
)

const redoButton = (editor: Editor) => (
    <button
        title={"Redo (Ctrl+Shift+Z)"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={'ce-button'}
    >
        <IoArrowRedo size={"70%"}/>
    </button>
)

const imageButton = (editor: Editor) => (
    <button
        title={"Add Image"}
        onClick={() => {
            const url = window.prompt("Image URL")
            if (url) editor.chain().focus().setImage({ src: url }).run()
        }}
        className={'ce-button'}
    >
        <IoImageOutline size={"90%"}/>
    </button>
)

const linkButton = (editor: Editor) => {
    const [ url, setUrl ] = useState<Nullable<string>>(null)
    const modalRef = useRef<ModalRef>(null)

    useEffect(() => {
        if (!url) return
        editor.chain().focus().setLink({ target: "_blank", href: url }).run()
    }, [url])

    const handleButtonClick = () => {
        const isActive = editor.isActive("link")
        if (!isActive) {
            modalRef.current && modalRef.current.toggleModal()
        } else {
            editor.chain().focus().unsetLink().run()
        }
    }

    return (
        <>
            <URLInputModal modalId={"url-input"} setUrl={setUrl} ref={modalRef}/>
            <button
                title={"Link"}
                onClick={handleButtonClick}
                className={(editor.isActive("link") ? "active" : "") + ' ce-button'}>
                <IoLinkOutline size={"90%"}/>
            </button>
        </>
    )
}

export default function ContentEditorMenuBar({ editor }: { editor: Editor }): React.JSX.Element {
    return (
        <div>
            <div className={"flex flex-row gap-x-1 gap-y-3 mb-4 flex-shrink-0 flex-grow-0 flex-wrap"}>
                {undoButton(editor)}
                {redoButton(editor)}
                <div className={"w-4"}/>
                {boldButton(editor)}
                {italicButton(editor)}
                {underlineButton(editor)}
                {strikeButton(editor)}
                <div className={"w-4"}/>
                {quoteButton(editor)}
                {linkButton(editor)}
                {imageButton(editor)}
                <div className={"w-4"}/>
                {h2Button(editor)}
                {h3Button(editor)}
                {h4Button(editor)}
                <div className={"w-4"}/>
                {bulletListButton(editor)}
                {orderedListButton(editor)}
            </div>
        </div>
    )
}
