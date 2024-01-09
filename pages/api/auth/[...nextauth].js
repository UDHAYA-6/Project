import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDatabase } from "@/Mongodb/mongodb";
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const cl = await ConnectToDatabase();
        const client = await cl.connect();
        const db = client.db("ukdb");

        const user = await db.collection("Users").findOne({
          Email: credentials.Email,
          Password: credentials.Pass,
        });
        if (user) {
          return { email: credentials.Email, name: user.Name };
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],

  callbacks: {
    async session(session) {
      console.log(session);
      return session;
    },
  },
});
