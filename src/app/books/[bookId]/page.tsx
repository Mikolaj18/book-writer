"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {EditBookButton} from "@/app/books/[bookId]/edit-book-button";
import {Button} from "@/components/ui/button";
import {CreateChapterButton} from "@/app/books/[bookId]/create-chapter-button";
import {GripVertical, Pencil, Undo2} from "lucide-react";
import {ChapterList} from "@/app/books/[bookId]/chapter-list";
import {useState} from "react";
import Link from "next/link";
import {ObjectNavigation} from "@/app/object-navigation";

export default function BookPage() {

    const {bookId} = useParams<{ bookId: Id<"books"> }>();
    const books = useQuery(api.books.getBooks);
    const book = useQuery(api.books.getBook, {
        bookId,
    });
    const chapters = useQuery(api.chapters.getChapters, {
        bookId,
    });
    if (!book || !chapters || !books) return null;

    const currentIndex = books.findIndex(item => item._id === book._id);
    const nextBook = books[currentIndex + 1];
    const previousBook = books[currentIndex - 1];

    return (
        <section className="w-full space-y-8 p-12">
            <ObjectNavigation
                previousItem={previousBook}
                nextItem={nextBook}
                previousText="Previous Book"
                nextText="Next Book"
                url={`books`}
            />
            <div className="flex gap-4 items-center">
                <h1 className="text-xl sm:text-4xl">{book.title}</h1>
                <EditBookButton book={book}/>
            </div>
            <ChapterList chapters={chapters} bookId={book._id}/>
            <div className="w-full">
                <div className="w-full flex justify-between">
                    <Button asChild>
                        <Link href="/books">
                            <Undo2 className="mr-2 size-5"/>Back
                        </Link>
                    </Button>
                    <CreateChapterButton book={book}/>
                </div>
            </div>
        </section>
    );
}