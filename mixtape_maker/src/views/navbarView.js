import { signOut, signIn } from "next-auth/react";

export default function NavbarView(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-grey">
        <div className="container">
          <a className="navbar-brand" href="#">
            MXTP_MKR.WAV
          </a>
          <div className="container">
            <ul className="navbar-nav">
              <li className="nav-item">
                {props.loggedIn ? (
                  <a
                    href="#"
                    className="nav-link active"
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
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => {
                      signIn({ callbackUrl: "/" });
                    }}
                  >
                    SIGN_IN
                  </a>
                )}
              </li>
              <li>
                <a className="position-absolute nav-link active" href="#">
                  INBOX
                  <span className="position-absolute badge top-0 start-100  text-bg-secondary p-1 bg-dark">
                    {props.messages?.length > 0 ? props.messages.length:""}
                    <span className="visually-hidden">unread messages</span>
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
