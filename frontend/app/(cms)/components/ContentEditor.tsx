"use client"

import React, { Dispatch, SetStateAction, useEffect } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Underline } from "@tiptap/extension-underline"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import ImageResize from "tiptap-extension-resize-image"
import ContentEditorMenuBar from "@/app/(cms)/components/ContentEditorMenuBar"

type ContentEditorProps = {
    setEditorContent: Dispatch<SetStateAction<string>>
    initialContent?: string
    editorId?: string
}

export default function ContentEditor(
    { setEditorContent, initialContent = "", editorId = "default-editor" }: ContentEditorProps
) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image,
            ImageResize,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
                validate: href => /^https?:\/\//.test(href)
            })
        ],
        editorProps: {
            attributes: {
                class: `prose dark:prose-invert max-w-full bg-gray-500 bg-opacity-5 rounded-xl min-h-48 p-6 shadow-inner overflow-scroll max-h-[620px]`,
            },
        },
        onUpdate({ editor }) {
            setEditorContent(editor.getHTML())
        },
    })

    useEffect(() => {
        editor && editor.commands.setContent(initialContent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialContent])

    return (editor &&
        <div id={editorId} className={"content-editor w-full p-4 form-field overflow-hidden"}>
            <ContentEditorMenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
