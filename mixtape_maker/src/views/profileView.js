import { Button, Container } from "react-bootstrap";
import { signOut } from "next-auth/react";

export default function ProfileView(props) {
  return (
    <>
      <Container
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-center ">Welcome, {props.user.name}!</h1>
        <h2 className="text-center">Your current playlists: </h2>
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
