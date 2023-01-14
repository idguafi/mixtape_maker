import Login from "./login";
import Profile from "./profile";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <Profile />;
  }
}
