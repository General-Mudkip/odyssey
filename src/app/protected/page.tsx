import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function ProtectedRoute() {
    const session = await getServerAuthSession()

    if (!session || !session.user) {
        redirect("/api/auth/signin")
    }

    return (
        <div>
            Congrats! This is a protected route.
        </div>
    )
}
