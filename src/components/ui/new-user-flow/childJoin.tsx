"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../form"
import { useSession } from "next-auth/react"
import { Input } from "../input"
import { Button } from "../button"
import { api } from "~/trpc/react"
import { useState } from "react"

const formSchema = z.object({
    familyId: z.string()
})

export default function ChildJoinFamily({ setFlowStage }) {
    const { data: session } = useSession()
    const [invalidFamily, setInvalidFamily] = useState(false)

    const setUserFamily = api.user.assignFamily.useMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setUserFamily.mutate({
            id: session!.user.id,
            familyId: values.familyId
        }, {
            onError: () => {
                setInvalidFamily(true)
            }
        })
    }

    return (
        <>
            <h3 className="text-center text-xl">What is your family's ID?</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
                    <FormField control={form.control} name="familyId" render={({ field }) => (
                        <FormItem>
                            <FormControl >
                                <Input placeholder="zxcawe12390usdjzx" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    {invalidFamily ? (<FormLabel className="pt-2 text-red-700">Invalid family!</FormLabel>) : null}

                    <Button type="submit" className="mt-6">Submit</Button>
                </form>

            </Form>
        </>
    )
}
