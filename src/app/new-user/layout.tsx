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
        <body>
            {children}
        </body>
    );
}
