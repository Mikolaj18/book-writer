"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Pencil, SquarePen} from "lucide-react";
import {useState} from "react";
import {Doc} from "../../../../convex/_generated/dataModel";
import {EditBookForm} from "@/app/books/[bookId]/edit-book-form";

export function EditBookButton({book}: { book: Doc<"books"> }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Pencil className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit your book</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to edit current book
                    </DialogDescription>
                    <EditBookForm book={book} onBookUpdated={() => setIsOpen(false)}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );

}