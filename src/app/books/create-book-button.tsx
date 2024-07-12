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
import {SquarePen} from "lucide-react";
import {CreateBookForm} from "@/app/books/create-book-form";
import {useState} from "react";
export function CreateBookButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <SquarePen className="size-5 mr-2"/> Create new book
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a book</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new book
                    </DialogDescription>
                    <CreateBookForm onBookCreated={() => setIsOpen(false)}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}