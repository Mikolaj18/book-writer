"use client";

import {Authenticated, Unauthenticated, useMutation, useQuery} from "convex/react";
import {SignInButton, UserButton} from "@clerk/nextjs";
import {api} from "../../convex/_generated/api";

export default function Home() {
    const createBook = useMutation(api.books.createBook);
    const books = useQuery(api.books.getBooks);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Unauthenticated>
                <SignInButton/>
            </Unauthenticated>
            <Authenticated>
                <UserButton/>
                <button onClick={() => {
                    createBook({title: "Example book"})
                }}>Add Book
                </button>

                {books?.map(book => (
                    <div key={book._id}>{book.title}</div>
                ))}
            </Authenticated>
        </main>
    );
}
