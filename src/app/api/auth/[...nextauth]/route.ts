import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "******" }
            },
            async authorize() {
                return null

            }
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
})

export { handler as GET, handler as POST }