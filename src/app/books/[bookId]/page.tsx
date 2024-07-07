"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import {EditBookButton} from "@/app/books/[bookId]/edit-book-button";
import {Button} from "@/components/ui/button";
import {CreateChapterButton} from "@/app/books/[bookId]/create-chapter-button";
import {Undo2} from "lucide-react";
import {ChapterList} from "@/app/books/[bookId]/chapter-list";
import Link from "next/link";
import {ObjectNavigation} from "@/app/object-navigation";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import Image from "next/image";
import {CreateBookButton} from "@/app/books/create-book-button";
import {BookLoadingState} from "@/app/books/[bookId]/book-loading-state";

export default function BookPage() {

    const {bookId} = useParams<{ bookId: Id<"books"> }>();
    const books = useQuery(api.books.getBooks);
    const book = useQuery(api.books.getBook, {
        bookId,
    });
    const chapters = useQuery(api.chapters.getChapters, {
        bookId,
    });

    if (!books || !book || !chapters) {
        return <BookLoadingState/>
    }

    const currentIndex = books.findIndex(item => item._id === book._id);
    const nextBook = books[currentIndex + 1];
    const previousBook = books[currentIndex - 1];

    return (
        <section className="w-full space-y-8 py-12">
            <ObjectNavigation
                previousItem={previousBook}
                nextItem={nextBook}
                previousText="Previous Book"
                nextText="Next Book"
                url={`books`}
            />
            {books && chapters.length === 0 &&
                <div className="py-12 flex flex-col justify-center items-center gap-8">
                    <Image
                        src="/chapters-empty.svg"
                        width="300"
                        height="300"
                        alt="A picture with a girl with a text content"
                    />
                    <h2 className="text-2xl text-center">The book is already here. Time to add a chapter.</h2>
                    <CreateChapterButton bookId={bookId}/>
                </div>
            }

            {books && chapters.length !== 0 && books.length !== 0 &&
                <>
                    <div className="flex gap-4 items-center justify-center">
                        <h1 className="text-xl sm:text-4xl">{book.title}</h1>
                        <EditBookButton book={book}/>
                    </div>
                    <ChapterList chapters={chapters} bookId={book._id}/>
                    <div className="w-full">
                        <div className="w-full flex flex-col mobi-lg:flex-row gap-2 items-center justify-between">
                            <Button asChild>
                                <Link href="/books">
                                    <Undo2 className="mr-2 size-5"/>Back
                                </Link>
                            </Button>
                            <CreateChapterButton bookId={bookId}/>
                        </div>
                    </div>
                </>
            }
        </section>
    );
}
