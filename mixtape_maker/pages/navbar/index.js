import { useSession } from "next-auth/react";
import NavbarView from "../../src/views/navbarView";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <NavbarView loggedIn={session?.user ? true : false} />
    </>
  );
}
