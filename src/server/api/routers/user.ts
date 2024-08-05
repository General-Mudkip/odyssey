import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db"

export const userRouter = createTRPCRouter({
    getRole: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input }) => {
            return db.user.findFirst({
                where: {
                    id: input.id
                }
            })
        }),

    setRole: protectedProcedure
        .input(z.object({ id: z.string(), role: z.string() }))
        .mutation(({ input }) => {
            return db.user.update({
                where: {
                    id: input.id
                },
                data: {
                    role: input.role
                }
            })
        })
})
