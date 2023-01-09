import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import useSpotify from "../../hooks/useSpotify";
import { userPlaylistsToDb } from "../../lib/firestoredb";

export default function Profile() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
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
      <Container
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-center ">Welcome, {session?.user.name}!</h1>
        <h2 className="text-center">Your current playlists: </h2>
        <div className="container d-flex gap-2">
          {playlists?.map((playlist) => {
            return (
              <div className="row">
                <div className="col-sm">
                  <a href={ session.user.accessToken ? playlist.external_urls.spotify:""}>
                    <img
                      src={playlist.images[0].url}
                      width="200"
                      height="200"
                    ></img>
                  </a>
                </div>
                <div className="w-100"></div>
                <div className="col-sm">
                  <p>{playlist.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
      <div className="container">
        <div className="col-md-12 text-center position-absolute top-50 start-0 translate-middle-y">
          <Button
            onClick={() => {
              signOut({ callbackUrl: "/" });
            }}
            className=" justify-content-center align-items-center"
          >
            Sign Out!
          </Button>
        </div>
      </div>
    </>
  );
}
