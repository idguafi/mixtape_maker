import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
import firebaseConfig from "../../../lib/firestoredb";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken); // Ger spotify Api:n våran döda accesstoken samt vår refreshtoken. detta tillåter oss att hämta nytt nedan.
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken(); // destruct svaret från spotifyApi.

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // refreshed token ger ett resultat på 3600 s = 1h. lägg till på tiden nu för att få exp tiden.
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error.message);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export default NextAuth({
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
  },

  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_ID,
      clientSecret: process.env.NEXT_PUBLIC_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

  adapter: FirestoreAdapter(firebaseConfig),

  callbacks: {
    async jwt({ token, account, user }) {
      //we're destructing a jwt
      if (account && user) {
        //account, user endast passerade in i denna callback första gången man loggar in.
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000, //multiplicera tiden då våran accesstoken tar slut med 1000 ms
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        //check if session has expired, and return previous token if not.
        return token;
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      session.user.sub = token.sub
      return session;
    },
  },
});
