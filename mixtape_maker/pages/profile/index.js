import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useSpotify from "../../hooks/useSpotify";

export default function Profile() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items));
    }
  }, [session, spotifyApi]);


  return (
    <Container>
      <h1 className="text-center">Welcome, {session?.user.name}!</h1>
      <h2 className="text-center">Your current playlists: </h2>
      <table>
      {playlists?.map((playlist) => {
        return (
          <tr>
          <td key={playlist.id}>
            <p>{playlist.name}</p>    
          </td>
          </tr>
        );
      })}
    </table>
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
