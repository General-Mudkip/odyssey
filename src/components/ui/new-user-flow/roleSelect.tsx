"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

import { z } from "zod";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

const formSchema = z.object({
    role: z.string()
})

export default function RoleSelect({ setFlowStage }) {
    const userSetRole = api.user.setRole.useMutation()
    const { data: session } = useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "Parent"
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        userSetRole.mutate({
            id: session!.user.id,
            role: values.role
        }, {
            onSuccess: () => {
                if (values.role == "Parent") {
                    // TODO: Allow parents to join other families.
                    setFlowStage("parent-create-family")
                } else {
                    setFlowStage("child-join-family")
                }
            }
        }
        )
    }

    return (
        <>
            <h3 className="text-center text-xl">Are you a parent or child?</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <RadioGroup defaultValue="Parent" onValueChange={field.onChange}>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Parent" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Parent
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="Child" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Child
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
