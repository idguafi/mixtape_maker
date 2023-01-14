import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { getUserMessagesFromDb } from "../../lib/firestoredb";
import NavbarView from "../../src/views/navbarView";

export default function Navbar() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session?.user) {
      getUserMessagesFromDb(session?.user.sub)
        .then((messages) => setMessages(messages))
        .catch((e) => console.log(e));
    } else {
      setMessages([]);
    }
  }, [session?.user]);

  return (
    <>
      <NavbarView loggedIn={session?.user ? true : false} messages={messages} />
    </>
  );
}
