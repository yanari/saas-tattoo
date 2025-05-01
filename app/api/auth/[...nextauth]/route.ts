import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/prisma/client'

import GoogleProvider from 'next-auth/providers/google'
import InstagramProvider from 'next-auth/providers/instagram'

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID as string,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string,
    }),
  ],
})

export { handler as GET, handler as POST }
