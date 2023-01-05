import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";

//Custom Hooks to use spotify api

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      //If refresh access token fails, redirect to login and try again.
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}
