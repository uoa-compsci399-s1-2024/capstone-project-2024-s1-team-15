"use client"

import React, { Dispatch, SetStateAction } from "react";
import { BubbleMenu, Editor, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit'
import { Underline } from "@tiptap/extension-underline";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { ImList2, ImListNumbered, ImParagraphLeft, ImQuotesLeft } from "react-icons/im";

const boldButton = (editor: Editor) => (
    <button title={"Bold (Ctrl+B)"} onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'active' : ''}>
        <b className={"font-bold"}>B</b>
    </button>
)
const italicButton = (editor: Editor) => (
    <button title={"Italic (Ctrl+I)"} onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'active' : ''}>
        <em>I</em>
    </button>
)
const strikeButton = (editor: Editor) => (
    <button title={"Strikethrough"} onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'active' : ''}>
        <s>&nbsp;S&nbsp;</s>
    </button>
)
const underlineButton = (editor: Editor) => (
    <button title={"Underline (Ctrl+U)"} onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'active' : ''}>
        <u>U</u>
    </button>
)
const paragraphButton = (editor: Editor) => (
    <button title={"Paragraph Block"} onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive("paragraph") ? 'active' : ''}>
        <ImParagraphLeft/>
    </button>
)
const h2Button = (editor: Editor) => (
    <button title={"Heading 2 Block"} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>
        <span className={"align-text-bottom"}>h<span className={"text-xs font-normal align-baseline"}>2</span></span>
    </button>
)
const h3Button = (editor: Editor) => (
    <button title={"Heading 3 Block"} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}>
        <span className={"align-text-bottom"}>h<span className={"text-xs font-normal align-baseline"}>3</span></span>
    </button>
)
const h4Button = (editor: Editor) => (
    <button title={"Heading 4 Block"} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'active' : ''}>
        <span className={"align-text-bottom"}>h<span className={"text-xs font-normal align-baseline"}>4</span></span>
    </button>
)
const quoteButton = (editor: Editor) => (
    <button title={"Quote Block"} onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'active' : ''}>
        <ImQuotesLeft/>
    </button>
)
const bulletListButton = (editor: Editor) => (
    <button title={"Unordered List"} onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'active' : ''}>
        <ImList2/>
    </button>
)
const orderedListButton = (editor: Editor) => (
    <button title={"Ordered List"} onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'active' : ''}>
        <ImListNumbered/>
    </button>
)
const undoButton = (editor: Editor) => (
    <button title={"Undo (Ctrl+Z)"} onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}>
        <IoArrowUndo/>
    </button>
)
const redoButton = (editor: Editor) => (
    <button title={"Redo (Ctrl+Shift+Z)"} onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}>
        <IoArrowRedo/>
    </button>
)

function MenuBar ({ editor }: { editor: Editor }): React.JSX.Element {
    return (
        <div>
            <div className={"flex flex-row space-x-1 mb-4"}>
                {undoButton(editor)}
                {redoButton(editor)}
                <div className={"w-4"}/>
                {boldButton(editor)}
                {italicButton(editor)}
                {underlineButton(editor)}
                {strikeButton(editor)}
                <div className={"w-4"}/>
                {quoteButton(editor)}
                <div className={"w-4"}/>
                {h2Button(editor)}
                {h3Button(editor)}
                {h4Button(editor)}
                <div className={"w-4"}/>
                {bulletListButton(editor)}
                {orderedListButton(editor)}
            </div>
            <hr className={"mb-4"}/>
        </div>
    )
}

function FloatingBar ({ editor }: { editor: Editor }): React.JSX.Element {
    return (
        <div className={"flex flex-row space-x-1 opacity-40 hover:opacity-100 transition-all pl-2"}>
            {paragraphButton(editor)}
            <div className={"w-4"}/>
            {quoteButton(editor)}
            <div className={"w-4"}/>
            {h2Button(editor)}
            {h3Button(editor)}
            {h4Button(editor)}
        </div>
    )
}

function BubbleBar({ editor }: { editor: Editor }): React.JSX.Element {
    return (
        <div className={"flex flex-row space-x-1 opacity-40 hover:opacity-100 transition-all z-50"}>
            {boldButton(editor)}
            {italicButton(editor)}
            {underlineButton(editor)}
            {strikeButton(editor)}
        </div>
    )
}

export default function ContentEditor ({ setEditorContent, content = "" }: { setEditorContent: Dispatch<SetStateAction<string>>, content?: string }): React.JSX.Element {
    // const content = "<h2>Lorem ipsum dolor sit amet</h2><p>Praesent sit amet ligula nec ante facilisis molestie. <strong>Sed tincidunt tortor a malesuada interdum.</strong> In imperdiet dolor at dolor <u>posuere</u>, dictum bibendum lacus ultricies. Curabitur eu neque in nisi tempor luctus a ac sapien. <strong><em>Nulla facilisi.</em></strong></p><blockquote><p>Quisque in dui vitae libero efficitur maximus.</p></blockquote><p>Sed nec nisl in massa <em>consectetur venenatis.</em> Vestibulum in tellus vestibulum, cursus lectus gravida, volutpat tellus.</p><h3>Pellentesque auctor elit ligula, at posuere sem lobortis at</h3><p>Maecenas aliquet venenatis nisl a ullamcorper. Maecenas dignissim massa lacus. Mauris euismod odio non risus pharetra suscipit. <em>Cras bibendum, felis ac lacinia egestas, turpis neque sodales leo, et tempus nisl metus et purus. </em></p><ul><li><p>Curabitur vel condimentum orci. </p></li><li><p>Phasellus euismod nisi eu orci egestas dignissim vitae id massa. </p></li><li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p></li></ul><p>In fermentum nibh et ipsum dapibus, <strong><u>quis auctor tortor pellentesque. In hac habitasse platea dictumst.</u></strong> Nunc nibh nisi, consequat ac aliquam vitae, pharetra posuere elit. Duis finibus, purus eget tempor consectetur, urna turpis congue turpis, commodo aliquam quam metus sed elit. Pellentesque sodales faucibus neque et iaculis. Fusce consectetur fermentum nisl, at dictum tortor tristique vel. Curabitur elementum faucibus nisi vitae malesuada.</p><h2>Vestibulum blandit id felis in tincidunt</h2><p>Suspendisse faucibus tempor tortor, sed tempor dolor bibendum tempor. Nulla varius est et ligula iaculis, at ullamcorper nisl porta. <strong>Nulla at tristique lacus. Nunc iaculis iaculis nulla vel lacinia. Quisque dictum nibh et facilisis luctus. Etiam facilisis leo lectus, egestas iaculis ante bibendum at.</strong></p>"

    const editor = useEditor({
        extensions: [
            StarterKit, Underline
        ],
        content: content,
        editorProps: {
            attributes: {
                class: "prose prose-slate dark:prose-invert max-w-full bg-gray-500 bg-opacity-5 rounded-xl min-h-48 p-6 shadow-inner"
            }
        },
        onUpdate ({ editor }) {
            setEditorContent(editor.getHTML())
        }
    })
    if (!editor) return <></>

    return (
        <div id={"editor"} className={"w-full p-4 form-field"}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            {/*<FloatingMenu editor={editor}><FloatingBar editor={editor}/></FloatingMenu>*/}
            {/*<BubbleMenu editor={editor}><BubbleBar editor={editor}/></BubbleMenu>*/}
        </div>
    )
}