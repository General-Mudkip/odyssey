"use client"
import { useSession } from "next-auth/react"
import { api } from "~/trpc/react"

export default function DashboardHome() {
    const { data: session } = useSession()

    const userQuery = api.user.getUser.useQuery({
        id: session?.user.id ?? ""
    })

    if (!userQuery.isFetched) {
        return null
    }

    const findChildren = api.family.getChildren.useQuery({
        id: userQuery!.data!.familyId ?? ""
    })

    if (!findChildren.isFetched) {
        return null
    }

    return (
        <>
            <h2 className="text-4xl font-bold">Odyssey</h2>
            <div>
                Children:
                {
                    findChildren.data?.map((child) => {
                        return (
                            <div>{child.name}</div>
                        )
                    })
                }
            </div>
        </>
    )
}
