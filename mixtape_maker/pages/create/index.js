import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import CreateView from "../../src/views/create";
import SendTo from "../../src/views/sendTo";

export default function Create() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [artistFieldState, setArtistField] = useState("");
  const [titleFieldState, setTitleField] = useState("");
  const [sendStatus, setSendStatus] = useState(false);

  function removeTrack(trackToRemove) {
    setTracks([...tracks.filter((track) => track !== trackToRemove)]);
  }

  function sendTo() {
    setSendStatus(true);
  }

  function search() {
    const payload = JSON.stringify({
      artist: artistFieldState,
      title: titleFieldState,
    });
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .searchTracks(payload)
        .then((data) => data.body.tracks.items)
        .then((data) =>
          data.filter(
            (track) =>
              track.name.toLowerCase() === titleFieldState.toLowerCase()
          )
        )
        .then((data) =>
            data.filter(
              (track) =>
                track.artists.filter(
                  (artist) =>
                    artist.name.toLowerCase() === artistFieldState.toLowerCase()
                ).length > 0
            )
        )
        .then(data => new Promise(function (resolve, reject){
          if(data.length){
            resolve(data[0])
          }
          else{
            reject(new Error("Couldn't find the requested track!"))
          }
        }))
        .then((searchResultPromise)=>{setTracks([...tracks, searchResultPromise])})
        .catch((e) => {
          console.log(e);
        });
    }
    setArtistField("");
    setTitleField("");
  }

  return (
    <>
      <div>
        <CreateView
          tracks={tracks}
          search={search}
          sendTo={sendTo}
          removeTrack={removeTrack}
          titleFieldState={titleFieldState}
          artistFieldState={artistFieldState}
          setArtistField={(data) => setArtistField(data.target.value)}
          setTitleField={(data) => setTitleField(data.target.value)}
        />
      </div>
    </>
  );
}
