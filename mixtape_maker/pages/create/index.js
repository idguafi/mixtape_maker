import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../../hooks/useSpotify";
import CreateView from "../../src/views/create";
import { sendMessageToUser } from "../../lib/firestoredb";

export default function Create() {
  const [tracks, setTracks] = useState([]);
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [artistFieldState, setArtistField] = useState("");
  const [titleFieldState, setTitleField] = useState("");
  const [userName, setUserName] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");

  function removeTrack(trackToRemove) {
    setTracks([...tracks.filter((track) => track !== trackToRemove)]);
  }

  function send() {
    sendMessageToUser(
      session?.user.sub,
      { playlistTitle: playlistTitle, tracks: tracks },
      userName
    ).then(() => {
      setTracks([]);
    });
    setUserName("");
    setPlaylistTitle("");
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
        .then((data) => {
          const new_Data = data.filter((track) =>
            track.artists.some(
              (artist) =>
                artist.name.toLowerCase() === artistFieldState.toLowerCase()
            )
          );
          return new_Data;
        })
        .then(
          (data) =>
            new Promise(function (resolve, reject) {
              if (data.length) {
                resolve(data[0]);
              } else {
                reject(new Error("Couldn't find the requested track!"));
              }
            })
        )
        .then((searchResultPromise) => {
          setTracks([...tracks, searchResultPromise]);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setArtistField("");
    setTitleField("");
  }

  return (
    <>
      <CreateView
        tracks={tracks}
        send={send}
        search={search}
        removeTrack={removeTrack}
        titleFieldState={titleFieldState}
        artistFieldState={artistFieldState}
        userName={userName}
        playlistTitle={playlistTitle}
        setArtistField={(data) => setArtistField(data.target.value)}
        setTitleField={(data) => setTitleField(data.target.value)}
        setUserNameField={(data) => setUserName(data.target.value)}
        setPlaylistTitle={(data) => setPlaylistTitle(data.target.value)}
      />
    </>
  );
}
