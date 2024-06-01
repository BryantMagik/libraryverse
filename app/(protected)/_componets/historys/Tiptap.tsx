"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"
import { Toolbar } from "./ToolBar"
import Heading from "@tiptap/extension-heading"
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'

export default function Tiptap({ description, onChange }: {
    description: string,
    onChange: (richText: string) => void
}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({
        }), Heading.configure(({
            levels: [1,2],
        })
        ),
        Underline,
        Placeholder.configure({
            placeholder: 'Escribe aquí...',
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        ],
        content: description,
        editorProps: {
            attributes: {
                class: "flex flex-col px-4 py-3 text-gray-400 gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="w-full px-4 place-content-center">
            <Toolbar editor={editor} />
            <EditorContent className="prose " style={{ whiteSpace: "pre-line" }} editor={editor} placeholder="Hola"/>
        </div>
    )
}