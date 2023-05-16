import NextAuth from "next-auth/next";

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

      return token
    },
  },
});
