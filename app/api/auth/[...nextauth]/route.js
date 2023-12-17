import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
console.log("Google Client ID:", process.env.NEXT_PUBLIC_NEXT_APP_CLIENT_ID);
console.log("Google Client Secret:", process.env.NEXT_PUBLIC_NEXT_APP_CLIENT_SECRET);

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_NEXT_APP_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_NEXT_APP_CLIENT_SECRET
        })
    ]
})

export { handler as GET, handler as POST }