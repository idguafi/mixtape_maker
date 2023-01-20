import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  deleteMessageFromUser,
  getUserMessagesFromDb,
} from "../../lib/firestoredb";
import useSpotify from "../../hooks/useSpotify";
import Loading from "../../src/views/loading";
import InboxView from "../../src/views/inbox";

export default function Inbox() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session?.user) {
      getUserMessagesFromDb(session?.user.sub)
        .then((newMessages) => {
          setMessages([...newMessages]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setMessages([]);
    }
  }, [session?.user]);

  function createPrivatePlaylistFromMessage(
    playlistTitle,
    nameOfMessageToBeDeleted,
    tracks
  ) {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .createPlaylist(playlistTitle)
        .then(function (data) {
            return data
        })
        .then((data) => {
            console.log(data.body.id)
          spotifyApi.addTracksToPlaylist(data.body.id, ["spotify:track:4QTwWQDW89udp0JDO2lmPI"]).then(function (data) {
            console.log("Added tracks to playlist!");
          });
        })

        .catch((e) => console.log(e));
    }
  }

  return (
    <>
      {!messages ? (
        <Loading />
      ) : (
        <InboxView
          messages={messages}
          onAccept={createPrivatePlaylistFromMessage}
        />
      )}
    </>
  );
}
