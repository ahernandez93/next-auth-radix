import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/libs/prisma"
import bcrypt from "bcrypt"

export const authOption: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "******" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Missing credentials");
                }
                const { email, password } = credentials;

                const userFound = await prisma.user.findUnique({ where: { email } });
                if (!userFound) {
                    throw new Error("Invalid credentials");
                }
                const isPasswordValid = await bcrypt.compare(password, userFound.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: userFound.id,
                    name: userFound.name,
                    email: userFound.email,
                };

            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub as string;
            }

            return session;
        },
    },
    pages: {
        signIn: "/auth/login",
    },
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST }