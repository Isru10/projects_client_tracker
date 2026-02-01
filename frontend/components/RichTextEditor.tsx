'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Heading } from '@tiptap/extension-heading';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { TextAlign } from '@tiptap/extension-text-align';
import { Button } from '@/components/ui/button';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Highlighter,
    Undo,
    Redo,
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Heading.configure({
                levels: [1, 2, 3],
            }),
            TextStyle,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const MenuButton = ({ onClick, active, children }: any) => (
        <Button
            type="button"
            variant={active ? 'default' : 'ghost'}
            size="sm"
            onClick={onClick}
            className="h-8 w-8 p-0"
        >
            {children}
        </Button>
    );

    const ColorButton = ({ color, label }: { color: string; label: string }) => (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setColor(color).run()}
            className="h-8 w-8 p-0"
            style={{ backgroundColor: color }}
            title={label}
        />
    );

    return (
        <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                    >
                        <Bold className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                    >
                        <Italic className="h-4 w-4" />
                    </MenuButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive('heading', { level: 1 })}
                    >
                        <Heading1 className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                    >
                        <Heading2 className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive('heading', { level: 3 })}
                    >
                        <Heading3 className="h-4 w-4" />
                    </MenuButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                    >
                        <List className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </MenuButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        active={editor.isActive({ textAlign: 'left' })}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        active={editor.isActive({ textAlign: 'center' })}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        active={editor.isActive({ textAlign: 'right' })}
                    >
                        <AlignRight className="h-4 w-4" />
                    </MenuButton>
                </div>

                {/* Colors */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <ColorButton color="#3b82f6" label="Blue" />
                    <ColorButton color="#10b981" label="Green" />
                    <ColorButton color="#f59e0b" label="Orange" />
                    <ColorButton color="#ef4444" label="Red" />
                    <ColorButton color="#8b5cf6" label="Purple" />
                </div>

                {/* Highlight */}
                <div className="flex gap-1 border-r border-neutral-200 dark:border-neutral-800 pr-2">
                    <MenuButton
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                        active={editor.isActive('highlight')}
                    >
                        <Highlighter className="h-4 w-4" />
                    </MenuButton>
                </div>

                {/* Undo/Redo */}
                <div className="flex gap-1">
                    <MenuButton onClick={() => editor.chain().focus().undo().run()}>
                        <Undo className="h-4 w-4" />
                    </MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().redo().run()}>
                        <Redo className="h-4 w-4" />
                    </MenuButton>
                </div>
            </div>

            {/* Editor Content */}
            <div className="bg-white dark:bg-neutral-950">
                <EditorContent editor={editor} />
                {!editor.getText() && placeholder && (
                    <div className="absolute top-16 left-4 text-neutral-400 pointer-events-none">
                        {placeholder}
                    </div>
                )}
            </div>
        </div>
    );
}
