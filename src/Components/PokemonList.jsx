import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = () => {
    const [pokemon, setPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(response => {
                const fetches = response.data.results.map(p => axios.get(p.url));
                Promise.all(fetches).then(results => {
                    setPokemon(results.map(r => r.data));
                });
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPokemon = pokemon.filter(p =>
        p.name.toUpperCase().includes(searchTerm.toUpperCase())
    );

    return (
        <div>
            <h2 className="text-center mt-3 ">Featured <span className="badge text-bg-warning">Pokémon</span></h2>
            <div className="position-relative">    
                <input 
                    type="text" 
                    width="7em" height="2em" viewBox="0 0 16 16"
                    className="position-absolute top-0 start-40 py-2 px-4 mx-4 border border-secondary rounded-pill"
                    placeholder="Search Pokémon"
                    value={searchTerm} 
                    onChange={handleSearch}
                />
            </div>
            <div className="mx-2 mt-5">
                {filteredPokemon.map(p => (
                    <div key={p.id} className="card bg-dark text-light mb-3 d-inline-block gap-4 my-3 mx-2 px-2 py-2 border border-secondary rounded" style={{maxWidth:"330px"}}>
                        <img src={p.sprites.front_default} className="card-img-top" style={{height:"200px",width:"320px"}} alt={p.name} />
                        <h2 className="card-title">{p.name}</h2>
                        <p className="card-text"><strong>Type:</strong> {p.types.map(t => t.type.name).join(', ')}</p>
                        <p className="card-text"><strong>Height:</strong> {p.height}</p>
                        <p className="card-text"><strong>Weight:</strong> {p.weight}</p>
                        <p className="card-text"><strong>Abilities:</strong> {p.abilities.map(a => a.ability.name).join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonList;
