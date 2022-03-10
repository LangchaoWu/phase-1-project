const PokemonNumber=151;
const pokeContainer=document.querySelector("#PokeCard-container")

const fecthPokemons= async ()=>{
    for (let i = 1; i < PokemonNumber+1; i++) {
            await getPokemon(i);
    }
}


const getPokemon=async(id)=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    const res =await fetch(url);
    const pokemon=await res.json();
    createPokemonCard(pokemon)
    
}

const head=document.querySelector("h1")
head.addEventListener("click",handler)

function handler(){
    document.querySelector("#PokeCard-container").innerHTML=''
    fecthPokemons();

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

        const id=pokemon.id.toString().padStart(3,'0')
        const pokeInfo=document.createElement("div")
        pokeInfo.className="info"
        const span=document.createElement("span")
        span.textContent=`#${id}`
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

        pokeCard.addEventListener("click",clickHandler)
        function clickHandler(){
            showPokemon(pokemon)
        }

        function showPokemon(pokemon){
            const container=document.querySelector("#PokeCard-container")
            container.innerHTML=''
            
            const table=document.createElement("table")
            table.className="info-table"

            const tbody=document.createElement("tbody")
           

            tbody.innerHTML=`
                
                <tr>
                    <td>
                        <table width=100%>
                            <tbody width=100%>
                                <tr width=100%>
                                    <td id='letter' width=50%>${name}</td>
                                    <td id='letter' width=50%>#${id}</td>
                                </tr>
                        <table width=100%>
                                <tr>
                                    <td id='img-td'>
                                        <img alt=${name} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
                                    </td>
                                </tr>
                        </table>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
              
                    <td >
                        <table width=100%>
                            <td width=50%>
                                 <b>Height</b>
                                 <table class='height-info'>

                                 </table>
                            </td>
                            <td>
                                <b>Weight</b>
                                <table class='weight-info'>
                                    
                                 </table>
                            </td>
                        </table>
                    </td>
                    
            
                </tr>
                <tr>
                    <td>
                        <b>Type</>
                        <table width=100%>
                            <tbody id='type-element'>
                            </tbody>
                        </table>
                    </td>
                </tr>
                    
                <tr>
                    <td>
                         <b>Abilities</>
                         <table width=100%>
                            <tbody id='abilities-element'>

                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr></tr>
            `
            
            table.append(tbody)
            container.appendChild(table)
           
            //create height information
            const heightTable=document.querySelector(".height-info")
            const heightTd=document.createElement("td")
            const height=pokemon.height/10
            let heightInInches=pokemon.height/10*39.37;
            let heihgtFeet=Math.floor(heightInInches/12)
            let heightInch=Math.round(heightInInches %12 ).toString().padStart(2,'0');
            
            const heightTd2=document.createElement("td")

            heightTd.textContent=`${heihgtFeet}' ${heightInch}"`
            heightTd2.textContent=`${height} m`
            heightTable.appendChild(heightTd)
            heightTable.appendChild(heightTd2)

            //create weight information
            const weightTable=document.querySelector(".weight-info")  
            const weightTd=document.createElement("td")  
            const weightTd2=document.createElement("td")
            let weightInPound=(pokemon.weight/10*2.205).toFixed(1)
            let weightInKg=(pokemon.weight/10).toFixed(1)
            weightTd.textContent=`${weightInPound} lbs`
            weightTd2.textContent=`${weightInKg} KG`
            weightTable.appendChild(weightTd)
            weightTable.appendChild(weightTd2)

        
            //create types information
            const typeTable=document.querySelector("#type-element")
            types.forEach( function(type){
                const typeTd=document.createElement("td")
                typeTd.className=`type-td`
                const spanType=document.createElement("span")
                spanType.className=`back-ground-color-${type}`
                spanType.id='type-span-2'
                spanType.textContent=type
                typeTd.appendChild(spanType)
                typeTable.appendChild(typeTd)
            })



            
            //create abilities information
            const abilitiesContainer=document.querySelector("#abilities-element")
          
            for (const key in pokemon.abilities) {
                let abilitiesName=pokemon.abilities[key].ability.name
                  const abilityTd=document.createElement("td")
                  abilityTd.className='ability-td'
                  const spanAbility=document.createElement('span')
                  spanAbility.className='ability-span'
                  spanAbility.textContent=abilitiesName[0].toUpperCase()+abilitiesName.slice(1)
                  abilityTd.appendChild(spanAbility)
                  abilitiesContainer.appendChild(abilityTd)  
            }
            
          
            
            
        }

        pokeCard.addEventListener("mouseenter",mouseOnHander)
        imgContainer.addEventListener("mouseenter",mouseOnHander)
        function mouseOnHander(){
            pokeCard.style='background-color : rgb(243, 182, 112)'

        }

        pokeCard.addEventListener("mouseout",mouseOutHandler)
        function mouseOutHandler(){
            pokeCard.style='background-color: rgb(235, 234, 225)'
        }

}

const form=document.querySelector("#search-form")
form.addEventListener("submit",findPokemon)

function findPokemon(e){
    e.preventDefault();
    let searchName=form.querySelector("#name-input").value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
    .then(function (resp) {
        if (resp.ok) {
          return resp.json();
        } else {
          alert("no pokemon found!");
          getAllPokemon();
        }
      })
    .then(function(pokemon){
        document.querySelector("#PokeCard-container").innerHTML='';
        createPokemonCard(pokemon)
        form.reset();
    })
}


fecthPokemons();
