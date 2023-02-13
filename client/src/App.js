import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Title from "./components/Title";
import FilterFormComponent from "./components/FilterFormComponent";


function App() {
  return (
    <div className="App">
      <Title />
      <FilterFormComponent />
    </div>
  );
}

export default App;
