import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";


export const current = query({
    args:{workspaceId:v.id("workspaces")},
    handler: async ( ctx, args ) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return null;
        }
        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id",(q)=>
            q.eq("workspaceId",args.workspaceId).eq("userId",userId)
            )
            .unique()

        if (!member) {
            return null;
        }
        return member; 
    }
})

export const update = mutation({
    args:{
        id:v.id("workspaces"),
        name:v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);
        if (!userId) {
            return null;
        }
        const member = await ctx.db
            .query("members")
            .withIndex("by_workspace_id_user_id",(q)=>
            q.eq("workspaceId",args.id).eq("userId",userId)
            )
            .unique()

        if (!member || member.role !== "admin") {
            throw new Error("未经授权");
        }
        ctx.db.patch(args.id, {
            name:args.name
        })
        return args.id;
    }
})