const BASE_URL = "https://pokeapi.co/api/v2/";

window.onload = async function() {
    const pokemons = await getKantoPokemon();
    const ulKanto = document.getElementById("kanto-list");
    for (const pokemon of pokemons) {
        const listElement = document.createElement("li");
        listElement.textContent = pokemon.name;
        listElement.addEventListener("click", () => togglePokemonDetails(pokemon.url, listElement));
        ulKanto.appendChild(listElement);
    }
}

async function getKantoPokemon() {
    const response = await fetch(`${BASE_URL}pokemon/?limit=151`);
    const jsonresponse = await response.json();
    const pokemonArray = jsonresponse.results;
    return pokemonArray;
}

async function togglePokemonDetails(url, listElement) {
    const existingDetails = listElement.querySelector("div");
    
    if (existingDetails) {
        // If details are already displayed, remove them
        listElement.removeChild(existingDetails);
    } else {
        // If details are not displayed, fetch and display them
        const response = await fetch(url);
        const pokemon = await response.json();
        
        const detailsDiv = document.createElement("div");
        detailsDiv.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
            <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <button class="add-to-team">Añadir a equipo</button>
        `;
        
        listElement.appendChild(detailsDiv);

        // Add event listener to the "Añadir a equipo" button
        const addToTeamButton = detailsDiv.querySelector(".add-to-team");
        addToTeamButton.addEventListener("click", () => addToTeam(pokemon));
    }
}

function addToTeam(pokemon) {
    
    const teamList = document.getElementById("team");
    // Create the Pokémon details block
    const pokemonBlock = document.createElement("li");
    pokemonBlock.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>ID: ${pokemon.id}</p>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
        <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;

    // Append the Pokémon details block to the team list
    document.getElementById("team").appendChild(pokemonBlock);
}