import { getServerSession, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hash } from 'bcrypt'
import { z } from 'zod';

// const logonUserSchema = z.object({
//     username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
//     password: z.string().min(5, 'Password should be minimum 5 characters'),
// });

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: 'Credential',
            credentials: {
                username: { type: 'text', placeholder: 'test@test.com' },
                password: { type: 'password', placeholder: 'Password' },
            },
            async authorize(credentials) {

                const { username, password }: any = credentials;
                // console.log(username,password)
                const user = await prisma.user.findFirst({
                    where: { username,password },
                    select: { 
                        id: true, 
                        fname: true,
                        lname:true,
                         email: true, 
                         password: true, 
                         level: true, 
                         username: true,
                         Affil: true,
                         Groups:true,
                         Avatar:true,
                         status:true,
                         }
                });
            // console.log(user)

                if (!user || user.status === "false") return null;
                // const isPasswordValid = await compare(password, user.password);
                // if (!isPasswordValid) return null;
                 return { ...user, id: String(user.id), };
            },
        })
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    // debug: process.env.NODE_ENV !== "production",
    pages: {
        signIn: '/app/profile',
        signOut: '/login',
        error: '/error',
        verifyRequest: '/signin',
        newUser: '/'
    },
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        session({ session, token }) {
            session.user = {
                ...session.user,
                // @ts-expect-error
                id: token.sub!,
                // @ts-expect-error
                role: token.user.level!,
                // @ts-expect-error
                username: token.user.username!,
                 // @ts-expect-error
                 name: token.user.fname!,
                 // @ts-expect-error
                 image: token.user.Avatar!

            };
            // console.log(token)
            return session
        },
        jwt({ token, user }) {
            if (user) {
                token.user = user;

            }
            // console.log(token)
            return token
        },
    },

};

export function getSession() {
    return getServerSession(authOptions) as Promise<{
        user: {
            id: string;
            name: string;
            lname: string;
            username: string;
            email: string;
            role: string;
            Avatar: string;
        };
    } | null>;
}
