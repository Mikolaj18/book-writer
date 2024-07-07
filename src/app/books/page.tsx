"use client";

import {CreateBookButton} from "@/app/books/create-book-button";
import {useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";
import {BookCard} from "@/app/books/book-card";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import Image from "next/image";

export default function BooksPage() {
    const books = useQuery(api.books.getBooks);
    // const books = false;
    return (
        <section className="w-full space-y-8">
            {!books && (
                <>
                    <div className="flex justify-between items-center">
                        <Skeleton className="w-[171px] h-[40px]"/>
                        <Skeleton className="w-[173px] h-[40px]"/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 py-4">
                        {new Array(6).fill('').map((_, i) => (
                            <Card key={i} className="p-6 flex flex-col">
                                <div className="flex justify-between items-center">
                                    <Skeleton className="w-[250px] h-[28px]"/>
                                    <Skeleton className="w-[24px] h-[24px]"/>
                                </div>
                                <div className="mt-2">
                                    <Skeleton className="w-[130px] h-[20px]"/>
                                </div>
                                <div className="mt-4">
                                    <Skeleton className="w-full h-[300px]"/>
                                </div>
                                <div className="mt-3">
                                    <Skeleton className="w-[144px] h-[40px]"/>
                                </div>
                            </Card>
                        ))}
                    </div>
                </>
            )}


            {books && books.length === 0 &&
                <div className="py-24 flex flex-col justify-center items-center gap-8">
                    <Image
                        src="/books-empty.svg"
                        width="300"
                        height="300"
                        alt="A picture of a girl holding documents"
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