import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useSession, getProviders, signIn, signOut } from "next-auth/react";

export default function Login({ providers }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        
        <p>{session?.user.email}</p>

        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out!
        </Button>
      </Container>
    );
  } else {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Button
          onClick={() => {
            signIn({callbackUrl: "/"});
          }}
        >
          Sign In!
        </Button>
      </Container>
    );
  }
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
