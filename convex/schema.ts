import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  meals: defineTable({
    user: v.string(),
    title: v.string(),
    lastUsed: v.number(),
  })
    .index("by_user_and_last_used", ["user", "lastUsed"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["user"],
    }),
});
