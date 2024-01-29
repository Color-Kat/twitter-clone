import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
        callbacks: {
            session: ({ session, user }) => {
                return {
                    ...session,
                    user: {
                        ...session.user,
                        id: user.id,
                    },
                }
            },
            async jwt({ token, account, user }) {
                // Persist the OAuth access_token and or the user id to the token right after signin
                if (account) {
                    token.accessToken = account.access_token
                    token.id = user.id
                }
                return {
                    ...token,
                    user
                }
            }
        },
        adapter: PrismaAdapter(db),
        providers: [
            DiscordProvider({
                clientId: env.DISCORD_CLIENT_ID,
                clientSecret: env.DISCORD_CLIENT_SECRET,
            }),

            CredentialsProvider({
                // The name to display on the sign in form (e.g. "Sign in with...")
                name: "Credentials",
                // `credentials` is used to generate a form on the sign in page.
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    name: { label: "Name", type: "text", placeholder: "John" },
                    email: { label: "Email", type: "text", placeholder: "John@color.ru" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    if (!credentials) return null;

                    const user = await db.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    // Register
                    if (!user) {
                        const hashPassword = await bcrypt.hash(credentials.password, 10)

                        const createdUser = await db.user.create({
                            data: {
                                name: credentials.name,
                                email: credentials.email,
                                password: hashPassword,
                            }
                        });

                        return createdUser;
                    } else {
                        // Login
                        const isPasswordValid = await bcrypt.compare(credentials.password, user.password ?? "");
                        if (!isPasswordValid) return null;

                        return user;
                    }
                }
            })
            /**
             * ...add more providers here.
             *
             * Most other providers require a bit more work than the Discord provider. For example, the
             * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
             * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
             *
             * @see https://next-auth.js.org/providers/github
             */
        ],
    }
;

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
