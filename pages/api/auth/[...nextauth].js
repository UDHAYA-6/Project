import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      //   credentials: {
      //     email: { label: "Email", type: "text" },
      //     password: { label: "password", type: "password" },
      //   },
      authorize: async (credentials) => {
        const cl = await ConnectToDatabase();
        const client = await cl.connect();
        const db = client.db("ukdb");
        const user = await db.collection("Users").findOne({
          Email: credentials.Email,
          Password: credentials.Pass,
        });
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],

  callbacks: {
    async session(session) {
      session.id = "3704890#4890";
      session.Email = user.Email;
      return session;
    },
  },
});
