"use client";

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
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
import {api} from "../../../../convex/_generated/api";
import {Id} from "../../../../convex/_generated/dataModel";
import {LoadingButton} from "@/components/loading-button";

const formSchema = z.object({
    title: z.string().min(2).max(100),
});
export function CreateChapterForm({bookId, onChapterCreated}: {bookId: Id<"books">, onChapterCreated: () => void}) {
    const createChapter = useMutation(api.chapters.createChapter);
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

   async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createChapter({
                title: values.title,
                content: "",
                bookId,
            });
            toast({
                title: "Chapter created",
                description: "Your chapter has been create successfully",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with creating your chapter",
                variant: "destructive"
            });
        }
        onChapterCreated();
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
                <LoadingButton
                    isLoading={form.formState.isSubmitting}
                    loadingText="Creating..."
                >
                    Create
                </LoadingButton>
            </form>
        </Form>
    );
}