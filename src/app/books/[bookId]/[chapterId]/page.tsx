"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../../convex/_generated/dataModel";
import {useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {ObjectNavigation} from "@/app/object-navigation";

export default function ChapterPage() {
    const {bookId, chapterId} = useParams<{ bookId: Id<"books">, chapterId: Id<"chapters"> }>();
    const chapters = useQuery(api.chapters.getChapters, {
        bookId,
    });
    const book = useQuery(api.books.getBook, {
        bookId,
    });
    const chapter = useQuery(api.chapters.getChapter, {
        chapterId,
        bookId,
    });
    if(!book || !chapter || !chapters) return null;

    const currentIndex = chapters.findIndex(item => item._id === chapter._id);
    const nextChapter = chapters[currentIndex + 1];
    const previousChapter = chapters[currentIndex - 1];
    return (
        <section className="w-full space-y-8 p-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-center">{book.title}</h1>
            <h2 className="text-xl sm:text-2xl text-center">{chapter.title}</h2>
            <ObjectNavigation
                previousItem={previousChapter}
                nextItem={nextChapter}
                previousText="Previous Chapter"
                nextText="Next Chapter"
                url={`books/${bookId}`}
            />
        </section>
    )
}