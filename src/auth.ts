import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./models/userModel";
import { compare, genSalt, hash } from "bcrypt-ts";

const authConfig = {
  providers: [Credentials({
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials, request) {
      if (!credentials.email || !credentials.password) {
        throw new Error("Invalid credentials")
      }

      const userExists = await User.findOne({ email: credentials.email })
      if (!userExists) {
        throw new Error("User does not exists")
      }

      const salt = await genSalt(10)
      const isValid = await compare(credentials.password.toString(), userExists.password)


      if (!isValid) {
        throw new Error("Incorrect Password")
      }

      const jsonUser = userExists.toJSON()

      return { ...jsonUser, _id: jsonUser._id.toString() }
    },
  })],
  secret: [process.env.AUTH_SECRET!, process.env.AUTH_SECRET_1!],
  callbacks: {
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl;

    //   if (!pathname.startsWith("/api/auth")) return !!auth;
    //   return true;
    // },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      console.log(session.user);

      session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig)

