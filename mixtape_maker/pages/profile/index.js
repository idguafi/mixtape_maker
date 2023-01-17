import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useSpotify from "../../hooks/useSpotify";
import { userPlaylistsToDb, sendMessageToUser } from "../../lib/firestoredb";
import Loading from "../../src/views/loading";
import ProfileView from "../../src/views/profileView";

export default function Profile() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (playlists) {
      userPlaylistsToDb(playlists, session?.user.sub);
    } else {
      return;
    }
  }, [playlists]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  return (
    <>
      {!playlists ? (
        <Loading />
      ) : (
        <ProfileView user={session?.user} playlists={playlists} />
      )}
    </>
  );
}
