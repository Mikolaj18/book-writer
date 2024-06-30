import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const hasAccessToBook = async (ctx: MutationCtx | QueryCtx, bookId: Id<"books">) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return null;

    const book = await ctx.db.get(bookId);
    if (!book) return null;

    if (book.tokenIdentifier !== userId) {
        return null;
    }

    return {book, userId};
}
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
                coverUrl: await ctx.storage.getUrl(book.fileId),
            })),
        );
    },
});

export const getBook = query({
    args: {
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToBook(ctx, args.bookId);
        if (!accessObj) return null;
        const file = await ctx.storage.getUrl(accessObj.book.fileId);

        return {...accessObj.book, coverUrl: file};
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

export const editBook = mutation({
    args: {
        bookId: v.id("books"),
        title: v.string(),
        description: v.string(),
        fileId: v.id("_storage"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToBook(ctx, args.bookId);
        if (!accessObj) throw new ConvexError("You do not have access to this book");

        if(args.fileId !== accessObj.book.fileId) await ctx.storage.delete(accessObj.book.fileId);

        await ctx.db.patch(accessObj.book._id, {
            title: args.title,
            description: args.description,
            fileId: args.fileId ?? accessObj.book.fileId,
        });
    },
});

export const deleteBook = mutation({
    args: {
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToBook(ctx, args.bookId);
        if (!accessObj) throw new ConvexError("You do not have access to this book");

        await ctx.storage.delete(accessObj.book.fileId);
        await ctx.db.delete(args.bookId);

        const chaptersToDelete = await ctx.db.query("chapters")
            .withIndex("by_tokenIdentifier_bookId", (q) =>
                q
                    .eq("tokenIdentifier", accessObj.userId)
                    .eq("bookId", args.bookId)
            )
            .collect();

        for (const chapter of chaptersToDelete) {
            await ctx.db.delete(chapter._id);
        }
    },
});