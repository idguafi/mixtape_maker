import { Button, Container } from "react-bootstrap";
import { signOut } from "next-auth/react";

export default function ProfileView(props) {
  return (
    <>
      <Container
        className="justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <br></br>
        <h1 className="text-center">YOUR_MXTPS:</h1>
        <br></br>
        <div className="container d-flex gap-2">
          {props.playlists?.map((playlist) => {
            return (
              <div className="row">
                <div className="col-sm">
                  <a
                    href={
                      props.user.accessToken
                        ? playlist.external_urls.spotify
                        : ""
                    }
                  >
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
    </>
  );
}
