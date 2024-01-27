import "@/styles/globals.css";

import {Inter} from "next/font/google";

import {TRPCReactProvider} from "@/trpc/react";
import {SideNav} from "@/components/SideNav";
import {AuthProvider} from "@/components/AuthProvider";
import { unstable_noStore as noStore } from "next/cache";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: {
        default: "Twitter Clone",
        template: "%s | Twitter Clone",
    },
    description: "This is twitter clone by @ColorKat. Made with love",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export const dynamic = "force-static";
export const revalidate = 60;

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    noStore();

    return (
        <AuthProvider>
            <TRPCReactProvider>

            <html lang="en">
            <body className={`font-sans ${inter.variable}`}>

                <div className="container mx-auto flex items-start">
                    <SideNav/>

                    <div className="min-h-screen flex-grow border-x border-slate-200 sm:pr-4">
                        {children}
                    </div>
                </div>
            </body>
            </html>
            </TRPCReactProvider>
        </AuthProvider>
    );
}
