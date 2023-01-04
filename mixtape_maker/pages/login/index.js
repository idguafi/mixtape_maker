import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useSession, signIn } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <p>{session?.token?.email}</p>
      </Container>
    );
  } else {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Button onClick={()=>{signIn()}}>Sign In!</Button>
      </Container>
    );
  }
}
