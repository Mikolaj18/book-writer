import {mutation, query} from "./_generated/server";
import {ConvexError, v} from "convex/values";

export const getBooks = query({
    async handler(ctx) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) return [];

        return await ctx.db.query("books")
            .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
            .collect();
    },
});
export const createBook = mutation({
    args: {
        title: v.string(),
    },
    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
        if(!userId) throw new ConvexError("Not authenticated");

        await ctx.db.insert("books", {
            title: args.title,
            tokenIdentifier: userId,
        });
    },
});