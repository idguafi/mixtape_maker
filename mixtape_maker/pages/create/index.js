import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import CreateView from "../../src/views/create";

export default function Create() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [artistFieldState, setArtistField] = useState("");
  const [titleFieldState, setTitleField] = useState("");

  function search(){
    const payload = JSON.stringify({artist: artistFieldState, title:titleFieldState})
    setArtistField("")
    setTitleField("")

    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchTracks(payload).then(
        function (data) {
          if (
            tracks.some((track) => track.id === data.body.tracks.items[0].id)
          ) {
            return;
          } else {
            data.body.tracks.items.map((track)=>{track.name.toLowerCase().includes(payload.title?.toLowerCase()) ? console.log(track):console.log("no")})
            setTracks([...tracks, data.body.tracks.items[0]]);
          }
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }


  return (
    <CreateView
      tracks={tracks}
      search={search}
      titleFieldState={titleFieldState}
      artistFieldState={artistFieldState}
      setArtistField={(data) => setArtistField(data.target.value)}
      setTitleField={(data) => setTitleField(data.target.value)}
    />
  );
}
