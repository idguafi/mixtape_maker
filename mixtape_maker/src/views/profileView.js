import { Button, Container } from "react-bootstrap";
import { signOut } from "next-auth/react";

export default function ProfileView(props) {
  return (
    <>
      <div className="container">
        <br></br>
        <h1 className="text-center">YOUR_MXTPS:</h1>
        <br></br>
        <div className="row  d-flex justify-content-around">
          {props.playlists?.map((playlist) => {
            return (
              <div className="col-md-4">
                <a
                  href={
                    props.user.accessToken ? playlist.external_urls.spotify : ""
                  }
                >
                  <img
                    src={playlist.images[0].url}
                    class="mx-auto d-block img-fluid"
                  ></img>
                </a>
                <p>{playlist.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
