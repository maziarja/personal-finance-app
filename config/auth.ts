import NextAuth, { Session } from "next-auth";
import Google from "next-auth/providers/google";
import connectDB from "./database";
import User from "@/models/User";
import { NextRequest } from "next/server";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { createInitialFinance } from "@/app/_lib/createInitialFinance";

// Google provider
const googleProviders = Google({
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});

// Credential provider
const credentialsProvider = Credentials({
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },

  // Authorize happens before sign in and after sign up
  authorize: async (credentials) => {
    if (!credentials.email || !credentials.password) return null;
    // Logic to verify if the user exists
    await connectDB();
    const currentUser = await User.findOne({
      email: credentials.email,
    }).lean();
    if (!currentUser) return null;
    if (typeof credentials.password !== "string") {
      throw new Error("Invalid password");
    }
    if (currentUser.password) {
      const isValid = await bcrypt.compare(
        credentials.password,
        currentUser.password,
      );
      if (!isValid) return null;
    }
    // We return a user object to tell nextAuth it is authorized and also adding this object to session
    return {
      id: currentUser._id.toString(),
      name: currentUser.name,
      email: currentUser.email,
    };
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [googleProviders, credentialsProvider],

  callbacks: {
    // This authorized happens after sign in and we need it just if we have credentials (we don't need it if we just have google provider)
    authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
          });
          await newUser.save();
          // Create initial data for new user
          await createInitialFinance(newUser._id);
        }
      } catch (error) {
        console.log(error);
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async session({ session, token }) {
      if (token) session.user.id = token.id as string;
      await connectDB();
      const currentUser = await User.findOne({ email: session.user?.email });
      if (currentUser && session.user) {
        session.user.id = currentUser._id.toString();
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
} satisfies import("next-auth").NextAuthConfig);
