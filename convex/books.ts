import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const getBooks = query({
    async handler(ctx) {
        return await ctx.db.query("books").collect()
    }
});
export const createBook = mutation({
    args: {
        title: v.string(),
    },
    async handler(ctx, args) {
        await ctx.db.insert("books", {
            title: args.title
        });
    },
});