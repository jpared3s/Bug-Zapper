import NextAuth from "next-auth"

import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

import CustomPrismaAdapter from "@/lib/prisma/prisma-adapter";
import prisma from "@/lib/prisma/prisma"

export const authOptions = {
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],

  callbacks: {
    async session({ session, token, user }) {
      console.log('callback session')
      console.log('session', session)
      console.log('token', token)
      console.log('user', user)

      session.user.id = user.id
      session.user.settings = {
        colorScheme: user.settings.colorScheme
      }
      return session
    }
  },
}

export default NextAuth(authOptions)
