import NextAuth from 'next-auth';
import authConfig from "./auth.config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from './db';
import { getRandonneurById, updateRandonneurPassword } from './randonneursDb';
import z from 'zod';
import { getUserByEmail, updateUserPicture } from './schema';
import bcrypt from 'bcryptjs';

const drizzleClient = db;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(drizzleClient),
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        if (user.id && profile?.picture) {
          updateUserPicture(user.id, profile.picture);
        }
        token.id = z.string().parse(user.id);
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token?.id) {
        session.user.id = z.string().parse(token.id);
      }
      else if (user?.id) {
        session.user.id = z.string().parse(user.id);
      }
      return session;
    }
  },
  providers: [
    Google({
      name: 'Google',
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "nom_utilisateur@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req: any) {
        const email = z.string().email().parse(credentials?.email);
        const user = await getUserByEmail(email ?? '');
        if (user) {
          const randonneur = await getRandonneurById(user.id);
          if (randonneur?.password) {
            // If the user has a password, check it
            const isValidPassword = await bcrypt.compare(credentials?.password, randonneur.password);
            if (isValidPassword) {
              return user;
            }
          }
          else {
            const encryptedPwd = await bcrypt.hash(credentials?.password, 10);
            updateRandonneurPassword(user.id, encryptedPwd);
            return user;
          }
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ]
});


export async function isUserAnimateur() {
  const session = await auth();
  if (!session?.user?.id) {
    return false;
  }
  const randonneur = await getRandonneurById(session.user.id);
  return randonneur?.is_animateur ?? false;
}
