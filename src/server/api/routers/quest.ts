import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db"

export const questRouter = createTRPCRouter({
    createQuest: protectedProcedure
        .input(z.object({
            creatorId: z.string(),
            due: z.date().optional(),
            name: z.string(),
            description: z.string().optional(),
            bounty: z.string()
        }))
        .mutation(({ input }) => {
            return db.quest.create({
                data: {
                    creatorId: input.creatorId,
                    due: input.due,
                    name: input.name,
                    description: input.description,
                    bounty: input.bounty
                }
            })
        })
})
