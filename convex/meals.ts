import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Unauthenticated");

    const query = ctx.db.query("meals");
    let afterIndex;

    const search = args.search;
    if (search !== undefined) {
      afterIndex = query.withSearchIndex("search_title", (q) =>
        q.search("title", search).eq("user", identity.tokenIdentifier),
      );
    } else {
      afterIndex = query
        .withIndex("by_user_and_last_used", (q) =>
          q.eq("user", identity.tokenIdentifier),
        )
        .order("desc");
    }

    return await afterIndex.collect();
  },
});

export const submit = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Unauthenticated");

    const res = await ctx.db.insert("meals", {
      user: identity.tokenIdentifier,
      title: args.title,
      lastUsed: Date.now(),
    });

    return res;
  },
});

export const reuse = mutation({
  args: {
    meal: v.id("meals"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Unauthenticated");

    const meal = await ctx.db.get("meals", args.meal);
    if (meal === null) throw new Error("Meal not found");
    if (meal.user !== identity.tokenIdentifier)
      throw new Error("Meal not found");

    await ctx.db.patch("meals", meal._id, {
      lastUsed: Date.now(),
    });
  },
});

export const remove = mutation({
  args: {
    meal: v.id("meals"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Unauthenticated");

    const meal = await ctx.db.get("meals", args.meal);
    if (meal === null) throw new Error("Meal not found");
    if (meal.user !== identity.tokenIdentifier)
      throw new Error("Meal not found");

    await ctx.db.delete("meals", meal._id);
  },
});

export const setDate = mutation({
  args: {
    meal: v.id("meals"),
    lastUsed: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) throw new Error("Unauthenticated");

    const meal = await ctx.db.get("meals", args.meal);
    if (meal === null) throw new Error("Meal not found");
    if (meal.user !== identity.tokenIdentifier)
      throw new Error("Meal not found");

    await ctx.db.patch("meals", meal._id, {
      lastUsed: args.lastUsed,
    });
  },
});
