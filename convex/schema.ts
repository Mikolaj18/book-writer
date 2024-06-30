import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    books: defineTable({
        title: v.string(),
        description: v.string(),
        fileId: v.id("_storage"),
        tokenIdentifier: v.string(),
    }).index("by_tokenIdentifier", ["tokenIdentifier"]),
    chapters: defineTable({
        title: v.string(),
        index: v.number(),
        content: v.string(),
        bookId: v.id("books"),
        tokenIdentifier: v.string(),
    }).index("by_tokenIdentifier_bookId", ["tokenIdentifier", "bookId"]),
});