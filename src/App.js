import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PokemonList from "./Components/PokemonList";
import PokemonDetails from "./Components/PokemonDetails";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
