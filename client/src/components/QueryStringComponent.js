import _ from "underscore";
import { CopyToClipboard } from "react-copy-to-clipboard";

function QueryStringComponent(queryString) {
  let className = "query-string";
  let listImages = "";
  if (queryString.status) {
    className += " active";
  }
  if (queryString.spaceshipData.length > 0) {
    listImages = queryString.spaceshipData.map(function (d, idx) {
      return (
        <div key={idx}>
          {d.spaceship_name.toUpperCase()}
          <br />
          <img src={d.src} className="space-img" />
          <br />
          Year: {d.year}
          <br />
          Speed: {d.speed}
        </div>
      );
    });
  }

  return (
    <div className={className}>
      <b>Query string generated &nbsp;&nbsp;</b>
      <CopyToClipboard text={queryString.data} onCopy={() => alert("Copied")}>
        <button className="btn btn-outline-secondary btn-sm">Copy</button>
      </CopyToClipboard>
      <br />
      <p className="q-string">
      {queryString.data}
      </p>
      <hr />
      <p>{queryString.spaceshipData.length} results</p>
      <div className="image-container">{listImages}</div>
      <hr />
      <p>
        <a href={queryString.data} target="_blank">
          <button type="button" className="btn btn-outline-info btn-sm">
            View JSON data
          </button>
        </a>
      </p>
    </div>
  );
}

export default QueryStringComponent;
