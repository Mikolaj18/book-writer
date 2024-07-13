"use client";

import {useParams} from "next/navigation";
import {Id} from "../../../../../convex/_generated/dataModel";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../../../convex/_generated/api";
import {ObjectNavigation} from "@/app/object-navigation";
import {EditChapterTitleButton} from "@/app/books/[bookId]/[chapterId]/edit-chapter-title-button";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Save, Undo2} from "lucide-react";
import {Editor} from "@/app/books/[bookId]/[chapterId]/editor";
import {useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {Skeleton} from "@/components/ui/skeleton";
import {ChapterLoadingState} from "@/app/books/[bookId]/[chapterId]/chapter-loading-state";

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
    const editChapterContent = useMutation(api.chapters.editChapterContent);

    const {toast} = useToast();
    const [content, setContent] = useState( "");

    const handleSave = async () => {
        try {
            await editChapterContent({
                content,
                bookId,
                chapterId,
            });
            toast({
                title: "Chapter saved",
                description: "Your chapter has been saved successfully",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with saving your chapter",
                variant: "destructive"
            });
        }
    }

    if (!book || !chapter || !chapters) {
        return <ChapterLoadingState/>
    }

    const currentIndex = chapters.findIndex(item => item._id === chapter._id);
    const nextChapter = chapters[currentIndex + 1];
    const previousChapter = chapters[currentIndex - 1];

    return (
        <section className="w-full space-y-8 py-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-center">{book.title}</h1>
            <div className="flex items-center justify-center gap-4">
                <h2 className="text-xl sm:text-2xl text-center">{chapter.title}</h2>
                <EditChapterTitleButton bookId={bookId} chapter={chapter}/>
            </div>
            <ObjectNavigation
                previousItem={previousChapter}
                nextItem={nextChapter}
                previousText="Previous Chapter"
                nextText="Next Chapter"
                url={`books/${bookId}`}
            />
            <Editor content={chapter.content ?? ""} onChange={setContent} /> <h1>elo</h1>
            <div className="w-full flex justify-between">
                <Button asChild>
                    <Link href={`/books/${bookId}`}>
                        <Undo2 className="mr-2 size-5"/> Back
                    </Link>
                </Button>
                <Button onClick={handleSave}>
                    <Save className="mr-2 size-5"/> Save
                </Button>
            </div>
        </section>
    );
}