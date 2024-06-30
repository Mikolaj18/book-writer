import {GripVertical, Pencil} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Doc, Id} from "../../../../convex/_generated/dataModel";
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";
import {useTransition, useOptimistic} from "react";
import {useMutation} from "convex/react";
import {api} from "../../../../convex/_generated/api";
import Link from "next/link";

export function ChapterList({chapters, bookId}: { chapters: Doc<"chapters">[], bookId: Id<"books"> }) {

    const [, startTransition] = useTransition();
    const swapChapters = useMutation(api.chapters.swapChapters);

    const [optimisticState, swapOptimistic] = useOptimistic(
        chapters,
        (state, {sourceChapterId, destinationChapterId}) => {
            const sourceIndex = state.findIndex(
                (chapter) => chapter._id === sourceChapterId
            );
            const destinationIndex = state.findIndex(
                (chapter) => chapter._id === destinationChapterId
            );

            const newState = [...state];
            newState[sourceIndex] = state[destinationIndex];
            newState[destinationIndex] = state[sourceIndex];
            return newState;
        }
    );
    const onDragEnd = async (result: any) => {
        if (!result.destination) return;
        const sourceChapterId = result.draggableId;
        const destinationChapterId = chapters[result.destination.index]._id;
        startTransition(() => {
            swapOptimistic({sourceChapterId, destinationChapterId})
            swapChapters({bookId, sourceChapterId, destinationChapterId})
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"chapters"}>
                {(droppableProvider) => (
                    <ul
                        ref={droppableProvider.innerRef}
                        {...droppableProvider.droppableProps}
                        className="flex flex-col"
                    >
                        {optimisticState.map((chapter, index) => (
                            <Draggable
                                key={chapter._id}
                                draggableId={chapter._id}
                                index={index}
                            >
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        className="p-6 border-2 border-b-0 last:border-b-2 border-black/90 dark:border-white italic"
                                        {...provided.draggableProps}
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    {...provided.dragHandleProps}
                                                    className="cursor-grab"
                                                >
                                                    <GripVertical/>
                                                </div>
                                                Chapter {index+1}: {chapter.title}
                                            </div>
                                            <Button asChild className="text-white dark:bg-zinc-700 dark:hover:bg-zinc-600">
                                                <Link href={`/books/${bookId}/${chapter._id}`}>
                                                    <Pencil className="mr-2 size-5"/> Edit
                                                </Link>
                                            </Button>
                                        </div>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {droppableProvider.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}