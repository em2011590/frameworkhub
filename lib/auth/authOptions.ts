import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Hardcoded Admin
        if (email === "admin@gmail.com" && password === "123456MPPM") {
          return { id: "0", name: "Admin", email, role: "admin", plan: "premium" } as any;
        }

        // Mock generic users
        if (email.includes("@")) {
          const plan = email.includes("premium") ? "premium" : "free";
          return { id: Math.random().toString(), name: email.split("@")[0], email, role: "user", plan } as any;
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.plan = user.plan;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.plan = token.plan;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
};
