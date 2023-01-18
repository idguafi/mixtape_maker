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

  function removeTrack(trackToRemove) {
    setTracks([...tracks.filter((track) => track !== trackToRemove)]);
  }

  function search() {
    async function makePayload() {
      const payload = await JSON.stringify({
        artist: artistFieldState,
        title: titleFieldState,
      });
      return payload;
    }
    if (spotifyApi.getAccessToken()) {
      makePayload()
        .then((payload) => {
          spotifyApi.searchTracks(payload).then(function (data) {
            if (
              tracks.some((track) => track.id === data.body.tracks.items[0].id) //Checking whether or not the song is already stored.
            ) {
              return;
            } else {
              setTracks([
                ...tracks,
                data.body.tracks.items.filter(
                  (track) =>
                    track.name
                      .toLowerCase()
                      .includes(titleFieldState.toLowerCase()) &&
                    track.artists.filter(
                      (artist) =>
                        artist.name.toLowerCase() ===
                        artistFieldState.toLowerCase()
                    ).length > 0
                )[0],
              ]); //Had to use the stored title field state to search for the specific song title. Wasn't getting the title from the payload as the promise had not yet resolved at this point. Will look into it later though...
            }
          });
        })
        .catch((e) => console.log(e));
    }
    setArtistField("");
    setTitleField("");
  }

  return (
    <CreateView
      tracks={tracks}
      search={search}
      removeTrack={removeTrack}
      titleFieldState={titleFieldState}
      artistFieldState={artistFieldState}
      setArtistField={(data) => setArtistField(data.target.value)}
      setTitleField={(data) => setTitleField(data.target.value)}
    />
  );
}
