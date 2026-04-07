import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    // Gelecekte Google veya Meta ile giriş eklemek için burayı kullanacağız
  ],
  callbacks: {
    async session({ session, user }) {
      // Oturuma organizasyon ID'sini ekleyebiliriz
      return session;
    },
  },
  pages: {
    signIn: "/onboarding",
  }
});
