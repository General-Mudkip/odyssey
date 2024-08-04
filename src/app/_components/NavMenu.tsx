"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { api } from "~/trpc/react"


function AuthButton() {
    const { data: session } = useSession()

    const userQuery = api.user.getRole.useQuery({
        id: session?.user.id ?? ""
    })


    console.log(userQuery)
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
