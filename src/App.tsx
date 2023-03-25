import "./App.css";
import { PopulationGraph } from "./components/PopulationGraph";

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <PopulationGraph
          country="United States"
          url="https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        />
      </div>
    </div>
  );
}

export default App;
