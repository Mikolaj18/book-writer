import {mutation, MutationCtx, query, QueryCtx} from "./_generated/server";
import {ConvexError, v} from "convex/values";
import {Id} from "./_generated/dataModel";
export const hasAccessToChapter = async (ctx: MutationCtx | QueryCtx, chapterId: Id<"chapters">) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) return null;

    const chapter = await ctx.db.get(chapterId);
    if (!chapter) return null;

    if (chapter.tokenIdentifier !== userId) {
        return null;
    }

    return {chapter, userId};
}

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

        return chapters.sort((a, b) => a.index - b.index);
    },
});

export const getChapter = query({
    args: {
        chapterId: v.id("chapters"),
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToChapter(ctx, args.chapterId);
        if (!accessObj) return null;

        if(accessObj.chapter.bookId !== args.bookId) return null;

        return {...accessObj.chapter};
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

        const timestamp = Math.floor(Date.now() / 1000)

        await ctx.db.insert("chapters", {
            title: args.title,
            content: "",
            index: timestamp,
            tokenIdentifier: userId,
            bookId: args.bookId
        });
    },
});

export const editChapterTitle = mutation({
    args: {
        bookId: v.id("books"),
        chapterId: v.id("chapters"),
        title: v.string(),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToChapter(ctx, args.chapterId);
        if (!accessObj) throw new ConvexError("You do not have access to this chapter");
        if(accessObj.chapter.bookId !== args.bookId) throw new ConvexError("You do not have access to this chapter");

        await ctx.db.patch(accessObj.chapter._id, {
            title: args.title,
        });
    },
});

export const deleteChapter = mutation({
    args: {
        chapterId: v.id("chapters"),
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const accessObj = await hasAccessToChapter(ctx, args.chapterId);
        if (!accessObj) throw new ConvexError("You do not have access to this chapter");
        if(accessObj.chapter.bookId !== args.bookId) throw new ConvexError("You do not have access to this chapter");

        await ctx.db.delete(args.chapterId);
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

