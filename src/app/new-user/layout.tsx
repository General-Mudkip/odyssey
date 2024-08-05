import "~/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Odyssey",
    description: "The quests app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children,
}: Readonly<{ children: React.ReactNode }>) {

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] text-white">
            <div className="flex h-[28rem] w-[20rem] flex-col space-y-8 items-center rounded-xl bg-white p-8 text-black">
                {children}
            </div >
        </main>
    );
}
