import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});
export const getBooks = query({
    async handler(ctx) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) return [];

        let books =  await ctx.db.query("books")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
            .collect();

        return await Promise.all(
            books.map(async (book) => ({
                ...book,
                url: await ctx.storage.getUrl(book.fileId),
            }))
        );
    },
});
export const createBook = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        fileId: v.id("_storage"),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) throw new ConvexError("Not authenticated");

        await ctx.db.insert("books", {
            title: args.title,
            description: args.description,
            fileId: args.fileId,
            tokenIdentifier: userId,
        });
    },
});

export const deleteBook = mutation({
    args: {
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) return null;

        const book = await ctx.db.get(args.bookId);
        if (!book) return null;

        await ctx.storage.delete(book.fileId);
        await ctx.db.delete(args.bookId);
    }
});