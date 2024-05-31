import { Chapter } from "@/app/types/typesModels"
import { Button } from "@nextui-org/button"
import { cn } from "@nextui-org/react"
import { EditorProvider, extensions, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface NewChapterProps extends React.HTMLAttributes<HTMLDivElement> {
    chapter?: Partial<Chapter>
    content: string
}

function MenuBar() {
    const { editor } = useCurrentEditor()
    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-2 mb-4">
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn("flex gap-2", editor.isActive("bold") ? "bg-black text-white" : "")}
            >
                Bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                Italic
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className="btn btn-primary"
            >
                Strike
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className="btn btn-primary"
            >
                Code
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="btn btn-primary"
            >
                Bullet List
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="btn btn-primary"
            >
                Ordered List
            </Button>
        </div>
    )

}

export const NewChapterForm: React.FC<NewChapterProps> = ({ content }: { content: string }) => {

    const extensions = [StarterKit]

    return (
        <>
            <EditorProvider
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={content}
            >
            </EditorProvider>
        </>
    )
}