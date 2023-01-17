import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import CreateView from "../../src/views/create";

export default function Create() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.searchTracks("track:Alright artist:Kendrick Lamar").then(
        function (data) {
          if (
            tracks.some((track) => track.id === data.body.tracks.items[0].id)
          ) {
            console.log("hi");
            return;
          } else {
            setTracks([...tracks, data.body.tracks.items[0]]);
          }
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }
  }, [session, spotifyApi]);

  return <CreateView tracks={tracks} />;
}
