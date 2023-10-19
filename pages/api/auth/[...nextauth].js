import NextAuth from "next-auth/next";
import CredentialsProviderv from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import db from "../../../utils/db";
import User from "../../../models/user";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //jwt is a tool for authen users
    async jwt({ token, user }) {
      //"token" is a string that user auth by them
      if (user?._id) token._id = user._id;

      if (user?.isAdmin) token.isAdmin = user.isAdmin;

      return token;
    },
    //this function is for coordinated between "session" and "token"
    async session({ session, token }) {
      if (token._id) session.user._id = token._id;
      if (token.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProviderv({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({
            email: credentials.email,
        })

        if(user && bcrypt.compareSync(credentials.password, user.password)){
          return{
            _id: user._id,
            name: user.name,
            email:user.email,
            image:'f',
            isAdmin: user.isAdmin
          }
        }

        throw new Error('invalid email or password')
      },
    }),
  ],
});
