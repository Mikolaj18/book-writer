"use client";

import {CreateBookButton} from "@/app/books/create-book-button";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {BookCard} from "@/app/books/book-card";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {BooksLoadingState} from "@/app/books/books-loading-state";

export default function BooksPage() {
    const books = useQuery(api.books.getBooks);

    return (
        <section className="w-full space-y-8">
            {!books && (
                <BooksLoadingState/>
            )}

            {books && books.length === 0 &&
                <div className="py-12 flex flex-col justify-center items-center gap-8">
                    <Image
                        src="/books-empty.svg"
                        width="300"
                        height="300"
                        alt="A picture of a girl pointing at book"
                    />
                    <h2 className="text-2xl text-center">It is a bit empty here. Go ahead and write something.</h2>
                    <CreateBookButton/>
                </div>
            }

            {books && books.length !== 0 &&
                <>
                    <div className="flex flex-col sm:flex-row gap-y-4 justify-between items-center">
                        <h1 className="text-2xl md:text-4xl font-bold">My Books</h1>
                        <CreateBookButton/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 py-4">
                        {books.map(book => (
                            <BookCard key={book._id} book={book}/>
                        ))}
                    </div>
                </>
            }
        </section>
    );
}