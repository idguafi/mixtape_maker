export default function CreateView(props) {

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <div className="container d-flex align-items-center min-vh-50">
      <div className="table text-center">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Artist</th>
              <th scope="col">Title</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          {props.tracks?.map((track, index) => {
            return (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{track.artists[0].name}</td>
                  <td>{track.name}</td>
                  <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
