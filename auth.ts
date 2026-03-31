import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const config = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Hardcoded Admin
        if (email === "admin@gmail.com" && password === "123456MPPM") {
          return { id: "0", name: "Admin", email, role: "admin", plan: "premium" };
        }

        // Mock generic users
        if (email.includes("@")) {
          const plan = email.includes("premium") ? "premium" : "free";
          return { id: Math.random().toString(), name: email.split("@")[0], email, role: "user", plan };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // Initialize token with user data on first login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.plan = user.plan;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Ensure user object exists and populate with token data
      if (!session.user) {
        session.user = { email: "", image: null };
      }
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.role = token.role as string;
      session.user.plan = token.plan as string;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" as const },
  trustHost: true,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
