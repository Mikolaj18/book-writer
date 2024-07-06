import {EditorProvider, useCurrentEditor} from "@tiptap/react";
import {BoldIcon, ItalicIcon, UnderlineIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {StarterKit} from "@tiptap/starter-kit";
import {Underline} from "@tiptap/extension-underline";


function MenuBar() {
    const {editor} = useCurrentEditor();
    if(!editor) return null;
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                    "flex gap-2 bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 items-center justify-center rounded-lg px-2 py-1",
                    editor.isActive("bold") ? "bg-white dark:bg-white text-black" : ""
                )}
            >
                <BoldIcon className="w-4 h-4" /> bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                    "flex gap-2 bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 items-center justify-center rounded-lg px-2 py-1",
                    editor.isActive("italic") ? "bg-white dark:bg-white text-black" : ""
                )}
            >
                <ItalicIcon className="w-4 h-4" /> italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={cn(
                    "flex gap-2 bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 border items-center justify-center rounded-lg px-2 py-1",
                    editor.isActive("underline") ? "bg-white dark:bg-white text-black" : ""
                )}
            >
                <UnderlineIcon className="w-4 h-4" /> underline
            </button>
        </div>
    );
}
export function Editor({content, onChange}: {content: string, onChange: (html: string) => void}) {
    const extensions = [StarterKit, Underline];
    return (
        <div className="rounded-xl bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10 p-4">
            <EditorProvider
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={content}
                onUpdate={({editor}) => {
                    const html = editor.getHTML();
                    onChange(html);
                }}
            >
                <></>
            </EditorProvider>
        </div>
    );
}