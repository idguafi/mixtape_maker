export default function CreateView(props) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <>
      <div className="container text-center input-group w-50">
        <input
          class="form-control"
          placeholder="artist name:"
          value={props.artistFieldState}
          onChange={props.setArtistField}
        ></input>
        <input
          class="form-control"
          placeholder="song title:"
          value={props.titleFieldState}
          onChange={props.setTitleField}
        ></input>
        <button className="btn btn-dark btn-sm" onClick={props.search}>
          search
        </button>
      </div>
      <div className="container p-5 my-5 d-flex align-items-center min-vh-50">
        <div className="table text-center">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Artist</th>
                <th scope="col">Title</th>
                <th scope="col">Duration</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            {props.tracks.map((track, index) => {
              return (
                <tbody>
                  <tr key={track.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{track.artists[0].name}</td>
                    <td>{track.name}</td>
                    <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
                    <td>
                      <button
                        className="btn btn-sm-dark btn-sm"
                        onClick={() => props.removeTrack(track)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}

            <tfoot>
              <tr>
                <td>
                  <button
                    disabled={props.tracks.length > 0 ? false : true}
                    class="btn btn-dark"
                  >
                    send
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
