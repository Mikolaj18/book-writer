"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {MoreVertical, Pen, Trash2} from "lucide-react";
import {useState} from "react";
import {Doc} from "../../../convex/_generated/dataModel";
import {useMutation} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {useToast} from "@/components/ui/use-toast";

export function BookActions({book}: {book: Doc<"books">}) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const deleteBook = useMutation(api.books.deleteBook);
    const {toast} = useToast();
    const handleDeleteBook = async () => {
        try {
            await deleteBook({
                bookId: book._id,
            });
            toast({
                title: "Book deleted",
                description: "Your book has been deleted",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with deleting your book",
                variant: "destructive"
            });
        }
    }
    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will delete your book. This action is irreversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteBook}>Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-zinc-800">
                    <DropdownMenuItem className="dark:hover:bg-zinc-700">
                        <Pen className="size-4 mr-2"/> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="dark:hover:bg-zinc-700" onClick={() => setIsConfirmOpen(true)}>
                        <Trash2 className="size-4 mr-2"/> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}