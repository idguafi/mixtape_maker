export default function InboxView(props) {
  return (
    <>
      <div className="container">
        <br></br>
        <h1 className="text-center">INBOX:</h1>
        <br></br>
        <div className="row  d-flex justify-content-around">
          {props.messages?.map((playlist) => {
            return (
              <div className="col-sm-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {playlist?.playlistTitle.toLowerCase() + ".wav"}
                    </h5>
                    <button
                      onClick={() =>
                        props.onAccept(playlist.playlistTitle, playlist.tracks)
                      }
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => props.onDelete(playlist.playlistTitle)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
