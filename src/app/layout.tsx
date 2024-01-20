import "@/styles/globals.css";

import {Inter} from "next/font/google";

import {TRPCReactProvider} from "@/trpc/react";
import {SideNav} from "@/app/components/SideNav";
import {Provider} from "@/app/components/Provider";

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

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <Provider>
            <html lang="en">
            <body className={`font-sans ${inter.variable}`}>
            <TRPCReactProvider>

                <div className="container mx-auto flex items-start">
                    <SideNav/>

                    <div className="min-h-screen  flex-grow border-x border-slate-200">
                        {children}
                    </div>

                </div>
            </TRPCReactProvider>
            </body>
            </html>
        </Provider>
    );
}
