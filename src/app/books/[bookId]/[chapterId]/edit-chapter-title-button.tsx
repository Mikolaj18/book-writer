"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Pencil} from "lucide-react";
import {useState} from "react";
import {EditChapterTitleForm} from "@/app/books/[bookId]/[chapterId]/edit-chapter-title";
import {Doc} from "../../../../../convex/_generated/dataModel";
export function EditChapterTitleButton({chapter, book} : {chapter: Doc<"chapters">, book: Doc<"books">}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Pencil className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your chapter</DialogTitle>
                    <DialogDescription>
                        Type a new title for your chapter
                    </DialogDescription>
                    <EditChapterTitleForm chapter={chapter} book={book} onChapterEdited={() => setIsOpen(false)}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}