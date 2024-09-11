import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [serpientes, setSerpientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  // Pokémon tipo serpiente (identificadores por nombre)
  const pokemonSerpientes = ["ekans", "arbok", "seviper", "silicobra", "sandaconda", "snivy"];

  useEffect(() => {
    // Hacer la solicitud a la API para cada Pokémon tipo serpiente
    const obtenerPokemonesSerpientes = async () => {
      const resultados = await Promise.all(
        pokemonSerpientes.map(async (nombre) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
          return response.json(); // Obtener la respuesta en formato JSON
        })
      );
      setSerpientes(resultados);
      setResultados(resultados); // Inicialmente mostrar todas las serpientes
    };

    obtenerPokemonesSerpientes();
  }, []);

  const handleSearch = (e) => {
    setBusqueda(e.target.value);
  };

  const handleButtonClick = () => {
    if (busqueda === "") {
      // Si la búsqueda está vacía, mostrar todas las serpientes
      setResultados(serpientes);
    } else {
      // Filtrar serpientes según la búsqueda
      const resultadosFiltrados = serpientes.filter((serpiente) =>
        serpiente.name.toLowerCase().includes(busqueda.toLowerCase())
      );
      setResultados(resultadosFiltrados);
    }
  };

  return (
    <div className="app">
      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={busqueda}
          onChange={handleSearch}
        />
        <button onClick={handleButtonClick}>Buscar</button>
      </div>

      {/* Mostrar Pokémon serpiente */}
      <div className="serpientes-container">
        {resultados.map((serpiente, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <h2 className="card-title">{serpiente.name}</h2>
            </div>
            <div className="card-content">
              <img
                src={serpiente.sprites.other["official-artwork"].front_default}
                alt={serpiente.name}
                className="pokemon-img"
              />
              <div className="pokemon-info">
                <p>Tipo: {serpiente.types.map(type => type.type.name).join(', ')}</p>
                <p>Altura: {serpiente.height / 10} m</p>
                <p>Peso: {serpiente.weight / 10} kg</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
