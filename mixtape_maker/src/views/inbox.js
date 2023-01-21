export default function InboxView(props) {
  return (
    <>
      <div className="container">
        <br></br>
        <h1 className="text-center">INBOX:</h1>
        <br></br>
        <div className="row  d-flex justify-content-around">
          {props.messages?.map((playlist) => {
            console.log(playlist.playlistTitle)

            return (
              <div className="col-sm-4">
                <div class="card" >
                  <div class="card-body">
                    <h5 class="card-title">{playlist?.playlistTitle.toLowerCase() + ".wav"}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <button onClick={()=>props.onAccept(playlist.playlistTitle, playlist.playlistTitle, playlist.tracks)}>
                      Card link
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
