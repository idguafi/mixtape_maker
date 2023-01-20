import { signOut, signIn } from "next-auth/react";

export default function NavbarView(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-grey">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand" href={props.loggedIn ? "/profile" : "/"}>
            MXTP_MKR.WAV
          </a>

          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
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
              <li className="nav-item">
                <a className="nav-link active" href="/create">
                  NEW_MXTP
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/inbox">
                  INBOX
                  <span className="badge top-0 start-100  text-bg-secondary p-1 bg-dark">
                    {props.messages?.length > 0 ? props.messages.length : ""}
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
