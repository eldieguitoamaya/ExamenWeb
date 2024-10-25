const BASE_URL="https://pokeapi.co/api/v2/"
window.onload = async function(){
    const pokemons = await getKantoPokemon();
    const ulKanto = document.getElementById("kanto-list");
    for (const pokemon of pokemons){
        const listElement = document.createElement("li");
        listElement.textContent = pokemon.name;
        ulKanto.appendChild(li);
    }

}
async function getKantoPokemon(){
   
    for( let i = 1; i <= 151; i++){
        const response = await fetch (`${BASE_URL}pokemon/?limit=151`);
        const jsonresponse = await response.json();
        const pokemonArray = jsonresponse.results;
        return pokemonArray;
    }
    
}