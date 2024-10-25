const BASE_URL = "https://pokeapi.co/api/v2/";

window.onload = async function() {
    const pokemons = await getKantoPokemon();
    const ulKanto = document.getElementById("kanto-list");
    for (const pokemon of pokemons) {
        const listElement = document.createElement("li");
        listElement.textContent = pokemon.name;
        listElement.addEventListener("click", () => PokemonInfo(pokemon.url, listElement));
        ulKanto.appendChild(listElement);
    }
}

async function getKantoPokemon() {
    const response = await fetch(`${BASE_URL}pokemon/?limit=151`);
    const jsonresponse = await response.json();
    const pokemonArray = jsonresponse.results;
    return pokemonArray;
}

async function PokemonInfo(url, listElement) {
    const existingDetails = listElement.querySelector("div");
    
    if (existingDetails) {
        /* Si l'informacio ya esta oberta i li dono click una altra
         vegada es tanca l'informació i torna a l'estat original de la lista*/
        listElement.removeChild(existingDetails);
    } else {
        //Si l'informacio no esta mostrada, la crido
        const response = await fetch(url);
        const pokemon = await response.json();
        
        const detailsDiv = document.createElement("div");
        detailsDiv.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
            <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <button class="add-to-team">Añadir a equipo</button>
        `;
        
        listElement.appendChild(detailsDiv);

        // Faig un event listener al botó perque faci una crida a la funció addToTeam
        const addToTeamButton = detailsDiv.querySelector(".add-to-team");
        addToTeamButton.addEventListener("click", () => addToTeam(pokemon));
    }
}

function addToTeam(pokemon) {
    const teamList = document.getElementById("team");
    if (teamList.children.length >= 6) {
        alert("El equipo ya tiene 6 Pokémon.");
        return;
    }

  
    //Creo un nuevo elemento
    const pokemonBlock = document.createElement("li");
    pokemonBlock.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>ID: ${pokemon.id}</p>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
        <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
    //Añado el nuevo elemento a la lista
    document.getElementById("team").appendChild(pokemonBlock);
}

function onSearchPokemon(form){
    const formElements = form.elements; 
    const searchFormElement= formElements.search//busco el input
    const pokemonName = searchFormElement.value.toLowerCase();//obtengo el valor del input
    
}