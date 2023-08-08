import prisma from "../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Used .default TWICE, because otherwise we got 2 WEBPACK errors. This kind of approach make the session stuff up and running.

export const authOptions = {
    providers: [
        GoogleProvider.default({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
    ],
    adapter: PrismaAdapter(prisma),
}

const authHandler =  NextAuth.default(authOptions);
export default authHandler;