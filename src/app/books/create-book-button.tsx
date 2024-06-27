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
export function CreateBookButton() {
    return (
        <Dialog>
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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );

}