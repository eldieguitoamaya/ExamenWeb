const BASE_URL = "https://pokeapi.co/api/v2/";

window.onload = async function() {
    const pokemons = await getKantoPokemon();
    const ulKanto = document.getElementById("kanto-list");
    for (const pokemon of pokemons) {
        const listElement = document.createElement("li");
        listElement.textContent = pokemon.name;
        listElement.addEventListener("click", () => displayPokemonDetails(pokemon.url, listElement));
        ulKanto.appendChild(listElement);
    }
}

async function getKantoPokemon() {
    const response = await fetch(`${BASE_URL}pokemon/?limit=151`);
    const jsonresponse = await response.json();
    const pokemonArray = jsonresponse.results;
    return pokemonArray;
}

async function displayPokemonDetails(url, listElement) {
    const response = await fetch(url);
    const pokemon = await response.json();
    
    const detailsDiv = document.createElement("div");
    detailsDiv.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>ID: ${pokemon.id}</p>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
    
    // Remove any existing details divs
    const existingDetails = listElement.querySelector("div");
    if (existingDetails) {
        listElement.removeChild(existingDetails);
    }
    
    listElement.appendChild(detailsDiv);
}