async function getPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
    try{
        let res = await fetch(url);
        return await res.json();
    }
    catch(error){
        console.log(error);
    }
}


async function getInformation(name){
    let pokemon = {}
    let information = await getPokemon(name);

    pokemon.name = information.name;

    pokemon.image = information.sprites.front_default;

    pokemon.types = []
    for (i=0; i<information.types.length; i++)
    {
        pokemon.types.push(information.types[i].type.name);
    }

    pokemon.stats = []
    for (i=0; i<information.stats.length; i++)
    {
        obj = {};
        obj.name= information.stats[i].stat.name;
        obj.value = information.stats[i].base_stat;
        pokemon.stats.push(obj);
    }

    pokemon.moves = []
    for (i=0; i<information.moves.length; i++)
    {
        pokemon.moves.push(information.moves[i].move.name);
    }
    return pokemon;
}

async function queryPokemon() {
    try{
        let text = document.getElementById('namePokemon').value;
        if(text!="")
        {
            pokemon = await getInformation(text);
        }
        else{return;}        
    }
    catch(error)
    {
        notFound();
        return;
    }
    console.log(pokemon);
    
    document.getElementById("imagePokemon").src=pokemon.image.toString();
    document.getElementById("displayName").innerHTML=pokemon.name.toString();

    let htmlForTypes = '';
    for(i=0;i<pokemon.types.length;i++){
        let htmlSegment = `<div class="type">
                                <p>${pokemon.types[i]}</p>
                           </div>`;
        htmlForTypes +=htmlSegment;
    }

    let htmlForStats = '';
    for(i=0;i<pokemon.stats.length;i++){
        let htmlSegment = `<div class="stat">
                            <p>${pokemon.stats[i].name}</p>
                            <p>${pokemon.stats[i].value}</p>
                           </div>`
        htmlForStats +=htmlSegment;
    }

    let htmlForMoves = '';
    for(i=0;i<pokemon.moves.length;i++){
        let htmlSegment = `<div class="move">
                            <p>${pokemon.moves[i]}</p>
                           </div>`
        htmlForMoves +=htmlSegment;
    }

    let typesContainer = document.querySelector('.types-container');
    typesContainer.innerHTML = htmlForTypes;
    
    let statsContainer = document.querySelector('.stats-container');
    statsContainer.innerHTML = htmlForStats;    

    let movesContainer = document.querySelector('.moves-container');
    movesContainer.innerHTML = htmlForMoves;
}

const notFound = () => {
    document.getElementById("imagePokemon").src= "assets/who.png";
    document.getElementById("displayName").innerHTML='error :c';
    let typesContainer = document.querySelector('.types-container');
    typesContainer.innerHTML = '';
    
    let statsContainer = document.querySelector('.stats-container');
    statsContainer.innerHTML = '';    

    let movesContainer = document.querySelector('.moves-container');
    movesContainer.innerHTML = '';
}


