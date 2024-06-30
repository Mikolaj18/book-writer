import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";


export const getChapters = query({
    args: {
        bookId: v.id("books"),
    },
    async handler(ctx, args) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if (!userId) return [];

        return await ctx.db.query("chapters")
            .withIndex("by_tokenIdentifier_bookId", (q) =>
                q
                    .eq("tokenIdentifier", userId)
                    .eq("bookId", args.bookId),
            )
            .collect();
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

        await ctx.db.insert("chapters", {
            title: args.title,
            content: "",
            tokenIdentifier: userId,
            bookId: args.bookId
        });
    },
});
