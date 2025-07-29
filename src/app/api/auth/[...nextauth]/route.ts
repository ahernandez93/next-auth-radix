import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/libs/prisma"
import bcrypt from "bcrypt"

const handler = NextAuth({
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
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
})

export { handler as GET, handler as POST }