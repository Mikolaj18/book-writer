import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";


export const getChapters = query({
    args: {
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) return [];

        const chapters = await ctx.db.query("chapters")
            .withIndex("by_tokenIdentifier_bookId", (q) =>
                q
                    .eq("tokenIdentifier", userId)
                    .eq("bookId", args.bookId)
            )
            .collect();

        return chapters.sort((a, b) => a.index - b.index)
    },
});
export const createChapter = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        bookId: v.id("books",)
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) throw new ConvexError("Not authenticated");

        const chapters = await ctx.db.query("chapters")
            .withIndex("by_tokenIdentifier_bookId", (q) =>
                q.eq("tokenIdentifier", userId).eq("bookId", args.bookId)
            )
            .collect();

        const chapterCount = chapters.length;


        await ctx.db.insert("chapters", {
            title: args.title,
            content: "",
            index: chapterCount,
            tokenIdentifier: userId,
            bookId: args.bookId
        });
    },
});

export const swapChapters = mutation({
    args: {
        bookId: v.id("books"),
        sourceChapterId: v.id("chapters"),
        destinationChapterId: v.id("chapters"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) throw new ConvexError("Not authenticated");

        const sourceChapter = await ctx.db.get(args.sourceChapterId);
        const destinationChapter = await ctx.db.get(args.destinationChapterId);
        if(!sourceChapter || !destinationChapter) throw new ConvexError("Chapter not found");

        if (sourceChapter.tokenIdentifier !== userId || destinationChapter.tokenIdentifier !== userId) {
            throw new ConvexError("Unauthorized");
        }

        await ctx.db.patch(args.sourceChapterId, { index: destinationChapter.index });
        await ctx.db.patch(args.destinationChapterId, { index: sourceChapter.index });
    },
});

