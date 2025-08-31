 

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Type,
} from "lucide-react"
import { useCallback, useEffect } from "react"

interface RichTextEditorProps {
  content: any
  onChange: (content: any) => void
  placeholder?: string
  className?: string
  editable?: boolean
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  className = "",
  editable = true,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
    editorProps: {
      attributes: {
        class: "prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-6 py-4",
      },
    },
  })

  useEffect(() => {
    if (editor && content && JSON.stringify(editor.getJSON()) !== JSON.stringify(content)) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const setHeading = useCallback(
    (level: 1 | 2 | 3) => {
      if (editor) {
        editor.chain().focus().toggleHeading({ level }).run()
      }
    },
    [editor],
  )

  if (!editor) {
    return (
      <div className={`border rounded-lg ${className}`}>
        <div className="border-b p-2 bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
        <div className="p-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
        </div>
      </div>
    )
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${className}`}>
      {editable && (
        <div className="border-b p-2 bg-slate-50 dark:bg-slate-800 flex items-center gap-1 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8 p-0"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8 p-0"
          >
            <Redo className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHeading(1)}
            data-active={editor.isActive("heading", { level: 1 })}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHeading(2)}
            data-active={editor.isActive("heading", { level: 2 })}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setHeading(3)}
            data-active={editor.isActive("heading", { level: 3 })}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            data-active={editor.isActive("paragraph")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Type className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            data-active={editor.isActive("bold")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            data-active={editor.isActive("italic")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            data-active={editor.isActive("strike")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            data-active={editor.isActive("code")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Code className="h-4 w-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-active={editor.isActive("bulletList")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-active={editor.isActive("orderedList")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            data-active={editor.isActive("blockquote")}
            className="h-8 w-8 p-0 data-[active=true]:bg-slate-200 dark:data-[active=true]:bg-slate-700"
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>
      )}

      <EditorContent editor={editor} className="min-h-[400px] bg-white dark:bg-slate-900" />
    </div>
  )
}
