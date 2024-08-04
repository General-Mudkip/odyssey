import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { SignIn } from "./_components/sign-in";

export default async function Home() {

    return (
        <HydrateClient>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] text-white">
                <div className="container flex flex-col items-center justify-center px-4">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-[7rem]">
                        Odyssey
                    </h1>

                    <h2 className="text-4xl pt-4">
                        The quests app
                    </h2>
                </div>
            </main>
        </HydrateClient>
    );
}
