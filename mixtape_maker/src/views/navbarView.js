import { signOut, signIn } from "next-auth/react";

export default function NavbarView(props) {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            MXTP_MKR.WAV
          </a>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                {props.loggedIn ? (
                  <a
                    href="#"
                    class="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    SIGN_OUT
                  </a>
                ) : (
                  <a
                    href="#"
                    class="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      signIn({ callbackUrl: "/" });
                    }}
                  >
                    SIGN_IN
                  </a>
                )}
              </li>
            </ul>

            <ul class="nav navbar-nav navbar-right">
              <li>
                <a class="position-relative nav-link active" href="#">
                  INBOX
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      100
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
