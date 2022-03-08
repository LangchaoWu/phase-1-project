const PokemonNumber=151;
const pokeContainer=document.querySelector("#PokeCard-container")

function getAllPokemon(){
    for (let index = 1; index < PokemonNumber+1; index++) {
        renderPokemon(index);
    }
}

function renderPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(function(pokemon){
        createPokemonCard(pokemon);
    } )
}

function createPokemonCard(pokemon){
        const pokeCard=document.createElement("div")
        pokeCard.id=pokemon.id
        pokeCard.className='pokemon'

        const name=pokemon.name[0].toUpperCase()+pokemon.name.slice(1);

        pokeCard.innerHTML=`
            <div class='img-container'>
                <img alt=${pokemon.name} src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png'>
            </div>

        `   


        pokeContainer.append(pokeCard)

}

getAllPokemon()
// renderPokemon(1)