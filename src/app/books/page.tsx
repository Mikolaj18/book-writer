"use client";

import {CreateBookButton} from "@/app/books/create-book-button";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {BookCard} from "@/app/books/book-card";

export default function BooksPage() {
    const books = useQuery(api.books.getBooks);
    return (
        <main className="w-full space-y-8">
            <div className="flex flex-col sm:flex-row gap-y-4 justify-between items-center">
                <h1 className="text-2xl md:text-4xl font-bold">My Books</h1>
                <CreateBookButton/>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 py-4">
                {books?.map(book => (
                    <BookCard key={book._id} book={book}/>
                ))}
            </div>
        </main>
    );
}