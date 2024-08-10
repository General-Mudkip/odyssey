"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { api } from "~/trpc/react"
import { redirect, usePathname } from "next/navigation"
import { useEffect } from "react"


function AuthButton() {
    const { data: session } = useSession()
    const pathname = usePathname()

    const userQuery = api.user.getUser.useQuery({
        id: session?.user.id ?? ""
    })

    useEffect(() => {
        if (userQuery.isFetched) {
            if (userQuery?.data!.role == "None" && pathname != "/new-user") {
                redirect("/new-user")
            }
        }
    })


    if (session) {
        return (
            <>
                {session?.user?.name} < br />
                <button onClick={() => signOut()}>Sign Out</button>
            </>
        )
    } else {
        return (
            <>
                Not signed in <br />
                <button onClick={() => signIn()}>Sign In</button>
            </>
        )
    }
}

export default function NavMenu() {
    return (
        <div>
            <AuthButton />
            <Link href="/protected">Protected</Link>
        </div>
    )
}
