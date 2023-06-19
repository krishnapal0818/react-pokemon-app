import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const data = response.data.results;
        setPokemons(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeSelect = (event) => {
    const selectedType = event.target.value;
    // if (selectedTypes.includes(selectedType)) {
    //   setSelectedTypes(selectedTypes.filter((type) => type !== selectedType));
    // } else {
    //   setSelectedTypes([...selectedTypes, selectedType]);
    // }
  };

  const handlePageSizeSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedTypes.length > 0) {
    const typeFilteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon?.types.some((type) => selectedTypes.includes(type))
    );
    filteredPokemons.length = 0;
    filteredPokemons.push(...typeFilteredPokemons);
  }

  const paginatedPokemons = filteredPokemons.slice(0, pageSize);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Filter by type:</label>
        <div>
          <label className="form-check-label me-2">
            <input
              type="checkbox"
              className="form-check-input"
              value="grass"
              checked={selectedTypes.includes("grass")}
              onChange={handleTypeSelect}
            />
            Grass
          </label>
          <label className="form-check-label me-2">
            <input
              type="checkbox"
              className="form-check-input"
              value="fire"
              checked={selectedTypes.includes("fire")}
              onChange={handleTypeSelect}
            />
            Fire
          </label>
          <label className="form-check-label me-2">
            <input
              type="checkbox"
              className="form-check-input"
              value="water"
              checked={selectedTypes.includes("water")}
              onChange={handleTypeSelect}
            />
            Water
          </label>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPokemons?.length > 0 &&
              paginatedPokemons.map((pokemon) => (
                <tr key={pokemon.name}>
                  <td>
                    <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                  </td>
                  <td>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        pokemons.indexOf(pokemon) + 1
                      }.png`}
                      alt={pokemon.name}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="row mb-3">
        <div className="col-4">
          <label htmlFor="pageSizeSelect" className="form-label">
            Show items per page:
          </label>
        </div>
        <div className="col-8">
          <select
            id="pageSizeSelect"
            className="form-select"
            value={pageSize}
            onChange={handlePageSizeSelect}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
