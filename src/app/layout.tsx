import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import SessionProvider from "./_components/SessionProvider";
import NavMenu from "./_components/NavMenu";

export const metadata: Metadata = {
    title: "Odyssey",
    description: "The quests app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerAuthSession();

    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2563eb] to-[#1e3a8a] text-white">
                <SessionProvider session={session}>
                    <TRPCReactProvider>
                        <NavMenu />
                        {children}
                    </TRPCReactProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
