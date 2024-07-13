import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {useState} from "react";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import {useToast} from "@/components/ui/use-toast";

export function DeleteChapterButton({chapterId, bookId}: {chapterId: Id<"chapters">, bookId: Id<"books">}) {
    const [isOpen, setIsOpen] = useState(false);
    const deleteChapter = useMutation(api.chapters.deleteChapter);
    const {toast} = useToast();
    const handleChapterDelete = async () => {
        try {
            await deleteChapter({
                chapterId,
                bookId,
            });
            toast({
                title: "Chapter deleted",
                description: "Your chapter has been deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with deleting your chapter",
                variant: "destructive"
            });
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button data-testid="delete-item" variant="destructive">
                    <TrashIcon />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this chapter?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Your chapter can't be recovered after it's been deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleChapterDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );

}