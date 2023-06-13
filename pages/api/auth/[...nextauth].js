import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: "1054766325191423",
      clientSecret: "c36697ad5356b64c63c3831c9a06e5ff",
    }),
    GoogleProvider({
      clientId:
        "681855661783-0b1emiet9ms2ilrp4l6t28vihc11c2kd.apps.googleusercontent.com",
      clientSecret: "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",
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      // credentials: {
      //     username: { label: "Username", type: "text", placeholder: "jsmith" },
      //     password: { label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        const parseData = JSON.parse(credentials.userdata);
        const userDataPayload = {
          email: parseData.Email,
          password: parseData.Password,
        };
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_PATH}/login`,
            userDataPayload
          );
          const decoded = await jwt_decode(res.data.data.token);
          return decoded;
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      // session.user = user
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
