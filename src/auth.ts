import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import db from "./utils/db";

const authConfig = {
  providers: [Credentials({
    credentials: {
      username: {
        label: 'Username'
      },
      password: {
        label: 'Password'
      },
    },
    async authorize(credentials, request) {

      if (!credentials.username || !credentials.password) {
        return null
      }

      const userExists = await db.user.findFirst({ where: { username: credentials.username } })

      if (!userExists) {
        return null
      }

      const isValid = await compare(credentials.password.toString(), userExists.password)

      if (!isValid) {
        return null
      }

      return userExists;
    },
  })],
  secret: [process.env.AUTH_SECRET!, process.env.AUTH_SECRET_1!],

} satisfies NextAuthConfig

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig)

