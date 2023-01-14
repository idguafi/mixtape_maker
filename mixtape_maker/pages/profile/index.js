import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useSpotify from "../../hooks/useSpotify";
import { userPlaylistsToDb, sendMessageToUser } from "../../lib/firestoredb";
import ProfileView from "../../src/views/profileView";

export default function Profile() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    sendMessageToUser(session?.user.sub, playlists?playlists[0]:"", "user 2")
    userPlaylistsToDb(playlists, session?.user.sub);
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
    <ProfileView user={session?.user} playlists={playlists}/>
    </>
  );
}
