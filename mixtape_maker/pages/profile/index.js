import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useSpotify from "../../hooks/useSpotify";

export default function Profile() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState("Empty");

  console.log(playlists)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);

  return (
    <Container className="d-flex  align-items-center">
      <h1>Welcome, {session?.user.name}!</h1>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out!
        </Button>
      </Container>
    </Container>
  );
}
