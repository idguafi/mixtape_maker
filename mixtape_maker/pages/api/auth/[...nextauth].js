import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

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
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,


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
      } else {
        return await refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session 
    },
  },
});
