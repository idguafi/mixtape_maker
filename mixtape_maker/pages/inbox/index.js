import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  deleteMessageFromUser,
  getUserMessagesFromDb,
} from "../../lib/firestoredb";
import useSpotify from "../../hooks/useSpotify";
import Loading from "../../src/views/loading";
import InboxView from "../../src/views/inbox";
import LandingPage from "../src/views/landingPage";

export default function Inbox() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session?.user) {
      getUserMessagesFromDb(session?.user.sub)
        .then((newMessages) => {
          setMessages([...Object.values(newMessages)]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setMessages([]);
    }
  }, [messages, session?.user]);

  function createPrivatePlaylistFromMessage(playlistTitle, tracks) {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .createPlaylist(playlistTitle)
        .then(function (data) {
          return data;
        })
        .then((data) => {
          spotifyApi.addTracksToPlaylist(data.body.id, tracks);
        })
        .then(deleteMessageFromUser(session.user.sub, playlistTitle))
        .catch((e) => console.log(e));
    }
  }

  function deletePlaylistFromInbox(playlistTitle) {
    setMessages(messages.filter((message) => message.title === playlistTitle)); // delete locally
    deleteMessageFromUser(session.user.sub, playlistTitle); // delete from firebase
  }

  if (session) {
    return (
      <>
        {!messages ? (
          <Loading />
        ) : (
          <InboxView
            messages={messages}
            onAccept={createPrivatePlaylistFromMessage}
            onDelete={deletePlaylistFromInbox}
          />
        )}
      </>
    );
  } else {
    return <LandingPage />;
  }
}
