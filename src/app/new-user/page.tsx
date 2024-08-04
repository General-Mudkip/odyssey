"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

import { z } from "zod";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
    role: z.string()
})

export default function NewUserFlow() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "Parent"
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] text-white">
            <div className="flex h-[28rem] w-[20rem] flex-col items-center rounded-xl bg-white p-8 text-black">
                <h1 className="text-center text-3xl font-bold">Welcome to Odyssey!</h1>
                <h3 className="pt-4 text-xl">Are you a parent or child?</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField control={form.control} name="role" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parent or Child?</FormLabel>
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

                    </form>

                </Form>
                <Button type="submit">Submit</Button>
            </div>
        </main>
    )
}
