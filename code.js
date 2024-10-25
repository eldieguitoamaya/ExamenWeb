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

const globalPokemon = {}; // Lo uso para usar clave valor, donde clave sera la url y valor el pokemon

function onSearchPokemon(form) {
    const formElements = form.elements; 
    const searchFormElement = formElements.search; // busco el input
    const pokemonName = searchFormElement.value.toLowerCase(); // obtengo el valor del input y lo convierto a minúsculas
    searchPokemon(pokemonName).then(async (pokemon) => {
        if (!pokemon) {
            alert("Pokemon no encontrado");
            return;
        }
        globalPokemon[pokemon.url] = pokemon;
        const divSearchPokemonInfo = document.getElementById("searched-pokemon-info");
        divSearchPokemonInfo.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
            <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <button class="add-to-team">Añadir a equipo</button>
        `;

        // Faig un event listener al botó perque faci una crida a la funció addToTeam
        const addToTeamButton = divSearchPokemonInfo.querySelector(".add-to-team");
        addToTeamButton.addEventListener("click", () => addToTeam(pokemon)); 
    });
    return false;
}

async function searchPokemon(pokemonName) {
    const response = await fetch(`${BASE_URL}pokemon/${pokemonName}`);
    if(!response.ok){
        alert("Pokemon no existente");
        return null;
    }
    const pokemon = await response.json();
    return pokemon;
}

/*function addToTeam(pokemon) {
    const teamList = document.getElementById("team");

    // Check if the team already has 6 Pokémon
    if (teamList.children.length >= 6) {
        alert("El equipo ya tiene 6 Pokémon.");
        return;
    }

    // Create the Pokémon details block
    const pokemonBlock = document.createElement("li");
    pokemonBlock.innerHTML = `
        <h2>${pokemon.name}</h2>
        <p>ID: ${pokemon.id}</p>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
        <p>Types: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;

    // Append the Pokémon details block to the team list
    teamList.appendChild(pokemonBlock);
}*/