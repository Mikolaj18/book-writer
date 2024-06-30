"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {EditBookButton} from "@/app/books/[bookId]/edit-book-button";
import {Button} from "@/components/ui/button";
import {CreateChapterButton} from "@/app/books/[bookId]/create-chapter-button";
import {GripVertical, Pencil} from "lucide-react";
import {ChapterList} from "@/app/books/[bookId]/chapter-list";

export default function BookPage() {
    const {bookId} = useParams<{ bookId: Id<"books"> }>();
    const book = useQuery(api.books.getBook, {
        bookId,
    });
    const chapters = useQuery(api.chapters.getChapters, {
        bookId,
    });

    if (!book || !chapters) return null;

    return (
        <section className="w-full space-y-8 p-12">
            <div className="flex gap-4 items-center">
                <h1 className="text-4xl">{book.title}</h1>
                <EditBookButton book={book}/>
            </div>
            <ChapterList chapters={chapters} bookId={book._id}/>
            <div className="w-full">
                <div className="w-full flex justify-end">
                    <CreateChapterButton book={book}/>
                </div>
            </div>
        </section>
    );
}