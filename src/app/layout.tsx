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

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerAuthSession();

    // TODO: Try and see if there's a better way to implement this new user flow.
    console.log(session?.user)
    if (session?.user.role == "None") {
        console.log("This person needs to FLOW.")

    }

    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
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
