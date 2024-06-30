"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {EditBookButton} from "@/app/books/[bookId]/edit-book-button";

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
        </section>
    );
}