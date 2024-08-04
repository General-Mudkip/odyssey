import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function ProtectedRoute() {
    const session = await getServerAuthSession()

    console.log(session)

    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }

    console.log(session)

    return (
        <div>
            Congrats! This is a protected route.
        </div>
    )
}
