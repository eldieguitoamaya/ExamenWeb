BASE_URL="https://pokeapi.co/api/v2/"

function getKantoPokemon(){
    const url = `${BASE_URL}pokemon/?limit=151`;
    const ulKanto = document.getElementById("ulKanto");
    for( let i = 1; i <= 151; i++){
        response = fetch(`${BASE_URL}pokemon/${i}`)
        data = response.json();
        const li = document.createElement("li");
        li.innerHTML = data.results[i].name;
        ulKanto.appendChild(li);
    }
    
}