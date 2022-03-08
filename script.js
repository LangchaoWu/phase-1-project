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
        const types=[];

        for (const type in pokemon.types) {
            let typeName=pokemon.types[type].type.name
            
            types.push(typeName[0].toUpperCase()+typeName.slice(1))
        }
        
        const imgContainer=document.createElement("div")
        imgContainer.className='img-container'
        const pokeImg=document.createElement('img')
        pokeImg.alt=pokemon.name
        pokeImg.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        imgContainer.append(pokeImg)

        const pokeInfo=document.createElement("div")
        pokeInfo.className="info"
        const span=document.createElement("span")
        span.textContent=`#${pokemon.id.toString().padStart(3,'0')}`
        span.className="number"
        const h3=document.createElement("h3")
        h3.className='pokename'
        h3.textContent=name;

        pokeInfo.append(span,h3)

        types.forEach( function(type){
            const typeDiv=document.createElement("div")
            typeDiv.className=`type-box`
            const spanType=document.createElement("span")
            spanType.className=`back-ground-color-${type}`
            spanType.id='type-span'
            spanType.textContent=type
            typeDiv.appendChild(spanType)
            pokeInfo.append(typeDiv)
        })


        pokeCard.append(imgContainer,pokeInfo)

        pokeContainer.append(pokeCard)

}

getAllPokemon()
// renderPokemon(1)