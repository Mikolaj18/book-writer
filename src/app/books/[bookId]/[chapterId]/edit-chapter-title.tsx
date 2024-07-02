"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useMutation} from "convex/react";
import {useToast} from "@/components/ui/use-toast";
import {api} from "../../../../../convex/_generated/api";
import {Doc, Id} from "../../../../../convex/_generated/dataModel";

const formSchema = z.object({
    title: z.string().min(2).max(100),
});
export function EditChapterTitleForm({chapter, bookId, onChapterEdited}: {chapter: Doc<"chapters">, bookId: Id<"books">, onChapterEdited: () => void}) {
    const editChapterTitle = useMutation(api.chapters.editChapterTitle);
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: chapter.title ?? "",
        },
    });

   async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await editChapterTitle({
                title: values.title,
                bookId,
                chapterId: chapter._id,
            });
            toast({
                title: "Chapter edited",
                description: "Your chapter has been create edited",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with editing your chapter",
                variant: "destructive"
            });
        }
        onChapterEdited();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="An unexpected meeting..." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}