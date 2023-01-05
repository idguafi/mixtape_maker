import { useSession, signOut } from "next-auth/react";
import { Button, Container } from "react-bootstrap";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <Container className = "d-flex  align-items-center">
      <h1>Welcome, {session?.user.name}!</h1>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Button
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign Out!
        </Button>
      </Container>
    </Container>
  );
}
