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
import {Doc, Id} from "../../../../convex/_generated/dataModel";
import {api} from "../../../../convex/_generated/api";

const formSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(250),
    cover: z.instanceof(File).optional(),
});

export function EditBookForm({book, onBookUpdated}: {book: Doc<"books">,onBookUpdated: () => void}) {
    const generateUploadUrl = useMutation(api.books.generateUploadUrl);
    const editBook = useMutation(api.books.editBook);
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: book.title ?? "",
            description: book.description ?? "",
        },
    })
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const url = await generateUploadUrl();
        let storageId: string | undefined;

        if (values.cover) {
            const result = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": values.cover.type },
                body: values.cover,
            });
            const response = await result.json();
            storageId = response.storageId;
        }

        try {
            await editBook({
                title: values.title,
                description: values.description,
                fileId: storageId as Id<"_storage"> ?? book.fileId,
                bookId: book._id,
            });
            toast({
                title: "Book updated",
                description: "Your book has been updated successfully",
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "There was a problem with updating your book",
                variant: "destructive",
            });
        }

        onBookUpdated();
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
                                <Input placeholder="Echoes of the Forgotten" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Young archivist finds a vault of lost memories, uncovering secrets that could save or doom her world." {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cover"
                    render={({field: {value, onChange, ...fieldProps}}) => (
                        <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                                <Input{...fieldProps} type="file" accept="image/*"
                                      onChange={(event) => {
                                          const file = event.target.files?.[0];
                                          onChange(file);
                                      }}
                                />
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