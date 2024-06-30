import {mutation} from "./_generated/server";
import {ConvexError, v} from "convex/values";

export const createChapter = mutation({
    args: {
        title: v.string(),
        content: v.string(),
        bookId: v.id("books",)
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) throw new ConvexError("Not authenticated");

        await ctx.db.insert("chapters", {
            title: args.title,
            content: "",
            tokenIdentifier: userId,
            bookId: args.bookId
        });
    },
});
