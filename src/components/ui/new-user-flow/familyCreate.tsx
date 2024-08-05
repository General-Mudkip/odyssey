"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "../form"
import { useSession } from "next-auth/react"
import { Input } from "../input"
import { Button } from "../button"
import { api } from "~/trpc/react"

const formSchema = z.object({
    familyName: z.string()
})

export default function CreateFamily({ setFlowStage }) {
    const { data: session } = useSession()

    const createFamily = api.family.createFamily.useMutation()
    const setUserFamily = api.user.assignFamily.useMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createFamily.mutate({
            name: values.familyName
        }, {
            onSuccess: (createdFamily) => {
                setUserFamily.mutate({
                    id: session!.user.id,
                    familyId: createdFamily.id
                }, {
                    onSuccess: () => {
                        setFlowStage("parent-complete")
                    },
                })
            }
        })
    }

    return (
        <>
            <h3 className="text-center text-xl">What will you name your new family?</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField control={form.control} name="familyName" render={({ field }) => (
                        <FormItem>
                            <FormControl >
                                <Input placeholder="The Olympian Family" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <Button type="submit">Submit</Button>
                </form>

            </Form>
        </>
    )
}
