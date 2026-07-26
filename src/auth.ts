import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDb } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },

      // FIX #1: Removed unused 'request' parameter
      async authorize(credentials) {
        // FIX #2: Safely extract and validate credentials
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectDb();

        // FIX #3: Explicitly select password because schema hides it by default
        const user = await User.findOne({ email: email.toLowerCase() }).select(
          "+password",
        );

        if (!user) {
          throw new Error("No user found with this email");
        }

        // FIX #4: Proper error throwing syntax
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // FIX #5: Guard against null email from Google
        if (!user.email) {
          throw new Error("Google account must have an email");
        }

        await connectDb();

        // FIX #6: Handle both existing and new users; assign result to variable
        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          // FIX #7: Create user with dummy password (schema requires it)
          // Also handle null name from Google
          dbUser = await User.create({
            name: user.name || "Google User",
            email: user.email,
            password: crypto.randomUUID(), // Random password for OAuth users
            role: "user",
          });
        }

        // FIX #8: Convert ObjectId to string
        user.id = dbUser._id.toString();
        user.role = dbUser.role;
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },

  secret: process.env.AUTH_SECRET,
});
