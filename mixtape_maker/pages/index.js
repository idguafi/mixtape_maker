import Profile from "./profile";
import { useSession } from "next-auth/react";
import LandingPage from "../src/views/landingPage";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return <Profile />;
  } else {
    return <LandingPage />;
  }
}
