import {Doc} from "../../../convex/_generated/dataModel";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {BookActions} from "@/app/books/book-actions";
export function BookCard({book}: { book: Doc<"books"> & { url: string | null } }) {
    return (
        <Card className="flex flex-col justify-between rounded-xl bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{book.title}</CardTitle>
                    <BookActions book={book}/>
                </div>
                <CardDescription>{book.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[400px]">
                {book.url && <Image className="w-full h-full object-cover" src={book.url} alt="book cover" width={300} height={600}/>}
            </CardContent>
            <CardFooter>
                <Button className="text-white dark:bg-zinc-700 dark:hover:bg-zinc-600">Continue Writing</Button>
            </CardFooter>
        </Card>
    );
}