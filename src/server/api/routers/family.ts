import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db"

export const familyRouter = createTRPCRouter({
    createFamily: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(({ input }) => {
            return db.family.create({
                data: {
                    name: input.name
                }
            })
        })
})
