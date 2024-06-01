"use client"

import { Toggle } from "@/components/ui/toggle"
import { type Editor } from "@tiptap/react"
import {
    Heading1,
    Heading2,
    Bold,
    Strikethrough,
    Italic,
    List, ListOrdered,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
} from "lucide-react"

type Props = {
    editor: Editor | null
}


export function Toolbar({ editor }: Props) {
    if (!editor) {
        return null
    }

    return (
        <div className="border border-input bg-transparent rounded-br-sm">
            <Toggle
                size="sm"
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()}
            >
                <Bold size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()}
            >
                <Italic size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()}
            >
                <Underline size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 1 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("heading", { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()}
            >
                <List size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()}
            >
                <Quote size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({textAlign: 'left'})}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('left').run()}
            >
                <AlignLeft size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({textAlign: 'center'})}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('center').run()}
            >
                <AlignCenter size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({textAlign: 'right'})}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('right').run()}
            >
                <AlignRight size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive({textAlign: 'justify'})}
                onPressedChange={() =>
                    editor.chain().focus().setTextAlign('justify').run()}
            >
                <AlignJustify size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("code")}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
            >
                <Code size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("undo")}
                onPressedChange={() => editor.chain().focus().undo().run()}
            >
                <Undo size={20} />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("redo")}
                onPressedChange={() => editor.chain().focus().redo().run()}
            >
                <Redo size={20} />
            </Toggle>
        </div>
    )
}