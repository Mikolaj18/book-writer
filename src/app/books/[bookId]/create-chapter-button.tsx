"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import {useState} from "react";
import {CreateChapterForm} from "@/app/books/[bookId]/create-chapter-form";
import {Doc} from "../../../../convex/_generated/dataModel";
export function CreateChapterButton({book} : {book: Doc<"books">}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <CirclePlus className="size-5 mr-2"/> Create new chapter
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a chapter</DialogTitle>
                    <DialogDescription>
                        Type a title for your chapter
                    </DialogDescription>
                    <CreateChapterForm book={book} onChapterCreated={() => setIsOpen(false)}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );

}