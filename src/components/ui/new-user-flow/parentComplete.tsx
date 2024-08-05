import Link from "next/link";

export default function ParentComplete() {
    return (
        <>
            <h3 className="text-center text-xl">Onboarding complete!</h3>
            <h3 className="text-center text-lg">Enjoy odyssey.</h3>

            <Link href="/dashboard" className="underline">Explore Odyssey!</Link>
        </>
    )
}
