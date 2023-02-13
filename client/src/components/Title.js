import logo from "./logo.png";

function Title() {
  return (
    <div className="logo-title">
      <img src={logo} className="App-logo" alt="logo" />
      <br />
      <h3>Spaceships finder</h3>
    </div>
  );
}

export default Title;
