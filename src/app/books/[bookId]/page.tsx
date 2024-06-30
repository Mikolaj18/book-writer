"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {EditBookButton} from "@/app/books/[bookId]/edit-book-button";
import {Button} from "@/components/ui/button";
import {CreateChapterButton} from "@/app/books/[bookId]/create-chapter-button";

export default function BookPage() {
    const {bookId} = useParams<{ bookId: Id<"books"> }>();
    const book = useQuery(api.books.getBook, {
        bookId,
    });

    if (!book) {
        return null;
    }
    return (
        <section className="w-full space-y-8 p-12">
            <div className="flex gap-4 items-center">
                <h1 className="text-4xl">{book.title}</h1>
                <EditBookButton book={book}/>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-end">
                    <CreateChapterButton book={book}/>
                </div>
            </div>
        </section>
    );
}